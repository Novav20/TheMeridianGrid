---
id: PERF-03
title: Response Time
epic: "[[02_epics#Epic 3: Composable HMI & Visualization Framework]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Partial
week-completed: 
frontend-status: Partial
backend-status: Partial
tested: false
blocking: 
blocked-by: 
implementation-notes: "Frontend: route-level code splitting and React Query caching implemented. Backend: Prisma queries optimized. Benchmarking against 2s target still pending."
last-updated: 2026-02-06
---

# PERF-03: Response Time

API responses for dashboard loading shall complete within **2 seconds**.

**Justification:** Slow dashboards frustrate users; 2s is the threshold for keeping user attention.
