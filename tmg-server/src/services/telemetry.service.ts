import { PrismaClient, AssetState, CreateTelemetryBatchDto } from "@tmg/shared";
import { EvaluationService } from "./evaluation.service";
import { AppError } from "../utils/AppError";

export class TelemetryService {
  constructor(
    private prisma: PrismaClient,
    private evaluationService: EvaluationService
  ) {}

  /**
   * Ingests a batch of telemetry data points.
   * Updates the `lastSeen` timestamp for each affected asset.
   *
   * @param batchData Array of telemetry points
   */
  async ingestTelemetry(batchData: CreateTelemetryBatchDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Identify unique assets in the batch
      const uniqueAssetIds = [...new Set(batchData.map((d) => d.assetId))];

      // 2. Lifecycle Enforcement (CORE-09)
      const assets = await tx.asset.findMany({
        where: { id: { in: uniqueAssetIds } },
        select: { id: true, name: true, state: true },
      });

      uniqueAssetIds.forEach((assetId) => {
        const asset = assets.find((a) => a.id === assetId);
        if (!asset) {
          throw new AppError(404, `Asset with ID ${assetId} not found`);
        }
        if (asset.state !== AssetState.ACTIVE) {
          throw new AppError(
            400,
            `Asset ${asset.name} is not ACTIVE (Current: ${asset.state})`
          );
        }
      });

      // 3. Add the bulk insert operation
      await tx.telemetry.createMany({ data: batchData });

      // 4. Update operations for each asset
      const now = new Date();
      for (const assetId of uniqueAssetIds) {
        await tx.asset.update({
          where: { id: assetId },
          data: { lastSeen: now },
        });
      }

      // 5. Trigger the evaluation logic
      await this.evaluationService.evaluateBatch(batchData, tx);
    });
  }

  /**
   * Retrieves historical telemetry data for a specific asset within a time range.
   * @param assetId The ID of the asset
   * @param start The start date (inclusive)
   * @param end The end date (inclusive)
   */
  async getHistory(assetId: string, start: Date, end: Date) {
    return this.prisma.telemetry.findMany({
      where: {
        assetId,
        time: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { time: "asc" },
    });
  }

  /**
   * Retrieves the most recent telemetry data point for an asset.
   * Useful for showing "Current Status" on dashboards.
   * @param assetId The ID of the asset
   */
  async getLatest(assetId: string) {
    return this.prisma.telemetry.findFirst({
      where: { assetId },
      orderBy: { time: "desc" },
    });
  }
}