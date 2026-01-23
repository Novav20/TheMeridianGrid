---
id: CORE-08
title: Asset Configuration Versioning
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[Device Integrator]]"
points: 8
moscow: COULD
justification: "High technical complexity; while valuable for audit, basic telemetry is the MVP priority."
functional_requirements: []
---

# CORE-08: Asset Configuration Versioning

### Description
**As a** [[Device Integrator]], **I want to** track changes to an asset's semantic model and properties over time, **so that** I can revert to previous configurations if needed and ensure that historical data can be correctly interpreted even if the sensor mapping has changed.

### Technical Notes
*   This involves "Audit Logging" of configuration changes.
*   More importantly, it requires "Temporal Versioning" (knowing that from Jan 1 to Feb 1, Topic X mapped to Sensor Y). This is complex but very valuable.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Log Configuration Change** | The Integrator changes an MQTT topic for an asset property. | They save the change. | The system should record who made the change, when, and what the old and new values were. |
| **View Change History** | An asset has been modified multiple times. | The Integrator views the "History" tab for that asset. | They should see a chronological list of all configuration changes. |
| **Historical Data Consistency** | A sensor was replaced on a specific date, changing its calibration. | A Data Analyst queries data from before and after the change. | The system should provide the metadata/calibration valid at that specific point in time (Advanced/Stretch goal). |
