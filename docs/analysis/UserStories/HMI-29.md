---
id: HMI-29
title: Dashboard Sharing/Publishing
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
moscow: SHOULD
justification: "Important for enterprise team collaboration, but secondary to dashboard creation."
---

# HMI-29: Dashboard Sharing/Publishing

### Description
**As a** [[Device Integrator]], **I want to** assign a dashboard to specific users or roles, **so that** they see the relevant operational views automatically when they log in.

### Technical Notes
*   A dashboard can be "Private" (only creator), "Shared" (specific users/roles), or "Public" (anyone in the system).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Assign to Role** | An "Overall Plant Status" dashboard is created. | The Integrator shares it with the "Operator" role. | All users with the "Operator" role can now find and view this dashboard in their menu. |
| **Set as Default** | A user logs in. | A specific dashboard has been set as their "Home". | They are automatically redirected to that dashboard after login. |
| **Revoke Access** | A dashboard is shared with "User_A". | The Integrator removes "User_A" from the sharing list. | "User_A" can no longer access the dashboard. |
