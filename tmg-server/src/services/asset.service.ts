import { PrismaClient } from "@prisma/client";

/**
 * Service: AssetService
 * Purpose: Handles business logic for Digital Assets (CRUD, validation, etc.).
 * Implements: FR-01, FR-06
 */
export class AssetService {
  constructor(private prisma: PrismaClient) {}
  async getAllAssets() {
    return this.prisma.asset.findMany();
  }
}
