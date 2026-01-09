---
id: HMI-27
title: Historical Data Filter
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 3
moscow: MUST
justification: "Required for troubleshooting and trend analysis; essential for operational oversight."
---

# HMI-27: Historical Data Filter

### Description
**As an** [[Operator]], **I want to** change the time range of my dashboard (e.g., Last 1 Hour, Last 24 Hours, Custom Range), **so that** I can analyze trends and investigate the root cause of historical anomalies.

### Technical Notes
*   Requires optimized SQL queries to TimescaleDB (aggregations).
*   Global dashboard "Time Picker" vs per-widget time override.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Quick Time Select** | A dashboard is currently showing "Live" (Last 5 mins). | The Operator selects "Last 24 Hours". | All charts and stats on the dashboard update to show data from the last 24-hour period. |
| **Custom Range Selection** | An incident happened last Tuesday. | The Operator picks a specific date/time range. | The dashboard loads and displays the data specifically for that window. |
| **No Data Handling** | No data was recorded for the selected range. | The range is applied. | The widgets should show a clear "No Data for this Period" state instead of breaking or showing zero. |
