---
id: CORE-42
title: Data Retention Policy Management
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
moscow: MUST
justification: "Prevents database disk exhaustion; critical for platform stability in continuous use."
functional_requirements:
  - "[[FR-11]]"
---

# CORE-42: Data Retention Policy Management

### Description
**As a** [[System Administrator]], **I want to** define retention policies for telemetry data (e.g., "Keep raw data for 90 days, then aggregate/delete"), **so that** the system remains performant and database costs are controlled without violating historical compliance requirements.

### Technical Notes
*   Requires automated "Cleanup Jobs" (Cron/Worker).
*   Utilize TimescaleDB retention policies (`drop_chunks`) for efficiency.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Configure Retention** | The Admin is in "Data Settings". | They set a retention period of 30 days for "Motor Temperature". | The system should automatically delete telemetry older than 30 days from that specific table every 24 hours. |
| **Archive Before Delete** | A "Compliance" flag is active. | Data reaches the retention limit. | The system should attempt to export a CSV/Cold Storage backup before deleting the raw records. |
