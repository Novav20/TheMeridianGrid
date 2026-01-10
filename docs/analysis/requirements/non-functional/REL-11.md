---
id: REL-11
title: Data Integrity
epic: "[[02_epics#Epic 1: Semantic Data Core & Universal Connectivity]]"
moscow: MUST
---

# REL-11: Data Integrity

In the event of a power loss, no committed data transactions shall be lost (ACID compliance).

**Justification:** Postgres handles this natively; critical for trust in historical records.
