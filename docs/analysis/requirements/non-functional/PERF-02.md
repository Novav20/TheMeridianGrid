---
id: PERF-02
title: Throughput
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Partial
week-completed: 
frontend-status: N/A
backend-status: Partial
tested: false
blocking: 
blocked-by: 
implementation-notes: "Backend uses non-blocking Node.js and TimescaleDB hypertables designed for high throughput. Pilot-scale load testing is pending."
last-updated: 2026-01-29
---

# PERF-02: Throughput

The system shall support the ingestion of at least **1,000 metrics per second** on a standard 2-core / 4GB RAM server.

**Justification:** Ensures the system can handle a realistic pilot deployment without crashing.
