import { z } from "zod";
import { RuleOperator, Severity } from "../../prisma/client/client";

/**
 * Zod schema for creating a new Rule.
 */
export const createRuleSchema = z.object({
  metric: z.string().min(1),
  operator: z.nativeEnum(RuleOperator),
  threshold: z.number(),
  severity: z.nativeEnum(Severity).default(Severity.INFO),
  isActive: z.boolean().default(true),
  assetId: z.uuid(),
});

/**
 * Zod schema for updating an existing Rule (all fields optional).
 */
export const updateRuleSchema = createRuleSchema.partial();

/**
 * TypeScript types inferred from the schemas.
 */
export type CreateRuleDto = z.infer<typeof createRuleSchema>;
export type UpdateRuleDto = z.infer<typeof updateRuleSchema>;
