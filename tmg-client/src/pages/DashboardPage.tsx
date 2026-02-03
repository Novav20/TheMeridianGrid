import { useState, useMemo } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper, CircularProgress, Alert } from "@mui/material";
import { ResponsiveGridLayout, useContainerWidth, type Layout, type ResponsiveLayouts } from "react-grid-layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { renderWidget, type WidgetType } from "../components/widgets/WidgetRegistry";
import { DashboardService } from "../services/dashboard.service";
import { queryKeys } from "@/api/queryKeys";
import type { Dashboard, Widget } from "@tmg/shared";

interface DashboardWidgetInstance {
  i: string;
  type: WidgetType;
  x: number;
  y: number;
  w: number;
  h: number;
  props?: Record<string, unknown>;
}

interface PersistedLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const DashboardPage = () => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();

  // 1. Query: Fetch Dashboards
  const { 
    data: dashboards = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: queryKeys.dashboards.all,
    queryFn: DashboardService.getDashboards,
    // Avoid constant refetching while dragging
    staleTime: 1000 * 60 * 5, 
  });

  const dashboard = dashboards[0] || null;

  // 2. Mutation: Auto-save layout
  const { mutate: saveLayout, isPending: isSaving } = useMutation({
    mutationFn: (newLayout: PersistedLayoutItem[]) => 
      DashboardService.updateDashboard(dashboard!.id, { layout: newLayout }),
    onSuccess: () => {
      // Invalidate to keep cache fresh
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboards.all });
    },
  });

  // 3. Transformation: Map Prisma data to Grid Layout
  const widgets = useMemo((): DashboardWidgetInstance[] => {
    if (!dashboard) return [];
    
    const layoutMap = (dashboard.layout as unknown as PersistedLayoutItem[]) || [];
    const dashboardWithWidgets = dashboard as Dashboard & { widgets: Widget[] };
    
    return (dashboardWithWidgets.widgets || []).map(w => {
      const layoutItem = layoutMap.find(l => l.i === w.id);
      return {
        i: w.id,
        type: w.type as WidgetType,
        x: layoutItem?.x || 0,
        y: layoutItem?.y || 0,
        w: layoutItem?.w || 2,
        h: layoutItem?.h || 2,
        props: w.config as Record<string, unknown>
      };
    });
  }, [dashboard]);

  const layouts = useMemo((): ResponsiveLayouts => {
    return {
      lg: widgets.map((w) => ({
        i: w.i, x: w.x, y: w.y, w: w.w, h: w.h,
      })),
    };
  }, [widgets]);

  // 4. Handlers
  const onLayoutChange = (currentLayout: Layout) => {
    // Only save if in edit mode AND things actually moved (handled by mutation logic)
    if (!isEditMode || !dashboard) return;

    const layoutToSave = currentLayout.map(l => ({
      i: l.i, x: l.x, y: l.y, w: l.w, h: l.h
    }));

    saveLayout(layoutToSave);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If no dashboard exists after loading, we should ideally show a "Create" button
  // For MVP, we assume the user has at least one (handled by backend seed or previous auto-create logic)
  if (!dashboard && !isLoading) {
    return (
        <Box sx={{ p: 3 }}>
            <Alert severity="info">No dashboards found. Please create one in the management view.</Alert>
        </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error instanceof Error ? error.message : "Failed to load dashboard"}</Alert>}
      
      <Paper sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4">{dashboard?.name}</Typography>
          {isSaving && <Typography variant="caption" color="primary">Saving changes...</Typography>}
        </Box>
        <FormControlLabel
          control={<Switch checked={isEditMode} onChange={(e) => setIsEditMode(e.target.checked)} />}
          label="Edit Mode"
        />
      </Paper>

      <Box ref={containerRef} sx={{ flex: 1, overflow: "auto" }}>
        {mounted && dashboard && (
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            width={width}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={60}
            margin={[16, 16]}
            dragConfig={{
              enabled: isEditMode,
              handle: ".drag-handle"
            }}
            resizeConfig={{
              enabled: isEditMode
            }}
            onLayoutChange={onLayoutChange}
          >
            {widgets.map((widget) => (
              <div key={widget.i}>
                {renderWidget(widget.type, widget.props)}
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;