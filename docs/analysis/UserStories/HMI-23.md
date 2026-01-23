---
id: HMI-23
title: Drag-and-Drop Grid Layout
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 5
moscow: MUST
justification: "Core 'Flexibility' hypothesis; differentiates TMG from static, rigid legacy SCADA systems."
functional_requirements:
  - "[[FR-19]]"
---

# HMI-23: Drag-and-Drop Grid Layout

### Description
**As a** [[Device Integrator]], **I want to** arrange widgets on a flexible grid using drag-and-drop and resizing, **so that** I can optimize the screen space for different devices and emphasize critical information.

### Technical Notes
*   **Library:** React-Grid-Layout or GridStack.js.
*   **Persistence:** The (x, y, w, h) coordinates for each widget must be saved in the dashboard JSON.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Move Widget** | A dashboard has a "Pump Status" widget at (0,0). | The Integrator drags it to (5,0). | The system visually moves the widget and saves the new coordinates upon clicking "Save". |
| **Resize Widget** | A chart is too small to read. | The Integrator drags the corner to double its width. | The chart content (e.g., ECharts/Recharts) should automatically scale to fit the new container size. |
| **Grid Snap** | A widget is dragged to an irregular position. | The user releases the mouse. | The system should "snap" the widget to the nearest grid cell to maintain a clean layout. |
