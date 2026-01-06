---
id: IAM-17
title: Password Policies & Rotation
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 3
priority: Low
---

# IAM-17: Password Policies & Rotation

### Description
**As a** [[System Administrator]], **I want to** enforce password complexity rules and expiration policies, **so that** the platform remains resistant to brute-force and credential-stuffing attacks.

### Technical Notes
*   **Complexity:** Minimum length, uppercase, numbers, symbols.
*   **Expiration:** Optional flag for "Force password change on next login."

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Weak Password Rejected** | A user tries to set their password to "123456". | The system validates the input. | The system rejects the password and displays the complexity requirements. |
| **Force Password Reset** | The Admin suspects an account is compromised. | They flag the user for "Force Password Reset". | The next time the user logs in, they are immediately redirected to the "Change Password" screen and blocked from the rest of the app until complete. |
