/**
 * Centralized React Query Keys
 *
 * Factory object pattern to manage cache keys consistently across the app.
 */
export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
  },
  assets: {
    all: ["assets"] as const,
    lists: () => [...queryKeys.assets.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.assets.lists(), { filters }] as const,
    details: () => [...queryKeys.assets.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.assets.details(), id] as const,
  },
  dashboards: {
    all: ["dashboards"] as const,
    lists: () => [...queryKeys.dashboards.all, "list"] as const,
    details: () => [...queryKeys.dashboards.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.dashboards.details(), id] as const,
  },
  telemetry: {
    all: ["telemetry"] as const,
    latest: (assetId: string) =>
      [...queryKeys.telemetry.all, "latest", assetId] as const,
    history: (assetId: string, start: string, end: string) =>
      [...queryKeys.telemetry.all, "history", assetId, { start, end }] as const,
  },
};
