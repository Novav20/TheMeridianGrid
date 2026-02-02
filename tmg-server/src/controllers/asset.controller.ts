import { Request, Response, NextFunction } from "express";
import { AssetService } from "../services/asset.service";
import {
  createAssetSchema,
  updateAssetSchema,
  CreateAssetDto,
  Asset,
  ApiResponse,
} from "@tmg/shared";
import { AppError } from "../utils/AppError";

/**
 * Interface: AssetParams
 * Defines the URL parameters for asset endpoints.
 */
interface AssetParams {
  id: string;
}

/**
 * Controller: AssetController
 * Purpose: Handles HTTP traffic for Asset-related endpoints.
 */
export class AssetController {
  constructor(private assetService: AssetService) {}

  /**
   * Retrieves all assets, optionally filtered by metadata query parameters.
   */
  public getAll = async (
    req: Request<{}, ApiResponse<Asset[]>, {}, Record<string, any>>,
    res: Response<ApiResponse<Asset[]>>,
    next: NextFunction,
  ) => {
    const metadataFilter: Record<string, any> = {};

    Object.keys(req.query).forEach((key) => {
      if (key.startsWith("metadata.")) {
        const fieldName = key.replace("metadata.", "");
        metadataFilter[fieldName] = req.query[key];
      }
    });

    const data = await this.assetService.getAllAssets(metadataFilter);
    res.status(200).json({
      success: true,
      data,
    });
  };

  /**
   * Creates a new digital asset.
   */
  public create = async (
    req: Request<{}, ApiResponse<Asset>, CreateAssetDto>,
    res: Response<ApiResponse<Asset>>,
    next: NextFunction,
  ) => {
    const validatedData = createAssetSchema.parse(req.body);
    const asset = await this.assetService.createAsset(validatedData);
    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  };

  /**
   * Retrieves a single asset by its UUID.
   */
  public getById = async (
    req: Request<AssetParams, ApiResponse<Asset>>,
    res: Response<ApiResponse<Asset>>,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const asset = await this.assetService.getAssetById(id);

    if (!asset) {
      throw new AppError(404, "Asset not found");
    }

    res.status(200).json({
      success: true,
      data: asset,
    });
  };

  /**
   * Updates an existing asset.
   */
  public update = async (
    req: Request<AssetParams, ApiResponse<Asset>, Partial<CreateAssetDto>>,
    res: Response<ApiResponse<Asset>>,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    const validatedData = updateAssetSchema.parse(req.body);
    const updatedAsset = await this.assetService.updateAsset(id, validatedData);

    res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data: updatedAsset,
    });
  };

  /**
   * Deletes an asset.
   */
  public delete = async (
    req: Request<AssetParams, ApiResponse>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    await this.assetService.deleteAsset(id);
    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  };
}