import { Request, Response } from "express";
import { TelemetryService } from "../services/telemetry.service";
import { createTelemetryBatchSchema } from "../schemas/telemetry.schema";
import { AppError } from "../utils/AppError"; // Import AppError

export class TelemetryController {
  constructor(private telemetryService: TelemetryService) {}

  public ingest = async (req: Request, res: Response) => {
    const batchData = createTelemetryBatchSchema.parse(req.body); // ZodError will be caught by global handler
    const result = await this.telemetryService.ingestTelemetry(batchData);
    res.status(201).json(result);
  };

  public getHistory = async (req: Request, res: Response) => {
    const { assetId } = req.params;
    const { start, end } = req.query;

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new AppError(400, "Invalid start or end date");
    }

    const data = await this.telemetryService.getHistory(
      assetId,
      startDate,
      endDate
    );
    res.status(200).json(data);
  };

  public getLatest = async (req: Request, res: Response) => {
    const { assetId } = req.params;
    const data = await this.telemetryService.getLatest(assetId);

    if (!data) {
      throw new AppError(404, "No telemetry found for this asset");
    }

    res.status(200).json(data);
  };
}
