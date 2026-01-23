---
id: CORE-10
title: Telemetry Connection Tester
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 3
moscow: SHOULD
justification: "Greatly improves the developer/integrator experience, though technically the data flows without it."
functional_requirements: []
---

# CORE-10: Telemetry Connection Tester

### Description
**As a** [[Device Integrator]], **I want to** view a "Live Preview" of incoming MQTT messages for a specific topic while configuring an asset, **so that** I can verify the topic path and JSON structure are correct before finalizing the asset definition.

### Technical Notes
*   Requires a temporary MQTT subscription on the backend that forwards messages to the frontend (via WebSocket) without saving to the database.
*   Should display the raw JSON payload.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Verify Valid Topic** | The Integrator enters a topic `sensors/pump01` and clicks "Test". | Messages are being published to that topic. | The system displays the streaming raw messages in a console window within the UI. |
| **Verify Invalid Topic** | The Integrator enters a topic `wrong/topic` and clicks "Test". | No messages are published to that topic. | The system shows a "Waiting for data..." spinner or message, indicating no connection/data. |
| **Validate JSON Path** | The Integrator specifies a JSON path `$.data.temp`. | Incoming data is `{ "data": { "temp": 24 } }`. | The system highlights or extracts the value `24` to confirm the path is correct. |
