---
id: AUTO-35
title: Alert Acknowledgment Dashboard
epic: "[[02_epics#Epic 4: Intelligent Automation & Control Assurance]]"
status: Backlog
actor: "[[Operator]]"
points: 3
moscow: MUST
justification: "The primary operational workflow for managing and silencing incidents."
functional_requirements:
  - "[[FR-27]]"
---

# AUTO-35: Alert Acknowledgment Dashboard

### Description
**As an** [[Operator]], **I want to** view a list of active alerts and "Acknowledge" them, **so that** my team knows the incident is being handled and to silence repeat notifications.

### Technical Notes
*   **Acknowledgment:** Stores `user_id` and `timestamp`.
*   **Silence:** Prevents further notifications for that specific incident.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **View Active Alerts** | Multiple alerts have triggered. | The Operator opens the "Alert Inbox". | They see a list of unacknowledged alerts sorted by severity and time. |
| **Acknowledge Alert** | An alert is "New". | The Operator clicks "Acknowledge". | The alert state changes to "Acknowledged," and the system records who took responsibility. |
| **Silence Notification** | An alert is buzzing the UI or phone. | The Operator acknowledges it. | The buzzing stops, and the notification channel is "Silenced" for this specific incident. |
