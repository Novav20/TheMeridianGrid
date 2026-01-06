---
id: HMI-30
title: Full-screen Kiosk Mode
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 2
priority: Low
---

# HMI-30: Full-screen Kiosk Mode

### Description
**As an** [[Operator]] (or Facility Manager), **I want to** run a dashboard in a "Kiosk Mode" (Full-screen, hidden navigation, auto-refresh), **so that** it can be displayed on large wall-mounted monitors without manual intervention.

### Technical Notes
*   **Implementation:** A specific URL parameter (e.g., `?mode=kiosk`) that hides the sidebar and top navigation.
*   **Security:** Kiosk sessions should be long-lived or use a specific "Kiosk User" with read-only permissions.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Enter Kiosk Mode** | A dashboard is open. | The user clicks the "Full Screen / Kiosk" button. | The browser enters full-screen mode, and all UI chrome (menus, buttons) disappears, leaving only the widgets. |
| **Auto-Re-authentication** | A kiosk has been running for 48 hours. | The session expires. | The system should automatically attempt to re-authenticate (if configured) or show a large, clear "Login Required" screen. |
