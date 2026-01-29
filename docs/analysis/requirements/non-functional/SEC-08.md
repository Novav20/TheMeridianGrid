---
id: SEC-08
title: Audit Immutability
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: SHOULD
mvp-phase: Phase-2
status: Not Started
week-completed: 
frontend-status: Not Started
backend-status: Not Started
tested: false
blocking: 
blocked-by: FR-16
implementation-notes: "Deferred to Phase 2. Currently, audit logs are stored in a standard PostgreSQL table."
last-updated: 2026-01-29
---

# SEC-08: Audit Immutability

Audit logs should be stored in a way that prevents modification by standard users.

**Justification:** Critical for "Control Assurance" (Epic 4), but strict "Write-Once-Read-Many" storage might be complex for MVP.
