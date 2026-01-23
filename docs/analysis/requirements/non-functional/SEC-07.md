---
id: SEC-07
title: Sanitization
epic: "[[02_epics#Epic 2: Identity, Access & Role Management]]"
moscow: MUST
status_backend: Done
status_test: Verified
implementation_notes: "Zod validation sanitizes all inputs at the Controller layer."
---

# SEC-07: Sanitization

All user inputs must be sanitized to prevent SQL Injection and XSS attacks.

**Justification:** Basic OWASP Top 10 compliance is non-negotiable.
