import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";
import { createAssetSchema } from "../schemas/asset.schema";

/**
 * Controller: AssetController
 * Purpose: Handles HTTP traffic for Asset-related endpoints.
 */
export class AssetController {
  constructor(private assetService: AssetService) {}

  public getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.assetService.getAllAssets();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const validatedData = createAssetSchema.parse(req.body);
      const asset = await this.assetService.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  };
}
