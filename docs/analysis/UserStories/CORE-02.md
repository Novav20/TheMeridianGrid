---
id: CORE-02
title: Real-time Telemetry Ingestion
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: In Progress
actor: "[[Device Integrator]]"
points: 3
moscow: MUST
justification: "Core technical requirement; data ingestion is the primary function of the platform."
functional_requirements:
  - "[[FR-03]]"
  - "[[FR-04]]"
  - "[[FR-05]]"
non_functional_requirements:
  - "[[PERF-01]]"
  - "[[PERF-02]]"
---

# CORE-02: Real-time Telemetry Ingestion

### Description
**As a** [[Device Integrator]], **I want to** configure the system to ingest raw MQTT data from a specific topic and map it to an existing Digital Asset's telemetry properties, **so that** the system can automatically process and store real-time data without manual data entry, ensuring the dashboard reflects the current state of physical assets.

### Technical Notes
*   Uses the mapping defined in CORE-001 (e.g., asset ID to MQTT topic, property name to JSON path).
*   Requires integration with an MQTT broker (e.g., Mosquitto).
*   Data will be stored in TimescaleDB.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Successful Telemetry Ingestion** | An asset "Pump_01" exists with properties "Temp" and "Pressure" configured for MQTT ingestion on topic `sensors/pump01`. | An MQTT message `{"Temp": 25.5, "Pressure": 10.2}` arrives on `sensors/pump01`. | The system should parse the message, update the "Temp" and "Pressure" values for "Pump_01" in the time-series database, and acknowledge successful ingestion. |
| **Invalid Data Type Handling** | An asset "Pump_01" exists with numeric property "Temp." | An MQTT message `{"Temp": "twenty-five"}` arrives on `sensors/pump01`. | The system should log a data type mismatch error, not update the "Temp" value for "Pump_01", and acknowledge the message but flag the invalid data. |
| **Unmapped Property Handling** | An asset "Pump_01" exists with only property "Temp" mapped. | An MQTT message `{"Temp": 25.5, "Humidity": 60}` arrives on `sensors/pump01`. | The system should only update the "Temp" value, ignore "Humidity" for "Pump_01", and optionally log a warning about unmapped properties. |
