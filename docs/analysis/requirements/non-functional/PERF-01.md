---
id: PERF-01
title: Latency
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Partial
week-completed: 
frontend-status: Partial
backend-status: Partial
tested: false
blocking: 
blocked-by: 
implementation-notes: "Telemetry ingestion pipeline active. Use of TimescaleDB and optimized Prisma queries support low latency, but end-to-end benchmarking is pending."
last-updated: 2026-01-29
---

# PERF-01: Latency

End-to-end latency from MQTT ingestion to HMI update shall be less than **500ms** for 95% of messages.

**Justification:** Real-time monitoring is the core value proposition; high latency breaks trust in the "Live" data.
