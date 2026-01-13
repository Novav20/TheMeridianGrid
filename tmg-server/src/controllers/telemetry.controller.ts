import { Request, Response } from "express";
import { TelemetryService } from "../services/telemetry.service";
import { createTelemetryBatchSchema } from "../schemas/telemetry.schema";

export class TelemetryController {
  constructor(private telemetryService: TelemetryService) {}

  public ingest = async (req: Request, res: Response) => {
    try {
      const batchData = createTelemetryBatchSchema.parse(req.body);
      const result = await this.telemetryService.ingestTelemetry(batchData);
      res.status(201).json(result);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.errors || error.message });
    }
  };

  public getHistory = async (req: Request, res: Response) => {
    try {
      const { assetId } = req.params;
      const { start, end } = req.query;

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        res.status(400).json({ error: "Invalid start or end date" });
        return;
      }

      const data = await this.telemetryService.getHistory(
        assetId,
        startDate,
        endDate
      );
      res.status(200).json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public getLatest = async (req: Request, res: Response) => {
    try {
      const { assetId } = req.params;
      const data = await this.telemetryService.getLatest(assetId);

      if (!data) {
        res.status(404).json({ error: "No telemetry found for this asset" });
        return;
      }

      res.status(200).json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
