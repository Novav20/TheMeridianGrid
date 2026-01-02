# Business Process Analysis (BPA) Report
**Project:** The Meridian Grid (TMG)
**Date:** January 2, 2026
**Status:** Research Synthesis & Architectural Definition

## 1. Executive Summary
This report analyzes the business and technical requirements for "The Meridian Grid" (TMG), an Industrial IoT (IIoT) platform designed to modernize industrial operations. The analysis, synthesized from 49 academic and industrial sources, identifies critical inefficiencies in legacy SCADA systems—specifically their rigidity, lack of role separation, and security vulnerabilities. TMG proposes a "Future State" architecture that bifurcates the "Integrator" (Builder) and "Operator" (User) roles, standardizes data using OPC UA and Asset Administration Shell (AAS) principles, and enforces strict "Secure by Design" safety interlocks for remote actuation.

## 2. Introduction & Project Background
### 2.1. Context
Traditional Industrial Automation and Control Systems (IACS) are transitioning towards the Industrial Internet of Things (IIoT) to leverage cloud computing, big data, and remote flexibility. However, this transition is hindered by legacy architectures that tightly couple hardware configuration with operational views, creating systems that are difficult to scale and insecure to access remotely.

### 2.2. Objectives
The primary objectives of the TMG platform are:
*   **Decouple Lifecycle Roles:** Establish a clear separation of duties between system configuration and daily operation.
*   **Standardize Heterogeneity:** Unify diverse hardware data models (PLCs, Sensors, Robots) into a common semantic layer.
*   **Ensure Operational Safety:** Implement rigorous safeguards to prevent unauthorized or unsafe remote control commands.

## 3. Current State Analysis (As-Is)
The research identifies a prevalent "Legacy SCADA" model characterized by the following limitations:

### 3.1. Tightly Coupled Roles
In current systems, the person operating the machine often requires deep technical access to configure it, or conversely, the system is so rigid that "System Integrators" must be hired for every minor change (Petrik, 2023). There is often no distinction between a user who needs to *see* a button and a user who defines *what the button does* (Figueroa-Lorenzo et al., 2019).

### 3.2. Fragmented Data Silos
Data is trapped in proprietary protocols (Modbus, Profibus) with no semantic meaning. "Metadata" (machine type, location) is often stored separately from "Telemetry" (time-series), leading to complex and brittle integration efforts (Tavares, 2024; Hunzinger, 2017).

### 3.3. Security & Safety Gaps
Legacy protocols like Modbus and DNP3 lack built-in security (encryption/authentication) (Mondal et al., 2025). Remote access is often "all-or-nothing," lacking fine-grained Role-Based Access Control (RBAC) or safety interlocks, relying entirely on the "Human-in-the-loop" to prevent accidents without system-level safeguards (Enescu & Bizon, 2017; Ward et al., 2023).

## 4. Gap Analysis
The following gaps must be bridged to achieve the desired Future State:

| Feature | Current State (Legacy SCADA) | Desired Future State (TMG) | Gap |
| :--- | :--- | :--- | :--- |
| **User Roles** | Single "User" or "Admin" level; blended responsibilities. | Distinct "Integrator" (Builder) vs. "Operator" (Monitor). | Lack of granular RBAC and specialized views. |
| **Data Model** | Raw register addresses (e.g., `40001`). No context. | Semantic Assets (e.g., `Pump01.Temperature`). | Need for an abstraction layer (OPC UA/AAS). |
| **Actuation** | Direct write to registers. No audit or check. | "Safe Actuation" with 2FA/Interlocks & Audit Logs. | Lack of verification & non-repudiation. |
| **Connectivity** | Polling-based; unaware of state changes. | Event-driven (Pub/Sub) with Heartbeats. | Reliability monitoring & stale data detection. |

## 5. Future State Design (To-Be)
The TMG platform addresses these gaps through the following architectural definitions.

### 5.1. Stakeholder Analysis (Actors & Roles)
The research validates a multi-tier stakeholder model:
*   **Device Integrator (Builder):** Responsible for onboarding devices, defining data models, and designing dashboards. Analogous to the "System Designer" or "Resource Provider" (Zhao et al., 2008).
*   **Operator (User):** Responsible for real-time monitoring and command execution. Their view is restricted to pre-configured dashboards (Atlagic et al., 2012).
*   **Complementors:** Third-party developers creating vertical apps/services (e.g., predictive maintenance) via APIs (Petrik, 2023).
*   **Maintenance Engineers:** Require deep diagnostic views distinct from operational dashboards (Flores-García et al., 2023).
*   **Security Officer:** Manages policies, certificates, and RBAC, separate from IT Admins (DiLuoffo et al., 2018).

