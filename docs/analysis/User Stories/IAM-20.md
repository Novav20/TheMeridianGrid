---
id: IAM-20
title: 'Coopetitor Guest Access'
epic: "[[02_epics#Epic 2: Identity, Access & Role Lifecycle Management]]"
status: Backlog
actor: "[[System Administrator]]"
points: 5
priority: Low
---

# IAM-20: "Coopetitor" Guest Access

### Description
**As a** [[System Administrator]], **I want to** create time-limited "Guest" accounts with strictly restricted scopes (e.g., specific assets only), **so that** external partners (Coopetitors) or contractors can collaborate on specific tasks without gaining permanent or broad access to the plant's data.

### Technical Notes
*   **Auto-Expiration:** The account should have an `expires_at` date.
*   **Scope Locking:** Guests should be locked into a specific asset group by default.

### Acceptance Criteria

| Scenario | Given | When | Then |
| :--- | :--- | :--- | :--- |
| **Create Guest Account** | A contractor needs to monitor "Pump A" for 24 hours. | The Admin creates a Guest account with an expiry date set for tomorrow. | The account is created and automatically disabled exactly 24 hours later. |
| **Strict Scope Enforcement** | A Guest is assigned to "Pump A". | They try to view "Pump B". | The system denies access, even if "Pump B" is in the same building. |
| **Extend Access** | The contractor's work is delayed. | The Admin updates the `expires_at` date. | The account remains active for the new duration. |
