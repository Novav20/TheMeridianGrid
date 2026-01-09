# Non-Functional Requirements (NFRs) - ISO 25010

This document defines the quality attributes of the Meridian Grid platform, categorized according to the **ISO/IEC 25010** software quality model. Each NFR has a unique global ID within this document.

---

## 1. Performance Efficiency (PERF)
*Focuses on performance relative to the amount of resources used under stated conditions.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **PERF-01** | **Latency:** End-to-end latency from MQTT ingestion to HMI update shall be less than **500ms** for 95% of messages. | **MUST** | Real-time monitoring is the core value proposition; high latency breaks trust in the "Live" data. |
| **PERF-02** | **Throughput:** The system shall support the ingestion of at least **1,000 metrics per second** on a standard 2-core / 4GB RAM server. | **MUST** | Ensures the system can handle a realistic pilot deployment without crashing. |
| **PERF-03** | **Response Time:** API responses for dashboard loading shall complete within **2 seconds**. | **MUST** | Slow dashboards frustrate users; 2s is the threshold for keeping user attention. |
| **PERF-04** | **Database Efficiency:** Historical queries over a 24-hour range shall execute in under **1 second**. | **SHOULD** | Important for UX, but query optimization can be refined in v1.1. |

## 2. Security (SEC)
*Focuses on the protection of information and data.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **SEC-05** | **Encryption in Transit:** All data transmission (HTTP/MQTT) must be encrypted via **TLS 1.2+** (HTTPS/MQTTS). | **MUST** | Mandatory for any modern web application; prevents man-in-the-middle attacks. |
| **SEC-06** | **Encryption at Rest:** Sensitive user data (passwords, API keys) must be hashed (Argon2) or encrypted (AES-256) in the database. | **MUST** | Critical to prevent credential theft if the database is compromised. |
| **SEC-07** | **Sanitization:** All user inputs must be sanitized to prevent SQL Injection and XSS attacks. | **MUST** | Basic OWASP Top 10 compliance is non-negotiable. |
| **SEC-08** | **Audit Immutability:** Audit logs should be stored in a way that prevents modification by standard users. | **SHOULD** | Critical for "Control Assurance" (Epic 4), but strict "Write-Once-Read-Many" storage might be complex for MVP. |

<h2> 3. Reliability (REL)
*Focuses on capability to maintain level of performance under stated conditions.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **REL-09** | **Recoverability:** The system must automatically restart services (Containers) after a crash without human intervention. | **MUST** | Docker restart policies ensure basic resilience for unattended plants. |
| **REL-10** | **Availability:** The system shall aim for **99.0% uptime** during business hours. | **SHOULD** | High availability (HA) clusters are out of scope for MVP; single-node reliability is the target. |
| **REL-11** | **Data Integrity:** In the event of a power loss, no committed data transactions shall be lost (ACID compliance). | **MUST** | Postgres handles this natively; critical for trust in historical records. |

<h2> 4. Usability (USE)
*Focuses on the extent to which a product can be used by specified users to achieve specified goals.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **USE-12** | **Learnability:** A new "Viewer" user should be able to navigate the dashboard without training. | **MUST** | The UI must be intuitive to compete with legacy SCADA complexity. |
| **USE-13** | **Accessibility:** The HMI must support **High Contrast / Dark Mode** (HMI-43). | **SHOULD** | Important for control room environments (BPA requirement), but "Light Mode" is sufficient for functional MVP. |
| **USE-14** | **Error Feedback:** All errors must be presented in plain language (no stack traces to UI). | **MUST** | "Something went wrong" is better than "NullPointerException" for Operators. |

<h2> 5. Maintainability (MAINT)
*Focuses on modularity, reusability, analyzability, modifiability, and testability.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **MAINT-15** | **Containerization:** The entire stack must be deployable via a single `docker-compose up` command. | **MUST** | Essential for the "Student/Enthusiast" use case (easy install). |
| **MAINT-16** | **Code Style:** All code must adhere to strict linting (ESLint/Prettier) and typing (TypeScript Strict Mode). | **MUST** | Prevents technical debt accumulation from Day 1. |
| **MAINT-17** | **Test Coverage:** Critical paths (Login, Ingestion) must have automated tests. | **SHOULD** | 100% coverage is unrealistic for MVP; focusing on critical paths provides best ROI. |

<h2> 6. Portability & Compatibility (PORT)
*Focuses on adaptability and installability.*

| ID | Requirement | MoSCoW | Justification |
| :--- | :--- | :--- | :--- |
| **PORT-18** | **Browser Support:** The HMI must function on the latest versions of Chrome, Firefox, and Edge. | **MUST** | Standard modern web support. |
| **PORT-19** | **Hardware Independence:** The server must run on x86 (Server) and ARM64 (Raspberry Pi). | **MUST** | Enables the "Student/Hobbyist" use case on cheap hardware. |
| **PORT-20** | **Protocol Standard:** Must support MQTT v3.1.1 and v5.0. | **MUST** | MQTT is the universal standard defined in Epic 1. |