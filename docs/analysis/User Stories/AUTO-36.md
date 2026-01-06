---
id: AUTO-36
title: Automated Action Definition
epic: "[[02_epics#Epic 4: Intelligent Automation & Control Assurance]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 5
priority: Medium
---

# AUTO-36: Automated Action Definition

### Description
**As a** [[Device Integrator]], **I want to** link a rule to an automated command (e.g., "If Tank Full THEN Close Valve"), **so that** the system can perform immediate safety or optimization actions without waiting for a human.

### Technical Notes
*   **Command Execution:** This uses the same MQTT mechanism as the HMI control widgets (Epic 3).
*   **Logging:** Every automated command must be flagged as "System Generated" in the audit trail.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Configure Action** | A rule `Level > 90%` exists. | The Integrator adds an action: `SEND COMMAND {State: 'Closed'} to Valve_01`. | The system saves the association. |
| **Trigger Action** | Tank Level reaches 95%. | The rule engine detects the breach. | The system automatically sends the MQTT command to close the valve. |
| **Audit Trace** | An action was triggered. | A user checks the Audit Trail. | They see a record: "SYSTEM automated action: Closed Valve_01 due to Rule 'Tank Full'". |
