import { z } from "zod";
import { AssetState } from "../../prisma/client/client";

/**
 * Zod Schema for Creating an Asset.
 * Acts as the DTO (Data Transfer Object) definition for the Asset creation request.
 */
export const createAssetSchema = z.object({
  name: z.string().min(3),
  model: z.record(z.string(), z.any()),
  metadata: z.record(z.string(), z.any()).optional(),
  state: z.nativeEnum(AssetState).optional(),
  parentId: z.string().uuid().optional(),
});
/**
 * Zod schema for updating an existing asset (all fields optional).
 */
export const updateAssetSchema = createAssetSchema.partial();
/**
 * TypeScript type inferred from the createAssetSchema.
 */
export type CreateAssetDto = z.infer<typeof createAssetSchema>;