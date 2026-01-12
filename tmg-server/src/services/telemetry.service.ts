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
}
