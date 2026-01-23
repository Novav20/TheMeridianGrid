---
id: HMI-28
title: Remote Control Widget
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 5
moscow: SHOULD
justification: "Powerful feature for closing the loop, but monitoring (Read) is the first priority for MVP."
functional_requirements: []
---

# HMI-28: Remote Control Widget

### Description
**As an** [[Operator]], **I want to** use interactive widgets (Toggle Switches, Sliders, Input Fields) to send commands to physical assets, **so that** I can adjust setpoints or start/stop equipment remotely.

### Technical Notes
*   **Security:** This MUST check if the user has "Write/Execute" permissions for the target asset.
*   **Feedback:** The UI should show "Command Sent" and then update the state only when the physical device acknowledges the change via MQTT.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Toggle Switch** | A dashboard has a "Pump Power" toggle bound to a boolean property. | The Operator clicks the switch to "ON". | The system sends an MQTT command to the device and shows a "Pending" spinner on the widget. |
| **Command Acknowledged** | A command was sent. | The physical device sends a confirmation MQTT message. | The widget updates to its final "ON" state and the spinner disappears. |
| **Safety Confirmation** | A widget is marked as "High Risk" (e.g., emergency shutoff). | The Operator clicks the button. | The system shows a "Are you sure?" modal before sending the actual command. |
