---
id: SEC-08
title: Audit Immutability
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: SHOULD
status_backend: Backlog
status_test: Untested
---

# SEC-08: Audit Immutability

Audit logs should be stored in a way that prevents modification by standard users.

**Justification:** Critical for "Control Assurance" (Epic 4), but strict "Write-Once-Read-Many" storage might be complex for MVP.
