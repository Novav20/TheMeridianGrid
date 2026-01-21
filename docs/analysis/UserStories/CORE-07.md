---
id: CORE-07
title: Asset-Level Access Control
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
moscow: MUST
justification: "Security and data isolation are non-negotiable architectural pillars."
---

# CORE-07: Asset-Level Access Control

### Description
**As a** [[System Administrator]], **I want to** assign granular access permissions to assets and their groups, **so that** users (Operators, Data Analysts) only see the information relevant to their assigned area or role, ensuring data privacy and operational security.

### Technical Notes
*   Implementation of Role-Based Access Control (RBAC) at the asset level.
*   Needs to support "Inherited Permissions" (if you have access to a Parent Asset, you might have access to its Children).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Restrict Asset Visibility** | User "Operator_A" only has permission for "Section 1". | "Operator_A" logs into the dashboard. | They should only see assets belonging to "Section 1" and none from "Section 2". |
| **Inherited Permissions** | A user has access to a "Plant Site" asset. | The system checks permissions for sub-assets (e.g., specific machines in that site). | The system should grant access to the sub-assets based on the parent permission. |
| **Unauthorized Data Access Block** | A user tries to query telemetry for an asset they don't have access to via the API. | The system receives the API request. | The system must return a "403 Forbidden" error. |
