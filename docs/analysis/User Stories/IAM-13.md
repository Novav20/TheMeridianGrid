---
id: IAM-13
title: Asset Scope Assignment
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
priority: High
---

# IAM-13: Asset Scope Assignment

### Description
**As a** [[System Administrator]], **I want to** restrict a user's access to specific asset groups or sites (e.g., "Lab 1 only" or "Station A only"), **so that** even within the same role, users can only interact with the equipment assigned to them.

### Technical Notes
*   This is the implementation of the "Scoped Access" concept.
*   Requires a mapping table between `users` and `asset_groups`.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Assign Site Scope** | User "Student_X" has the "Operator" role. | The Admin assigns them to the "Robotics Lab" asset group. | "Student_X" can see all robots in that group but cannot see the "CNC Machine" group. |
| **Scope Overlap** | A user is assigned to two different sites. | They log in. | They should see the union of assets from both sites. |
| **Revoke Scope** | The Admin removes a user from a specific scope. | The user refreshes their dashboard. | The assets from that scope should immediately disappear from their view. |
