---
id: SEC-05
title: Encryption in Transit
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Partial
week-completed: 
frontend-status: Partial
backend-status: Partial
tested: false
blocking: 
blocked-by: 
implementation-notes: "Docker network isolation active. TLS termination at entry point (Nginx/Gateway) pending implementation in production environment."
last-updated: 2026-01-29
---

# SEC-05: Encryption in Transit

All data transmission (HTTP/MQTT) must be encrypted via **TLS 1.2+** (HTTPS/MQTTS).

**Justification:** Mandatory for any modern web application; prevents man-in-the-middle attacks.
