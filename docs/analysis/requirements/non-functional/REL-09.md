---
id: REL-09
title: Recoverability
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
moscow: MUST
status_backend: Done
status_test: Verified
implementation_notes: "Docker Compose 'restart: always' policy enabled."
---

# REL-09: Recoverability

The system must automatically restart services (Containers) after a crash without human intervention.

**Justification:** Docker restart policies ensure basic resilience for unattended plants.
