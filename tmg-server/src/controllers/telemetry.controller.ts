import { Request, Response, NextFunction } from "express";
import { TelemetryService } from "../services/telemetry.service";
import {
  createTelemetryBatchSchema,
  CreateTelemetryBatchDto,
} from "../schemas/telemetry.schema";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/types";
import { Telemetry } from "../../prisma/client/client";

/**
 * Controller: TelemetryController
 * Purpose: Handles HTTP traffic for Telemetry ingestion and retrieval.
 */
export class TelemetryController {
  constructor(private telemetryService: TelemetryService) {}

  /**
   * Ingests a batch of telemetry data points.
   */
  public ingest = async (
    req: Request<{}, ApiResponse, CreateTelemetryBatchDto>,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => {
    const batchData = createTelemetryBatchSchema.parse(req.body);
    await this.telemetryService.ingestTelemetry(batchData);
    res.status(201).json({
      success: true,
      message: "Telemetry ingested successfully",
    });
  };

  /**
   * Retrieves historical telemetry data for a specific asset.
   */
  public getHistory = async (
    req: Request<
      { assetId: string },
      ApiResponse<Telemetry[]>,
      {},
      { start: string; end: string }
    >,
    res: Response<ApiResponse<Telemetry[]>>,
    next: NextFunction
  ) => {
    const { assetId } = req.params;
    const { start, end } = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new AppError(400, "Invalid start or end date");
    }

    const data = await this.telemetryService.getHistory(
      assetId,
      startDate,
      endDate
    );
    res.status(200).json({
      success: true,
      data,
    });
  };

  /**
   * Retrieves the most recent telemetry data point for an asset.
   */
  public getLatest = async (
    req: Request<{ assetId: string }, ApiResponse<Telemetry>>,
    res: Response<ApiResponse<Telemetry>>,
    next: NextFunction
  ) => {
    const { assetId } = req.params;
    const data = await this.telemetryService.getLatest(assetId);

    if (!data) {
      throw new AppError(404, "No telemetry found for this asset");
    }

    res.status(200).json({
      success: true,
      data,
    });
  };
}