---
id: IAM-12
title: Role Assignment (RBAC)
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 3
moscow: MUST
justification: "Critical for strictly separating 'Integrator' (Builder) from 'Operator' (User) functions."
---

# IAM-12: Role Assignment (RBAC)

### Description
**As a** [[System Administrator]], **I want to** assign predefined roles (Administrator, Integrator, Operator, Viewer) to users, **so that** they automatically inherit the correct permissions for their job function without manual configuration.

### Technical Notes
*   **Role Definitions:**
    *   **Admin:** Full access to everything.
    *   **Integrator:** Can create/edit Assets (Epic 1 features), but maybe not delete Users.
    *   **Operator:** Read-only on Assets, but can acknowledge Alerts and Control (if permitted).
    *   **Viewer:** Read-only Dashboard (great for the "Student Portfolio" use case).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Assign Role** | A user "Jane" is currently a "Viewer". | The Admin changes her role to "Integrator". | Jane immediately gains access to the "Asset Management" and "Configuration" menus. |
| **Role Downgrade** | A user is an "Admin". | Another Admin demotes them to "Operator". | The user loses access to the "Settings" and "User Management" screens. |
| **Default Role** | A new user registers (e.g., in a public student mode) or is invited. | No specific role was selected. | The system assigns the safest default role (e.g., "Viewer"). |
