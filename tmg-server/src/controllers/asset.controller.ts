import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";
import { createAssetSchema, updateAssetSchema } from "../schemas/asset.schema";

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

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const asset = await this.assetService.getAssetById(id);

      if (!asset) {
        res.status(404).json({ error: "Asset not found" });
        return;
      }

      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const validatedData = updateAssetSchema.parse(req.body);
      const updatedAsset = await this.assetService.updateAsset(
        id,
        validatedData
      );
      res.json(updatedAsset);
    } catch (error: any) {
      // Handle Prisma "Record not found" error (code P2025)
      if (error.code === "P2025") {
        res.status(404).json({ error: "Asset not found" });
        return;
      }
      res.status(400).json({ error: error.errors || error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.assetService.deleteAsset(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ error: "Asset not found" });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
