---
id: HMI-43
title: UI Theming & Accessibility
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 2
priority: Low
---

# HMI-43: UI Theming & Accessibility

### Description
**As an** [[Operator]], **I want to** switch between Light and Dark themes and adjust font sizes, **so that** I can read the dashboard clearly in different environmental lighting conditions (e.g., bright factory floor vs. dark control room).

### Technical Notes
*   Use CSS Variables or a UI library with built-in theming (Tailwind/Material UI).
*   Persist the theme preference in local storage or user profile.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Apply Dark Mode** | The Operator is working a night shift. | They toggle "Dark Mode" ON. | The entire UI switches to a high-contrast dark theme (charcoal/dark-blue background) to reduce eye strain. |
| **Theme Persistence** | A user has selected "Light Mode". | They log out and log back in. | The dashboard should remember and automatically apply the "Light Mode" theme. |
