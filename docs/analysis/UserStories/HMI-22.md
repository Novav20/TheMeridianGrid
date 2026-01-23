---
id: HMI-22
title: Dashboard CRUD
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
moscow: MUST
justification: "Allows users to organize views by site, asset group, or job function."
functional_requirements:
  - "[[FR-18]]"
---

# HMI-22: Dashboard CRUD

### Description
**As a** [[Device Integrator]], **I want to** create, rename, and delete multiple dashboards, **so that** I can organize specific monitoring views for different production lines, sites, or user roles.

### Technical Notes
*   Dashboards are stored as JSON configurations in the database (layout, widget IDs, settings).
*   Should support a "Home Dashboard" setting for the user.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Create New Dashboard** | The Integrator is on the Dashboard Management screen. | They click "New" and provide a name "Boiler Room 1". | The system creates an empty dashboard and redirects the user to the editor. |
| **Duplicate Dashboard** | A complex dashboard already exists. | The Integrator chooses "Duplicate". | The system creates an exact copy of the layout and bindings under a new name. |
| **Delete Dashboard** | A dashboard is no longer needed. | The Integrator clicks "Delete" and confirms. | The dashboard is removed, but the underlying asset data remains untouched. |
