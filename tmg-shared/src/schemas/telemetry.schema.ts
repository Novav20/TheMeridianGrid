import { z } from "zod";

/**
 * Zod schema for a single telemetry data point.
 */
export const telemetryDataPointSchema = z.object({
  time: z.coerce.date(),
  assetId: z.uuid(),
  propertyName: z.string(),
  value: z.number(),
});

/**
 * Zod schema for batch telemetry ingestion.
 */
export const createTelemetryBatchSchema = z.array(telemetryDataPointSchema);

/**
 * TypeScript types inferred from the schemas.
 */
export type TelemetryDataPointDto = z.infer<typeof telemetryDataPointSchema>;
export type CreateTelemetryBatchDto = z.infer<typeof createTelemetryBatchSchema>;
