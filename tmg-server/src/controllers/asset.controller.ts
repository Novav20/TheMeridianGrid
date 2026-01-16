import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";
import { createAssetSchema, updateAssetSchema } from "../schemas/asset.schema";
import { AppError } from "../utils/AppError";

/**
 * Controller: AssetController
 * Purpose: Handles HTTP traffic for Asset-related endpoints.
 */
export class AssetController {
  constructor(private assetService: AssetService) {}

  public getAll = async (req: Request, res: Response) => {
    const metadataFilter: Record<string, any> = {};

    Object.keys(req.query).forEach((key) => {
      if (key.startsWith("metadata.")) {
        const fieldName = key.replace("metadata.", "");
        metadataFilter[fieldName] = req.query[key];
      }
    });

    const data = await this.assetService.getAllAssets(metadataFilter);
    res.json(data);
  };

  public create = async (req: Request, res: Response) => {
    const validatedData = createAssetSchema.parse(req.body); // ZodError will be caught by global handler
    const asset = await this.assetService.createAsset(validatedData);
    res.status(201).json(asset);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const asset = await this.assetService.getAssetById(id);

    if (!asset) {
      throw new AppError(404, "Asset not found");
    }

    res.json(asset);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateAssetSchema.parse(req.body);
    const updatedAsset = await this.assetService.updateAsset(
      id,
      validatedData
    );
    res.json(updatedAsset);
    // Prisma P2025 errors will now be caught by the global handler
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.assetService.deleteAsset(id);
    res.status(204).send();
    // Prisma P2025 errors will now be caught by the global handler
  };
}
