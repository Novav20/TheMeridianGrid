---
id: AUTO-40
title: Alert Correlation & Grouping
epic: "[[02_epics#Epic 4: Intelligent Automation & Control Assurance]]"
status: Backlog
actor: "[[System]]"
points: 5
moscow: COULD
justification: "Advanced UX for high-scale environments; individual alerts are acceptable for initial pilots."
---

# AUTO-40: Alert Correlation & Grouping

### Description
**As the** [[System]], **I want to** group related alerts from the same asset or site into a single "Incident," **so that** operators are not overwhelmed by dozens of redundant notifications for a single underlying failure.

### Technical Notes
*   **Correlation Logic:** If multiple sensors on the same machine fail within X minutes, group them.
*   **UI:** Display as a "Threaded" alert view.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Alert Grouping** | A motor fails, triggering "Overheat," "Vibration," and "Low RPM" alerts simultaneously. | The system processes the events. | The system creates one "Incident: Motor Failure" and groups the three specific alerts under it. |
| **Notification Reduction** | Multiple related alerts occur. | The system evaluates the group. | The system only sends ONE "Critical Incident" notification instead of three separate ones. |
| **Group Resolution** | An Incident is resolved by the operator. | They mark the Incident as "Fixed". | All sub-alerts are automatically marked as "Resolved." |
