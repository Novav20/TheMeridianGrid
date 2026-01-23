---
id: CORE-06
title: Asset Type Templates (Class Definition)
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
moscow: SHOULD
justification: "Improves efficiency and consistency, but manual asset creation is sufficient for an initial pilot."
functional_requirements: []
---

# CORE-06: Asset Type Templates (Class Definition)

### Description
**As a** [[System Administrator]], **I want to** define reusable "Asset Types" or "Classes" (e.g., "Centrifugal Pump", "Temperature Sensor") with pre-defined properties and telemetry schemas, **so that** Device Integrators can instantiate new assets quickly and consistently without redefining common properties.

### Technical Notes
*   This is the "Class" vs "Instance" concept.
*   Templates should support inheritance (e.g., "Pump" -> "Centrifugal Pump").
*   Changes to a template could optionally propagate to instances (complex, maybe out of scope for MVP, but good to note).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Create Asset Template** | The Admin is on the "Asset Types" management screen. | They define a new type "Motor" with properties "RPM" (telemetry) and "PowerRating" (metadata). | The system saves this template for future use. |
| **Instantiate from Template** | A "Motor" template exists. | A Device Integrator creates a new asset and selects "Motor" as the type. | The new asset should be pre-populated with "RPM" and "PowerRating" fields, requiring only values to be filled in. |
| **Enforce Type Consistency** | A "Motor" template requires "RPM". | The Integrator tries to create a "Motor" asset without mapping the "RPM" property. | The system should warn or require the field before final creation. |
