import { PrismaClient } from "@prisma/client";
import { CreateAssetDto } from "../schemas/asset.schema";

/**
 * Service: AssetService
 * Purpose: Handles business logic for Digital Assets (CRUD, validation, etc.).
 * Implements: FR-01, FR-06
 */
export class AssetService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Retrieves all assets from the database.
   */
  async getAllAssets() {
    return this.prisma.asset.findMany();
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
