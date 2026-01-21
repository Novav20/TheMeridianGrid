---
id: CORE-05
title: Asset Status & Health Definition
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 5
moscow: MUST
justification: "Defines the 'Intelligence' of the platform; providing actionable status is a core BPA requirement."
---

# CORE-05: Asset Status & Health Definition

### Description
**As a** [[Device Integrator]], **I want to** define simple threshold-based rules or logic to determine an asset's operational status (e.g., Healthy, Warning, Critical) based on its telemetry data, **so that** operators can immediately identify assets requiring attention without analyzing raw data.

### Technical Notes
*   Requires a simple rule engine (e.g., JSON-logic or a simple SQL case-statement generator).
*   Status should be a calculated property that updates whenever telemetry is received.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Simple Threshold Rule** | An asset has a "Temperature" property and a rule: `If Temp > 50 then Status = 'Warning'`. | Telemetry arrives with `Temp: 55`. | The asset's status property should automatically update to `Warning`. |
| **Normal Status Recovery** | An asset is in `Warning` status. | Telemetry arrives with `Temp: 40`. | The asset's status should return to `Healthy` (or the default state). |
| **Multiple Rules** | An asset has rules for both `Temp` (Warning > 50) and `Vibration` (Critical > 10). | Telemetry arrives with `Vibration: 12`. | The system should prioritize the most severe status (`Critical`). |
