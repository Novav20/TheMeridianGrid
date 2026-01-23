---
id: HMI-31
title: Adaptive Mobile Layout
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 5
moscow: COULD
justification: "Nice to have for remote monitoring, but industrial tasks are primarily performed on workstations/tablets."
---

# HMI-31: Adaptive Mobile Layout

### Description
**As an** [[Operator]], **I want to** view my dashboards on a mobile device or tablet, **so that** I can monitor asset health while moving around the plant or working remotely.

### Technical Notes
*   **Grid Behavior:** The grid should collapse into a single-column layout on small screens.
*   **Touch Optimization:** Large touch targets for buttons and sliders.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Responsive Grid** | A dashboard has a 3-column layout on Desktop. | The Operator opens it on a smartphone. | The widgets stack vertically in a single column, maintaining their relative order. |
| **Mobile Navigation** | The user is on a phone. | The sidebar menu is hidden behind a "Hamburger" icon. | Tapping the icon reveals the menu clearly without overlapping critical widget data. |
| **Pinch-to-Zoom** | A complex chart is being viewed. | The user pinches to zoom into a specific trend. | The chart handles the interaction gracefully (if supported by the chart library). |
