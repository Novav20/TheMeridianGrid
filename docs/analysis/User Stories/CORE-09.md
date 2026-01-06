---
id: CORE-09
title: Asset Lifecycle Management (Activate/Archive)
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
priority: High
---

# CORE-09: Asset Lifecycle Management (Activate/Archive)

### Description
**As a** [[Device Integrator]], **I want to** explicitly change the state of an asset (Draft, Active, Archived), **so that** I can build and validate configurations safely before they start polluting the production database with data or alerts.

### Technical Notes
*   **Draft:** No ingestion, no alerts.
*   **Active:** Ingestion running, alerts active.
*   **Archived:** No ingestion, historical data read-only.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Activate Asset** | An asset is in "Draft" state. | The Integrator clicks "Activate". | The system validates all required fields, enables MQTT ingestion, and starts evaluating health rules. |
| **Archive Asset** | An asset is "Active". | The Integrator clicks "Archive" (Soft Delete). | The system stops ingestion, disables alerts, and hides it from the default operational views. |
| **Block Incomplete Activation** | A "Draft" asset is missing a required MQTT topic mapping. | The Integrator clicks "Activate". | The system prevents activation and highlights the missing configuration. |
