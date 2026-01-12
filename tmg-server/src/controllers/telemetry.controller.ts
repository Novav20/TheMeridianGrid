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
}
