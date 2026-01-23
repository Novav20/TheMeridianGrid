---
id: CORE-04
title: Asset Metadata Tagging
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 2
moscow: MUST
justification: "Essential for identifying physical hardware (serial numbers, manufacturers) in the registry."
---

# CORE-04: Asset Metadata Tagging

### Description
**As a** [[Device Integrator]], **I want to** attach arbitrary key-value metadata to an asset (e.g., Serial Number, Manufacturer, Site Location), **so that** users can search, filter, and identify equipment using business-specific identifiers.

### Technical Notes
*   Metadata should be stored in a flexible format (Postgres `JSONB`).
*   Support for "Static" properties (don't change with time) vs "Telemetry" properties (change with time).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Add Static Metadata** | An asset "Motor_01" exists. | The Integrator adds a tag `Manufacturer: Siemens` and `Serial: S12345`. | The tags are saved and correctly displayed in the asset's detail view. |
| **Search by Metadata** | Multiple assets have a `Location: Warehouse A` tag. | A user searches for assets with `Location: Warehouse A`. | The system returns all assets tagged with that specific location. |
| **Update Metadata** | An asset has an incorrect `Site` tag. | The Integrator updates the `Site` value. | The system updates the record and maintains the latest value for that key. |
