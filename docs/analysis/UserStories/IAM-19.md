---
id: IAM-19
title: Account Lockout/Suspension
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 2
moscow: SHOULD
justification: "Important defensive security, but basic firewall/auth provides enough protection for MVP."
functional_requirements: []
---

# IAM-19: Account Lockout/Suspension

### Description
**As a** [[System Administrator]], **I want to** automatically lock user accounts after multiple failed login attempts and manually suspend accounts when necessary, **so that** the system is protected from brute-force attacks and unauthorized access by former employees.

### Technical Notes
*   **Threshold:** Default 5 failed attempts in 15 minutes.
*   **Reset:** Admin intervention or 1-hour cooling-off period.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Brute Force Prevention** | A bot tries to guess a password 10 times. | The threshold (5) is exceeded. | The account is locked, and any further login attempts (even with the correct password) are denied for the lockout period. |
| **Admin Manual Suspension** | An employee is terminated. | The Admin toggles the "Suspended" status. | The user is immediately logged out (session invalidated) and cannot log back in. |
