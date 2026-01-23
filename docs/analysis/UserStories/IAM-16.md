---
id: IAM-16
title: Custom Role Definition
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
moscow: COULD
justification: "Predefined roles are sufficient for MVP; dynamic role creation adds non-essential complexity."
functional_requirements: []
---

# IAM-16: Custom Role Definition

### Description
**As a** [[System Administrator]], **I want to** create custom roles with specific combinations of permissions, **so that** I can tailor the platform's security to unique project needs (e.g., a "Student Laboratory Assistant" role).

### Technical Notes
*   **Permission Granularity:** Create, Read, Update, Delete, Execute (Control) for various modules (Assets, Users, Alerts).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Create Custom Role** | The Admin is on the "Roles" management page. | They create a "Maintenance Tech" role with "Read" access to all assets but "Update" access only to "Status". | The system saves the role and makes it available for assignment. |
| **Delete Role** | A custom role is no longer needed. | The Admin clicks "Delete". | The system prevents deletion if any users are currently assigned to that role. |
| **Permission Conflict** | A role is assigned with conflicting permissions. | The system evaluates the hierarchy. | The most restrictive (or least restrictive, depending on policy) permission takes precedence. |
