---
id: IAM-15
title: Multi-Factor Authentication (MFA)
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[User]]"
points: 5
priority: Medium
---

# IAM-15: Multi-Factor Authentication (MFA)

### Description
**As a** [[User]], **I want to** enable Multi-Factor Authentication (MFA) on my account, **so that** my access remains secure even if my password is compromised.

### Technical Notes
*   **Method:** TOTP (Time-based One-Time Password) using apps like Google Authenticator or Authy.
*   Requires a "Secret Key" generated and stored (encrypted) in the database.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Enable MFA** | A user is logged in and on their "Security" page. | They scan a QR code with their MFA app and enter the verification code. | The system enables MFA for the account and provides "Recovery Codes". |
| **Login with MFA** | A user has MFA enabled. | They provide a valid email/password. | The system prompts for the 6-digit MFA code before granting final access. |
| **Invalid MFA Code** | A user is at the MFA prompt. | They enter an incorrect or expired code. | Access is denied. |
