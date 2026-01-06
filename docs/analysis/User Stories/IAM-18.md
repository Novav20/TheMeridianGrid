---
id: IAM-18
title: Audit Logs (User Activity)
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
priority: High
---

# IAM-18: Audit Logs (User Activity)

### Description
**As a** [[System Administrator]], **I want to** view a detailed log of user activity (Logins, Asset Deletions, Permission Changes), **so that** I can conduct post-incident investigations and verify compliance with operational safety standards.

### Technical Notes
*   **Immutability:** Audit logs should be "Append-Only" and protected from deletion (even by Admins).
*   **Format:** Timestamp, UserID, Action, IP Address, ResourceID.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Log Critical Action** | An Integrator deletes an asset. | The deletion occurs. | The system automatically creates an entry in the audit log recording the action. |
| **Filter Audit Log** | The Admin needs to find out who changed "User X's" role last week. | They filter the audit log by UserID and Date. | The system displays the matching chronological entries. |
| **Export Logs** | For an external safety audit. | The Admin clicks "Export to CSV/PDF". | The system generates a report containing the requested time range of logs. |
