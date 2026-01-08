import { Request, Response } from "express";
import { AssetService } from "../services/asset.service";

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
}
