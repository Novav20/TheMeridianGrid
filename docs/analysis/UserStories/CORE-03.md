---
id: CORE-03
title: Relationship Management
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
moscow: SHOULD
justification: "Logical grouping and hierarchy improve UX and scalability, but flat lists are functional for a basic MVP."
functional_requirements: []
---

# CORE-03: Relationship Management

### Description
**As a** [[Device Integrator]], **I want to** define hierarchical and logical relationships between Digital Assets (e.g., Parent/Child, Contains, ConnectedTo), **so that** the system can model the complex structure of the physical plant and support cascading status updates or aggregations.

### Technical Notes
*   Requires a recursive or graph-like structure in the database (e.g., `parent_id` self-reference in SQL or a dedicated relationship table).
*   Must prevent circular dependencies (A is parent of B, B is parent of A).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Define Parent-Child Relationship** | Two assets exist: "Production Line 1" and "Conveyor Belt A". | The Integrator sets "Production Line 1" as the parent of "Conveyor Belt A". | The system updates the relationship, and "Conveyor Belt A" now appears nested under "Production Line 1" in the asset tree. |
| **Prevent Circular Dependency** | Asset A is parent of Asset B. | The Integrator tries to set Asset B as the parent of Asset A. | The system must detect the cycle and reject the update with a clear error message. |
| **Remove Relationship** | "Conveyor Belt A" is a child of "Production Line 1". | The Integrator removes the parent relationship. | "Conveyor Belt A" becomes a root-level asset (orphan) or remains in the system without a parent. |
