import { PrismaClient, Prisma, CreateAssetDto } from "@tmg/shared";

/**
 * Service: AssetService
 * Purpose: Handles business logic for Digital Assets (CRUD, validation, etc.).
 * Implements: FR-01, FR-06
 */
export class AssetService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Retrieves all assets from the database, optionally filtered by metadata.
   * @param metadataFilter Optional object containing key-value pairs to match in JSONB metadata
   */
  async getAllAssets(metadataFilter?: Prisma.InputJsonValue) {
    const hasFilter =
      metadataFilter && Object.keys(metadataFilter as object).length > 0;

    return this.prisma.asset.findMany({
      where: hasFilter
        ? {
            metadata: {
              contains: metadataFilter,
            } as any,
          }
        : {},
    });
  }

  /**
   * Creates a new asset.
   * @param data The asset data to create.
   */
  async createAsset(data: CreateAssetDto) {
    return this.prisma.asset.create({
      data,
    });
  }

  /**
   * Retrieves a single asset by its unique ID.
   * @param id The UUID of the asset.
   */
  async getAssetById(id: string) {
    return this.prisma.asset.findUnique({
      where: { id },
    });
  }

  /**
   * Updates an existing asset.
   * @param id The UUID of the asset to update.
   * @param data The partial data to update.
   */
  async updateAsset(id: string, data: Partial<CreateAssetDto>) {
    return this.prisma.asset.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes an existing asset.
   * @param id The UUID of the asset.
   */
  async deleteAsset(id: string) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
