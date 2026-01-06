---
id: AUTO-33
title: Alert Generation & Lifecycle
epic: "[[02_epics#Epic 4: Intelligent Automation & Control Assurance]]"
status: Backlog
actor: "[[System]]"
points: 3
priority: High
---

# AUTO-33: Alert Generation & Lifecycle

### Description
**As the** [[System]], **I want to** generate an "Alert Instance" whenever a rule condition is met, **so that** the incident is recorded, tracked, and managed through its lifecycle (New -> Acknowledged -> Resolved).

### Technical Notes
*   Alerts must be stored in a dedicated table with timestamps.
*   An alert should "Auto-Resolve" if the condition returns to normal (optional, configurable per rule).

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **New Alert Trigger** | A rule `Temp > 80` is active. | Telemetry arrives with `Temp: 85`. | The system creates a new Alert record with state "New" and severity "Critical." |
| **Alert De-duplication** | An alert is already active for `Temp > 80`. | Another telemetry point arrives with `Temp: 86`. | The system should NOT create a new alert, but rather update the "Last Seen" timestamp of the existing active alert. |
| **Auto-Resolution** | A rule is configured to auto-resolve. | Telemetry returns to `Temp: 70`. | The system marks the active alert as "Resolved" and records the resolution time. |
