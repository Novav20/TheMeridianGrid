---
id: HMI-24
title: Core Widget Library
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 5
moscow: MUST
justification: "Standard visualizations (charts, gauges) are required to translate raw data into information."
---

# HMI-24: Core Widget Library

### Description
**As a** [[Device Integrator]], **I want to** choose from a library of standard visualization widgets (Time-series Line Chart, Radial Gauge, Numeric Display, Status Indicator), **so that** I can represent different types of telemetry data appropriately.

### Technical Notes
*   **Charts:** Use a library like `recharts` or `echarts-for-react`.
*   **Gauges:** Custom SVG or canvas-based gauges.
*   **Extensibility:** The system should be designed to allow adding "Custom Widgets" in the future.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Add Line Chart** | The Integrator is in "Edit Mode". | They select "Add Widget" -> "Time Series Line Chart". | An empty chart widget appears on the grid. |
| **Add Status Indicator** | The Integrator wants to show if a pump is ON/OFF. | They select "Status Indicator". | A widget that changes color (Red/Green) based on a boolean or enum property appears. |
| **Widget Customization** | A chart is added. | The Integrator opens "Widget Settings" and changes the line color to Blue. | The widget preview and saved state reflect the new color. |
