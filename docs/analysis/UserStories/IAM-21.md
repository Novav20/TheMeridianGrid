---
id: IAM-21
title: Personal/Developer Mode (Single-User Setup)
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: In Progress
actor: "[[User]]"
points: 2
moscow: MUST
justification: "Essential for making the project accessible to students and hobbyists without security overhead."
functional_requirements:
  - "[[FR-17]]"
---

# IAM-21: Personal/Developer Mode (Single-User Setup)

### Description
**As a** [[User]] (Student or Enthusiast), **I want to** enable a "Developer Mode" during the initial setup that grants my account full administrative and integration permissions by default, **so that** I can start building my project immediately without navigating complex multi-user security configurations.

### Technical Notes
*   This is an "Onboarding shortcut."
*   Should only be available during the first-run wizard or via an environment variable (`DEV_MODE=true`).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **First-Run Admin Setup** | The system is freshly installed and no users exist. | The user creates the first account. | The system automatically assigns the "SuperAdmin" role to this account. |
| **Bypass Scope Restrictions** | "Developer Mode" is active. | The user creates an asset. | They are automatically granted full access to that asset and its group without manual scope assignment. |
| **Security Warning** | "Developer Mode" is enabled. | The user accesses the dashboard. | A subtle warning or icon indicates the system is in Developer Mode (not for production use). |
