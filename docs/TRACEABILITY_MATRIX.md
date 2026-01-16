# MVP 1.0 Traceability Matrix

**Status Key:**
- 🔴 **Backlog:** Not started.
- 🟡 **In Progress:** Development active.
- 🟢 **Done:** Implementation logic complete and verified.
- 🔵 **Complete:** Full Stack implementation verified.

**Test Status Key:**
- ❌ **Untested:** No automated or formal manual testing.
- 🧪 **Manual:** Verified via manual smoke tests (e.g., Insomnia/Bruno/Simulator).
- 🤖 **Automated:** Covered by CI/CD unit/integration tests.
- ✅ **Verified:** Acceptance Criteria fully validated.

---

## 1. Core & Connectivity (Week 2 & 3)

| User Story | Functional Req | Description | Backend Status | Frontend Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[[CORE-01]]** | **[[FR-01]]** | Store AAS/DTDL Models | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | JSONB storage in Asset model. |
| | **[[FR-02]]** | Unique Asset Names | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Enforced via Prisma `@unique`. |
| **[[CORE-02]]** | **[[FR-03]]** | Ingest MQTT Messages | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | Scheduled for Week 7. |
| | **[[FR-04]]** | Map JSONPath to Props | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | Scheduled for Week 7. |
| | **[[FR-05]]** | Store Telemetry (Timescale) | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Ingestion via HTTP API implemented. |
| **[[CORE-04]]** | **[[FR-06]]** | Store Asset Metadata | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Metadata creation and search API done. |
| **[[CORE-05]]** | **[[FR-07]]** | Define Rules | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Rule CRUD implemented. |
| | **[[FR-08]]** | Evaluate Asset Status | 🟡 **In Progress** | 🔴 **Backlog** | 🧪 **Manual** | Alerts done; overall status logic pending. |
| **[[CORE-09]]** | **[[FR-10]]** | Lifecycle State | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | State change and ingestion blocking done. |
| **[[CORE-42]]** | **[[FR-11]]** | Data Retention Policies | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | TimescaleDB feature. |

---

## 2. Identity & Access (Week 4)

| User Story | Functional Req | Description | Backend Status | Frontend Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[[IAM-11]]** | **[[FR-12]]** | User CRUD | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[IAM-12]]** | **[[FR-13]]** | Assign Roles | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[IAM-13]]** | **[[FR-09]]** | Asset-level Permissions | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[IAM-14]]** | **[[FR-14]]** | Secure Login | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| | **[[FR-15]]** | Logout | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[IAM-18]]** | **[[FR-16]]** | Audit Logging | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[IAM-21]]** | **[[FR-17]]** | Developer Mode | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |

---

## 3. Visualization (Week 5 & 6)

| User Story | Functional Req | Description | Backend Status | Frontend Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[[HMI-22]]** | **[[FR-18]]** | Dashboard CRUD | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[HMI-23]]** | **[[FR-19]]** | Drag-and-Drop Grid | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[HMI-24]]** | **[[FR-20]]** | Widget Library | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[HMI-25]]** | **[[FR-21]]** | Data Binding | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[HMI-26]]** | **[[FR-22]]** | Real-time WebSockets | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[HMI-27]]** | **[[FR-23]]** | Historical Data Charts | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |

---

## 4. Automation (Week 9+)

| User Story | Functional Req | Description | Backend Status | Frontend Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[[AUTO-32]]** | **[[FR-24]]** | Continuous Rule Eval | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Ingest flow calls EvaluationService. |
| **[[AUTO-33]]** | **[[FR-25]]** | Create Alert Instance | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Alerts saved to DB. |
| | **[[FR-26]]** | Deduplicate Alerts | 🟢 **Done** | 🔴 **Backlog** | 🧪 **Manual** | Check for active NEW alerts implemented. |
| **[[AUTO-35]]** | **[[FR-27]]** | Acknowledge Alerts | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| **[[AUTO-37]]** | **[[FR-28]]** | Safety Interlocks | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |
| | **[[FR-29]]** | Interlock Notifications | 🔴 **Backlog** | 🔴 **Backlog** | ❌ **Untested** | |