---
id: HMI-26
title: Real-time Telemetry Stream (WebSockets)
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
status: Backlog
actor: "[[Operator]]"
points: 5
moscow: MUST
justification: "Real-time feedback is the primary expectation for any operational dashboard."
functional_requirements:
  - "[[FR-22]]"
---

# HMI-26: Real-time Telemetry Stream (WebSockets)

### Description
**As an** [[Operator]], **I want to** see data updates on my dashboard in real-time without refreshing the page, **so that** I can respond immediately to changing physical conditions or emergencies.

### Technical Notes
*   **Backend:** Use Socket.io or Fastify-Websocket to push MQTT data to the client.
*   **Optimization:** Throttle updates to prevent the browser from crashing with high-frequency sensors.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Live Value Update** | An Operator is viewing a dashboard with a "Temperature" numeric display. | A new MQTT message arrives at the server for that asset. | The number on the dashboard should update within milliseconds (sub-second latency). |
| **Live Chart Pushing** | A line chart is showing the last 10 minutes of data. | New data points arrive. | The chart should "scroll" or add new points to the right-hand side in real-time. |
| **Connection Re-establishment** | The Operator's internet blips. | The WebSocket disconnects and then reconnects. | The dashboard should automatically resume the stream without a full page reload. |
