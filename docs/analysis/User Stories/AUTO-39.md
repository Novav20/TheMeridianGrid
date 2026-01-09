---
id: AUTO-39
title: Maintenance Mode Suppression
epic: "[[02_epics#Epic 4: Intelligent Automation & Control Assurance]]"
status: Backlog
actor: "[[Operator]]"
points: 2
moscow: COULD
justification: "Useful for operational sanity, but users can manually disable rules as a workaround in v1.0."
---

# AUTO-39: Maintenance Mode Suppression

### Description
**As an** [[Operator]], **I want to** put an asset into "Maintenance Mode," **so that** its rules and alerts are suppressed while it is being serviced, preventing "false alarms" from being sent to the team.

### Technical Notes
*   This is a temporary state override.
*   The asset should still ingest data (for history), but the Rule Engine should skip it.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Enable Maintenance Mode** | An asset is "Active". | An Operator toggles "Maintenance Mode" ON. | The system visually flags the asset as "Under Maintenance" and stops evaluating its automation rules. |
| **Alert Suppression** | An asset is in Maintenance Mode. | A sensor value exceeds a threshold. | The system should NOT trigger an alert or send notifications. |
| **Maintenance Timeout** | An Operator forgets to turn off Maintenance Mode. | 24 hours pass. | The system sends a reminder notification to the Admin or automatically returns the asset to "Active" mode. |
