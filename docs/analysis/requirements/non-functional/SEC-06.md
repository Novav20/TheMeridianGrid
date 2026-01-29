---
id: SEC-06
title: Secure Token Storage
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Complete
week-completed: 5
frontend-status: Complete
backend-status: Complete
tested: true
blocking: 
blocked-by: FR-14
implementation-notes: "Implemented via HttpOnly, Secure, SameSite=Strict cookies for JWT storage. Prevents XSS-based token theft."
last-updated: 2026-01-29
---

# SEC-06: Secure Token Storage

Authentication tokens (JWT) shall be stored in **HttpOnly, Secure, SameSite=Strict** cookies.

**Justification:** Protects user sessions from Cross-Site Scripting (XSS) and simplifies frontend session management.
