---
id: PERF-01
title: Latency
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
moscow: MUST
status_backend: Untested
status_test: Untested
---

# PERF-01: Latency

End-to-end latency from MQTT ingestion to HMI update shall be less than **500ms** for 95% of messages.

**Justification:** Real-time monitoring is the core value proposition; high latency breaks trust in the "Live" data.
