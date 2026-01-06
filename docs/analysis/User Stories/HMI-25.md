---
id: HMI-25
title: Dynamic Data Binding
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
moscow: MUST
justification: "Enables the 'Low-Code' promise; allowing integrators to bind data without writing code."
---

# HMI-25: Dynamic Data Binding

### Description
**As a** [[Device Integrator]], **I want to** link a widget's data input to a specific property of a Semantic Asset (e.g., "Boiler 1" -> "Steam Pressure"), **so that** the widget displays the correct live and historical data without manual coding.

### Technical Notes
*   Requires a "Data Picker" UI that navigates the Asset Tree.
*   The binding should store the `asset_id` and `property_name`.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Bind to Telemetry** | A "Gauge" widget is on the dashboard. | The Integrator selects "Pump_01" and its "RPM" property in the binding settings. | The gauge starts reflecting the current value of "RPM" for "Pump_01". |
| **Bind to Metadata** | A "Text" widget is on the dashboard. | The Integrator selects the "Manufacturer" metadata tag for an asset. | The text widget displays "Siemens" (or whatever is stored in the metadata). |
| **Switch Data Source** | An existing widget is bound to "Tank_A". | The Integrator changes the binding to "Tank_B". | The widget immediately clears the old data and begins displaying "Tank_B" data. |
