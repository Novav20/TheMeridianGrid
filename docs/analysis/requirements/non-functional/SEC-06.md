---
id: SEC-06
title: Encryption at Rest
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
---

# SEC-06: Encryption at Rest

Sensitive user data (passwords, API keys) must be hashed (Argon2) or encrypted (AES-256) in the database.

**Justification:** Critical to prevent credential theft if the database is compromised.