### 5.2. Process Architecture (System Boundaries & I/O)
*   **Inputs:** High-frequency Telemetry (Sensors), External Data (APIs), and User Commands.
*   **Outputs:** Visualization (Dashboards), Notifications (Alerts), and Control Signals (Actuators).
*   **Critical Flows:**
    *   **Heartbeats:** Mandatory "Link status probing" to detect offline assets < 5 seconds (Pliatsios et al., 2020).
    *   **Audit Logs:** Immutable logging of all state changes for non-repudiation (IEC, 2018).

### 5.3. Data Governance & Standards
*   **Modeling Standard:** Adoption of **OPC UA** and **Asset Administration Shell (AAS)** concepts to define the "Digital Identity" of assets, ensuring interoperability (Anbalagan et al., 2025; da Silva et al., 2024).
*   **Storage Strategy:** Implementation of a "Postgres for Everything" architecture (JSONB for AAS Metadata + TimescaleDB for Telemetry) to unify relational and time-series data (Tavares, 2024).

### 5.4. Interface Design
*   **Dashboarding:** Implementation of a **React Grid Layout** system supporting a "Widget Pattern" (reusable graphical objects/Genies) to allow Integrators to build "Personalized Dashboards" via drag-and-drop (Guggenberger et al., 2021; Enescu & Bizon, 2017).
*   **Visualization:** Support for 3D Digital Twin viewers (e.g., Unity/CesiumJS integration) alongside 2D charts (Ward et al., 2023).

### 5.5. Risk & Security Management
*   **Compliance:** Alignment with **IEC 62443-4-1** (Secure Product Development) and **NIST SP 800-82**.
*   **Safety Interlocks:** Mandatory "Human-in-the-loop" verification for critical commands (e.g., "Press and Hold," 2FA) combined with system-side logic to reject unsafe states (McGinnis, 2019; Enescu & Bizon, 2017).

### 5.6. Functional Requirements
1.  **REQ-AUTH-01:** Strict separation of Integrator/Operator roles via RBAC.
2.  **REQ-DATA-01:** Asset modeling engine (Physical Device $\to$ Logical Role mapping).
3.  **REQ-SAFE-01:** Safety Interlock UI for all command actuations.
4.  **REQ-AUDIT-01:** Tamper-proof Audit Log for all user actions.
5.  **REQ-CONN-01:** Native Heartbeat monitoring with "Stale Data" indicators.

## 6. Impact & Benefits
*   **Operational Efficiency:** Decoupling roles allows specialized workflows; Integrators can build without disrupting Operators.
*   **Enhanced Safety:** "Secure by Design" actuation prevents accidental or malicious damage to physical assets.
*   **Scalability:** The standardized AAS data model allows new devices to be added without rewriting the entire backend.

## 7. Implementation Plan (High-Level)
1.  **Phase 1: Foundation:** Scaffold TMG Client/Server, implement "Postgres for Everything" schema, and establish basic Auth (RBAC).
2.  **Phase 2: Data Core:** Build the Asset Modeling Engine (AAS) and high-frequency Telemetry ingestion (TimescaleDB).
3.  **Phase 3: Visualization:** Develop the React Grid Layout dashboard and "Widget" library.
4.  **Phase 4: Safety & Polish:** Implement Safety Interlocks, Audit Logging, and 3D visualization components.

## 8. References
*Detailed evidence for these findings can be found in the [[research_log|Research Log]].*

