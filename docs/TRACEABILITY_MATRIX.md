# MVP 1.0 Traceability Matrix

**Implementation Status Key:**
- 🔴 **Backlog:** Not started.
- 🟡 **In Progress:** Development active.
- 🟢 **Done (Backend):** API/DB implemented & tested. Frontend pending.
- 🔵 **Complete:** Full Stack implementation verified.

**Test Status Key:**
- ❌ **Untested:** No automated or formal manual testing.
- 🧪 **Manual:** Verified via manual smoke tests (e.g., Insomnia/Postman).
- 🤖 **Automated:** Covered by CI/CD unit/integration tests.
- ✅ **Verified:** Acceptance Criteria fully validated.

---

## 1. Core & Connectivity (Week 2 & 3)

| User Story | Functional Req | Description | Implementation Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[[CORE-01]]** | **[[FR-01]]** | Store AAS/DTDL Models | 🟢 **Done (Backend)** | 🧪 **Manual** | Verified via Insomnia creation. |
| | **[[FR-02]]** | Unique Asset Names | 🟢 **Done (Backend)** | 🧪 **Manual** | Enforced via Prisma `@unique`. |
| **[[CORE-02]]** | **[[FR-03]]** | Ingest MQTT Messages | 🔴 **Backlog** | ❌ **Untested** | Scheduled for Week 7 (HTTP part is done, MQTT still pending). |
| | **[[FR-04]]** | Map JSONPath to Props | 🔴 **Backlog** | ❌ **Untested** | Scheduled for Week 7. |
| | **[[FR-05]]** | Store Telemetry (Timescale) | 🟢 **Done (Backend)** | 🧪 **Manual** | Basic storage implemented. |
| **[[CORE-04]]** | **[[FR-06]]** | Store Asset Metadata | 🟡 **In Progress** | 🧪 **Manual** | Creation works; Search filters pending (Refinement task). |
| **[[CORE-05]]** | **[[FR-07]]** | Define Rules | 🟢 **Done (Backend)** | 🧪 **Manual** | CRUD for atomic rules implemented. |
| | **[[FR-08]]** | Evaluate Asset Status | 🟢 **Done (Backend)** | 🧪 **Manual** | Basic rule evaluation for alerts implemented. |
| **[[CORE-09]]** | **[[FR-10]]** | Lifecycle State | 🟡 **In Progress** | 🧪 **Manual** | Enum exists; validation logic pending (Refinement task). |
| **[[CORE-42]]** | **[[FR-11]]** | Data Retention Policies | 🔴 **Backlog** | ❌ **Untested** | TimescaleDB feature (Week 3). |

---

## 2. Identity & Access (Week 4)

| User Story | Functional Req | Description | Implementation Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[[IAM-11]]** | **[[FR-12]]** | User CRUD | 🔴 **Backlog** | ❌ **Untested** | Week 4. |
| **[[IAM-12]]** | **[[FR-13]]** | Assign Roles | 🔴 **Backlog** | ❌ **Untested** | Week 4. |
| **[[IAM-13]]** | **[[FR-09]]** | Asset-level Permissions | 🔴 **Backlog** | ❌ **Untested** | Week 4 (Granular RBAC). |
| **[[IAM-14]]** | **[[FR-14]]** | Secure Login | 🔴 **Backlog** | ❌ **Untested** | Week 4. |
| | **[[FR-15]]** | Logout | 🔴 **Backlog** | ❌ **Untested** | Week 4. |
| **[[IAM-18]]** | **[[FR-16]]** | Audit Logging | 🔴 **Backlog** | ❌ **Untested** | `AuditLog` model exists. |
| **[[IAM-21]]** | **[[FR-17]]** | Developer Mode | 🔴 **Backlog** | ❌ **Untested** | |

---

## 3. Visualization (Week 5 & 6)

| User Story | Functional Req | Description | Implementation Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[[HMI-22]]** | **[[FR-18]]** | Dashboard CRUD | 🔴 **Backlog** | ❌ **Untested** | `Dashboard` model exists. |
| **[[HMI-23]]** | **[[FR-19]]** | Drag-and-Drop Grid | 🔴 **Backlog** | ❌ **Untested** | Frontend Week. |
| **[[HMI-24]]** | **[[FR-20]]** | Widget Library | 🔴 **Backlog** | ❌ **Untested** | Frontend Week. |
| **[[HMI-25]]** | **[[FR-21]]** | Data Binding | 🔴 **Backlog** | ❌ **Untested** | Frontend Week. |
| **[[HMI-26]]** | **[[FR-22]]** | Real-time WebSockets | 🔴 **Backlog** | ❌ **Untested** | Week 7. |
| **[[HMI-27]]** | **[[FR-23]]** | Historical Data Charts | 🔴 **Backlog** | ❌ **Untested** | Week 6. |

---

## 4. Automation (Week 9+)

| User Story | Functional Req | Description | Implementation Status | Test Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[[AUTO-32]]** | **[[FR-24]]** | Continuous Rule Eval | 🟢 **Done (Backend)** | 🧪 **Manual** | Implemented via `EvaluationService`. |
| **[[AUTO-33]]** | **[[FR-25]]** | Create Alerts | 🟢 **Done (Backend)** | 🧪 **Manual** | Alerts generated on rule breach. |
| | **[[FR-26]]** | Deduplicate Alerts | 🟢 **Done (Backend)** | 🧪 **Manual** | Implemented in `EvaluationService`. |
| **[[AUTO-35]]** | **[[FR-27]]** | Acknowledge Alerts | 🔴 **Backlog** | ❌ **Untested** | |
| **[[AUTO-37]]** | **[[FR-28]]** | Safety Interlocks | 🔴 **Backlog** | ❌ **Untested** | Phase 2. |
| | **[[FR-29]]** | Interlock Notifications | 🔴 **Backlog** | ❌ **Untested** | Phase 2. |
