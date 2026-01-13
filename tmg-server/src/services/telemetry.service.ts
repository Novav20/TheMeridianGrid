import { PrismaClient } from "../../prisma/client/client";
import { CreateTelemetryBatchDto } from "../schemas/telemetry.schema";

export class TelemetryService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Ingests a batch of telemetry data points.
   * Updates the `lastSeen` timestamp for each affected asset.
   *
   * @param batchData Array of telemetry points
   */
  async ingestTelemetry(batchData: CreateTelemetryBatchDto) {
    // 1. Prepare the operations array
    const operations: any[] = [];

    // 2. Add the bulk insert operation
    operations.push(this.prisma.telemetry.createMany({ data: batchData }));

    // 3. Identify unique assets to update 'lastSeen'
    const uniqueAssetIds = [...new Set(batchData.map((d) => d.assetId))];

    // 4. Add update operations for each asset
    const now = new Date();
    uniqueAssetIds.forEach((assetId) => {
      operations.push(
        this.prisma.asset.update({
          where: { id: assetId },
          data: { lastSeen: now },
        })
      );
    });

    // 5. Execute as a single transaction
    return this.prisma.$transaction(operations);
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