*   [[research_log#^ref10|Abbas & Shaheen (2014)]]. Future SCADA challenges and the promising solution: the agent-based SCADA. *International Journal of Critical Infrastructures*.
*   [[research_log#^ref26|Agerskans et al. (2025)]]. A data flow framework to support the selection and integration of digital technologies for smart production. *International Journal of Production Research*.
*   [[research_log#^ref38|Anbalagan et al. (2025)]]. Lightweight CNC digital process twin framework: IIoT integration with open62541 OPC UA protocol. *Production & Manufacturing Research*.
*   [[research_log#^ref15|Atlagic et al. (2012)]]. Model-based approach to the development of SCADA applications. *IEEE ECBS*.
*   [[research_log#^ref29|Crespi et al. (2023)]]. *The Digital Twin*. Springer Nature.
*   [[research_log#^ref5|Dai et al. (2020)]]. Big data analytics for manufacturing internet of things. *Enterprise Information Systems*.
*   [[research_log#^ref7|da Silva & Marques Cardoso (2024)]]. Designing the future of coopetition: An IIoT approach for empowering SME networks. *Int J Adv Manuf Technol*.
*   [[research_log#^ref33|Dintén et al. (2023)]]. Fleet management systems in Logistics 4.0 era. *Procedia Computer Science*.
*   [[research_log#^ref46|DiLuoffo et al. (2018)]]. Robot Operating System 2: The need for a holistic security approach. *International Journal of Advanced Robotic Systems*.
*   [[research_log#^ref18|Enescu & Bizon (2017)]]. SCADA Applications for Electric Power System. *Springer*.
*   [[research_log#^ref31|Fang et al. (2025)]]. Enhancing SCADA systems in oil and gas pipelines. *Australian Journal of Electrical and Electronics Engineering*.
*   [[research_log#^ref1|Figueroa-Lorenzo et al. (2019)]]. A Role-Based Access Control Model in Modbus SCADA Systems. *Sensors*.
*   [[research_log#^ref30|Flores-García et al. (2023)]]. Enabling industrial internet of things-based digital servitization. *International Journal of Production Research*.
*   [[research_log#^ref11|Guggenberger et al. (2021)]]. How to Design IIoT-Platforms Your Partners are Eager to Join. *Springer*.
*   [[research_log#^ref47|Hunzinger (2017)]]. SCADA fundamentals and applications in the IoT. *Wiley*.
*   [[research_log#^ref13|IEC (2018)]]. *IEC 62443-4-1: Secure product development lifecycle requirements*.
*   [[research_log#^ref45|Kim et al. (2025)]]. Reconfigurable machine tending with collaborative robots. *International Journal of Computer Integrated Manufacturing*.
*   [[research_log#^ref17|Liu et al. (2024)]]. RTGDC: a real-time ingestion and processing approach in geospatial data cube. *International Journal of Digital Earth*.
*   [[research_log#^ref48|Lydia et al. (2023)]]. Securing the cyber-physical system: a review. *Cyber-Physical Systems*.
*   [[research_log#^ref9|McGinnis (2019)]]. *Formalizing ISA-95 Level 3 Control with Smart Manufacturing System Models*. NIST GCR 19-022.
*   [[research_log#^ref23|Mitchell et al. (2025)]]. A cyber physical architecture for symbiotic multi-robot fleet management. *Springer*.
*   [[research_log#^ref44|Mondal et al. (2025)]]. Real-time analysis of cyber attacks in SCADA based power system. *Australian Journal of Electrical and Electronics Engineering*.
*   [[research_log#^ref25|Motta et al. (2025)]]. A cloud architecture for home energy management systems. *Energy Informatics*.
*   [[research_log#^ref36|Nechibvute & Mafukidze (2024)]]. Integration of SCADA and Industrial IoT. *IETE Technical Review*.
*   [[research_log#^ref14|Orłowski & Adrych (2024)]]. Model of IoT design decision-making processes in Flow Based Programming systems. *Journal of Information and Telecommunication*.
*   [[research_log#^ref8|Petrik (2023)]]. Exploring the Determinants of Partner Management in IIoT Platform Ecosystems. *European Journal of Management Issues*.
*   [[research_log#^ref2|Pliatsios et al. (2020)]]. A Survey on SCADA Systems: Secure Protocols, Incidents, Threats and Tactics. *IEEE Communications Surveys & Tutorials*.
*   [[research_log#^ref37|Potdar & Parikh (2025)]]. Internet of things (IoT) and artificial intelligence (AI) enabled framework for smart fleet management. *OPSEARCH*.
*   [[research_log#^ref39|Schwörer et al. (2025)]]. Modular and reconfigurable factories for continuous production innovation. *International Journal of Production Research*.
*   [[research_log#^ref22|Tavares (2024)]]. Understanding IoT (Internet of Things). *TigerData*.
*   [[research_log#^ref21|Ward et al. (2023)]]. The challenges of using live-streamed data in a predictive digital twin. *Journal of Building Performance Simulation*.
*   [[research_log#^ref35|Xiao et al. (2025)]]. Industrial Metaverse design methodologies. *International Journal of Computer Integrated Manufacturing*.
*   [[research_log#^ref43|Zhang & Kelly (2023)]]. Overview and recommendations for cyber risk assessment in nuclear power plants. *Nuclear Technology*.
*   [[research_log#^ref3|Zhao et al. (2008)]]. A Flexible Role- and Resource-Based Access Control Model. *ISECS*.
*   [[research_log#^ref42|Zvarivadza et al. (2024)]]. On the impact of Industrial Internet of Things (IIoT) - mining sector perspectives. *International Journal of Mining, Reclamation and Environment*.
