# Epics for The Meridian Grid (TMG)

Based on the **Meridian Grid (TMG) Business Process Analysis**, here are the four core Epics that capture the architectural and business value of the platform.

### Epic 1: Semantic Data Core & Universal Connectivity
**Description:** Establish a centralized, high-throughput data ingestion layer that abstracts hardware heterogeneity (PLCs, Sensors, Robots) into a unified "Semantic Asset" model using **AAS (Asset Administration Shell)** and **DTDL (Digital Twin Definition Language)** standards.
**Business Value:** Eliminates data silos by transforming raw, meaningless register data into standardized, readable digital assets, enabling scalable "Postgres for Everything" storage and rapid integration of diverse fleets.
**BPA Reference:** Sections 3.2, 5.2 (Ingestion), 5.3 (Data Governance), 7 (Data Core).

### Epic 2: Identity, Access & Role Lifecycle Management
**Description:** Implement a rigorous **Fine-Grained RBAC (Role-Based Access Control)** system that strictly bifurcates the platform into distinct **"Integrator" (Builder)** and **"Operator" (User)** lifecycles, secured by metric-level permissions and **IEC 62443** compliance.
**Business Value:** Solves the critical "Legacy SCADA" security gap by ensuring that the people *operating* machines cannot accidentally *reconfigure* them, while providing a secure environment for external partners ("Coopetitors") to collaborate.
**BPA Reference:** Sections 3.1, 5.1 (Stakeholders), 5.5 (Risk & Security), 5.6 (REQ-AUTH-01).

### Epic 3: Composable HMI & Visualization Framework
**Description:** Develop a flexible, **React-based User Experience (UX)** engine featuring adaptive "Card-Based Grid Layouts" that allows users to compose "Personalized Dashboards" via low-code widgets (Charts, 3D Twins, Maps) without requiring underlying code changes.
**Business Value:** Delivers the project's core hypothesis of **Flexibility**, allowing non-technical operators to create relevant monitoring views on demand, moving beyond the static, rigid screens of traditional HMI software.
**BPA Reference:** Sections 4 (Gap Analysis), 5.4 (Interface Design), 7 (Visualization).

### Epic 4: Intelligent Automation & Control Assurance
**Description:** Construct a "Safe Actuation" framework driven by **MAPE-K (Monitor-Analyze-Plan-Execute)** feedback loops and **Software Agents**, enforcing mandatory **"Human-in-the-loop" safety interlocks** and immutable audit logging for all remote commands.
**Business Value:** Enables the transition from passive monitoring to active, safe remote control of Cyber-Physical Systems, ensuring that automation (Swarm Intelligence) never compromises physical safety or operational integrity.
**BPA Reference:** Sections 5.2 (Process Arch), 5.5 (Safety Interlocks), 5.6 (REQ-SAFE-01 & REQ-AUDIT-01).
