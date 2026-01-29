import { useState, useMemo } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper } from "@mui/material";
import { ResponsiveGridLayout, useContainerWidth, type Layout, type ResponsiveLayouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { renderWidget, type WidgetType } from "../components/widgets/WidgetRegistry";

// Define the structure of a widget instance on the dashboard
interface DashboardWidget {
  i: string; // Unique ID
  type: WidgetType;
  x: number;
  y: number;
  w: number;
  h: number;
  props?: Record<string, any>; // Instance-specific props (e.g., title override)
}

// Initial Mock Layout
const INITIAL_WIDGETS: DashboardWidget[] = [
  { i: "1", type: "STAT_WIDGET", x: 0, y: 0, w: 2, h: 2, props: { title: "Active Assets", value: 12 } },
  { i: "2", type: "STATUS_WIDGET", x: 2, y: 0, w: 2, h: 2, props: { title: "Main Pump", isActive: true } },
  { i: "3", type: "CHART_WIDGET", x: 0, y: 2, w: 6, h: 4, props: { title: "Power Consumption" } },
  { i: "4", type: "STAT_WIDGET", x: 4, y: 0, w: 2, h: 2, props: { title: "Alerts", value: 3, unit: "high priority" } },
];

export const DashboardPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgets, _setWidgets] = useState<DashboardWidget[]>(INITIAL_WIDGETS);
  const { width, containerRef, mounted } = useContainerWidth();

  // Transform internal widget state to react-grid-layout format
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

  // Handle layout changes (drag/resize end)
  const onLayoutChange = (currentLayout: Layout, allLayouts: ResponsiveLayouts) => {
    // In a real app, we would save this to the backend
    console.log("Layout Changed:", currentLayout, allLayouts);
  };

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header / Toolbar */}
      <Paper sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Operational Dashboard</Typography>
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
              handle: ".drag-handle",
            }}
            resizeConfig={{
              enabled: isEditMode,
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
