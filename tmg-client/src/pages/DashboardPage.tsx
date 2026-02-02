import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper, CircularProgress, Alert } from "@mui/material";
import { ResponsiveGridLayout, useContainerWidth, type Layout, type ResponsiveLayouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { renderWidget, type WidgetType } from "../components/widgets/WidgetRegistry";
import { DashboardService } from "../services/dashboard.service";
import type { Dashboard, Widget } from "@tmg/shared";

// Local helper to map Prisma Widget to Grid Layout Item
interface DashboardWidgetInstance {
  i: string; // Map to widget.id
  type: WidgetType;
  x: number;
  y: number;
  w: number;
  h: number;
  props?: Record<string, unknown>;
}

// Interface for the layout stored in JSONB
interface PersistedLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const DashboardPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [widgets, setWidgets] = useState<DashboardWidgetInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { width, containerRef, mounted } = useContainerWidth();

  // Load Dashboards
  useEffect(() => {
    const initDashboard = async () => {
      try {
        setLoading(true);
        const dashboards = await DashboardService.getDashboards();
        
        let activeDashboard: Dashboard;

        if (dashboards.length === 0) {
          // Create a default one if none exists
          activeDashboard = await DashboardService.createDashboard({
            name: "Main Dashboard",
            layout: [],
            widgets: [
              { id: "default-1", type: "STAT_WIDGET", props: { title: "Welcome", value: 0 } }
            ]
          });
        } else {
          activeDashboard = dashboards[0];
        }

        // Hydrate state
        setDashboard(activeDashboard);
        
        // Map widgets and layout
        const layoutMap = (activeDashboard.layout as unknown as PersistedLayoutItem[]) || [];
        const dashboardWithWidgets = activeDashboard as Dashboard & { widgets: Widget[] };
        const hydratedWidgets = (dashboardWithWidgets.widgets || []).map(w => {
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

        setWidgets(hydratedWidgets);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, []);

  // Save Layout to Backend (Debounced)
  const saveLayout = useCallback(async (currentWidgets: DashboardWidgetInstance[]) => {
    if (!dashboard) return;
    
    try {
      setSaving(true);
      const layout = currentWidgets.map(w => ({
        i: w.i, x: w.x, y: w.y, w: w.w, h: w.h
      }));

      await DashboardService.updateDashboard(dashboard.id, {
        layout
      });
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setSaving(false);
    }
  }, [dashboard]);

  // Handle layout changes
  const onLayoutChange = (currentLayout: Layout) => {
    if (!isEditMode) return;

    // Update local state
    const updatedWidgets = widgets.map(w => {
      const l = currentLayout.find(item => item.i === w.i);
      if (l) {
        return { ...w, x: l.x, y: l.y, w: l.w, h: l.h };
      }
      return w;
    });

    setWidgets(updatedWidgets);
    
    // Trigger save
    saveLayout(updatedWidgets);
  };

  const layouts = useMemo((): ResponsiveLayouts => {
    return {
      lg: widgets.map((w) => ({
        i: w.i,
        x: w.x,
        y: w.y,
        w: w.w,
        h: w.h,
      })),
    };
  }, [widgets]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {/* Header / Toolbar */}
      <Paper sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4">{dashboard?.name || "Operational Dashboard"}</Typography>
          {saving && <Typography variant="caption" color="primary" sx={{ ml: 2 }}>Saving changes...</Typography>}
        </Box>
        <FormControlLabel
          control={<Switch checked={isEditMode} onChange={(e) => setIsEditMode(e.target.checked)} />}
          label="Edit Mode"
        />
      </Paper>

      {/* Grid Area */}
      <Box ref={containerRef} sx={{ flex: 1, overflow: "auto" }}>
        {mounted && (
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