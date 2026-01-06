---
id: IAM-11
title: User Onboarding & CRUD
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 3
priority: High
---

# IAM-11: User Onboarding & CRUD

### Description
**As a** [[System Administrator]], **I want to** create, view, update, and disable user accounts, **so that** I can grant access to the platform for team members (or classmates) and revoke it when they leave.

### Technical Notes
*   **Auth Strategy:** Use Local Authentication (Postgres + Argon2/Bcrypt) to ensure the system is standalone and deployable on restricted networks or student laptops without external cloud dependencies.
*   **Unique Constraints:** Email must be unique.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Create New User** | The Admin is on the "Users" page. | They enter an email "student@uni.edu" and a name, and click "Create". | The system creates the account and sends an invitation email (or generates a temporary setup link). |
| **Edit User Details** | A user exists with a typo in their name. | The Admin updates the name field. | The change is saved immediately. |
| **Disable User** | A team member has left the project. | The Admin clicks "Disable" or "Suspend". | The user can no longer log in, but their data/history remains intact. |
