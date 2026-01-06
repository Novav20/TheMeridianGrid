---
id: CORE-01
title: Asset Onboarding & Semantic Modeling
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 5
moscow: MUST
justification: "Fundamental for creating the digital twin foundation; without assets, the system has no purpose."
---

# CORE-01: Asset Onboarding & Semantic Modeling

### Description
**As a** [[Device Integrator]], **I want to** create a standardized digital representation (Digital Twin) of a physical machine by defining its properties and telemetry using AAS/DTDL standards, **so that** the system can process and display data from heterogeneous hardware in a unified way.

### Technical Notes
*   Requires a metadata schema in Postgres using JSONB to store flexible DTDL models.
*   Must validate unique asset names.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Successful Creation** | The Integrator is authenticated and on the "Asset Management" screen. | They provide a unique name, select a device type, and define a set of telemetry properties. | The system should save the new asset model and generate a unique "Asset Identity" (ID). |
| **Duplicate Asset Check** | An asset with the name "Pump_01" already exists. | The Integrator tries to create another asset with the name "Pump_01". | The system must show an error message and prevent the duplicate creation. |
