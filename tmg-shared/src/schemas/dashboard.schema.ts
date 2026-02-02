import { z } from "zod";

/**
 * Zod Schema for Creating a Dashboard.
 * - name: Unique name for the dashboard
 * - layout: Array of widget positions (React-Grid-Layout format)
 * - widgets: Array of widget configurations (Internal WidgetRegistry format)
 */
export const createDashboardSchema = z.object({
  name: z.string().min(3).max(50),
  layout: z.array(z.object({
    i: z.string(),
    x: z.number(),
    y: z.number(),
    w: z.number(),
    h: z.number(),
  })),
  widgets: z.array(z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.string(), z.any()).optional(),
  })),
});

/**
 * Zod schema for updating an existing dashboard.
 */
export const updateDashboardSchema = createDashboardSchema.partial();

/**
 * TypeScript types inferred from schemas.
 */
export type CreateDashboardDto = z.infer<typeof createDashboardSchema>;
export type UpdateDashboardDto = z.infer<typeof updateDashboardSchema>;
