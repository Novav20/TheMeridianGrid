---
id: SEC-07
title: Password Hashing
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
mvp-phase: MVP-1.0
status: Complete
week-completed: 4
frontend-status: N/A
backend-status: Complete
tested: true
blocking: FR-14
blocked-by: 
implementation-notes: "Passwords hashed using Argon2id via PasswordService in the backend."
last-updated: 2026-01-29
---

# SEC-07: Password Hashing

User passwords must be hashed using a modern, collision-resistant algorithm such as **Argon2id** or **BCrypt** with an appropriate work factor.

**Justification:** Protects user credentials in the event of a database breach.
