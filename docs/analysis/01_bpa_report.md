# Business Process Analysis (BPA) Report
**Project:** The Meridian Grid (TMG)
**Date:** January 2, 2026
**Status:** Comprehensive Research Synthesis & Architectural Definition

## 1. Executive Summary
This report analyzes the business and technical requirements for "The Meridian Grid" (TMG), an Industrial IoT (IIoT) platform designed to modernize industrial operations. The analysis, synthesized from an exhaustive corpus of 56 sources, identifies critical inefficiencies in legacy SCADA systems—specifically their rigidity, lack of role separation, and security vulnerabilities. TMG proposes a "Future State" architecture that bifurcates the "Integrator" (Builder) and "Operator" (User) roles, standardizes data using a hybrid of OPC UA, AAS, and DTDL principles, and enforces a modern DevSecOps culture. The system is designed as a Cyber-Physical System (CPS) capable of managing heterogeneous fleets through autonomous agents, MAPE-K feedback loops, and fine-grained access control at the metric level.

## 2. Introduction & Project Background
### 2.1. Context
Traditional Industrial Automation and Control Systems (IACS) are transitioning towards the Industrial Internet of Things (IIoT) to leverage cloud computing, big data, and swarm intelligence. However, this transition is hindered by legacy architectures that tightly couple hardware configuration with operational views—a challenge thoroughly reviewed in the context of Cloud Manufacturing (**Gharibvand et al., 2024**) and general SCADA integration (**Nechibvute & Mafukidze, 2024**).

Modern paradigms like the "Internet of Production" seek to overcome this historical OT-IT separation by enabling external systems to access shop-floor data for advanced analytics and condition monitoring (**Brecher et al., 2024**). This paradigm shift aims to transform physical objects into "programmable entities" via digital threads (**Crespi et al., 2023**). The universality of this requirement is evidenced by parallel modernization struggles in the mining sector (**Zvarivadza et al., 2024**), smart logistics (**Flores-García et al., 2023**), and container dispatch systems (**Alfaouri & Saleet, 2025**).

### 2.2. Objectives
The primary objectives of the TMG platform are:
*   **Decouple Lifecycle Roles:** Establish a clear separation of duties between system configuration and daily operation.
*   **Standardize Heterogeneity:** Unify diverse hardware data models (PLCs, Sensors, Robots) into a common semantic layer.
*   **Ensure Operational Safety:** Implement rigorous safeguards to prevent unauthorized or unsafe remote control commands.

## 3. Current State Analysis (As-Is)
The research identifies a prevalent "Legacy SCADA" model characterized by the following limitations:

### 3.1. Tightly Coupled Roles
In current systems, the person operating the machine often requires deep technical access to configure it (**Petrik, 2023**). There is often no distinction between a user who needs to *see* a button and a user who defines *what the button does* (**Figueroa-Lorenzo et al., 2019**). This is further clarified by the distinction between a **Digital OEM**, who creates products, and a **Digital Equipment Operator**, who implements solutions (**Slama et al., 2023**).

### 3.2. Fragmented Data Silos
Data is trapped in proprietary protocols with no semantic meaning. "Metadata" (machine type, location) is often stored separately from "Telemetry," leading to complex and brittle integration (**Tavares, 2024**; **Hunzinger, 2017**). The lack of a centralized repository leads to fragmented computing resources and restricted data sharing (**Brecher et al., 2024**; **Dai et al., 2020**).

### 3.3. Security & Safety Gaps
Legacy protocols like Modbus and DNP3 lack built-in security (encryption/authentication) (**Mondal et al., 2025**). Remote access is often "all-or-nothing," lacking fine-grained RBAC or safety interlocks, relying entirely on the "Human-in-the-loop" without system-level safeguards (**Enescu & Bizon, 2017**; **Ward et al., 2023**).

## 4. Gap Analysis
The following gaps must be bridged to achieve the desired Future State:

| Feature | Current State (Legacy SCADA) | Desired Future State (TMG) | Gap |
| :--- | :--- | :--- | :--- |
| **User Roles** | Blended responsibilities. | Distinct "Integrator" vs. "Operator." | Lack of specialized views (**Abbas & Shaheen, 2014**; **Kuruppu Appuhamilage et al., 2025**). |
| **Data Model** | Raw register addresses. | Semantic Assets (Pump01.Temp). | Need for abstraction (OPC UA/AAS/DTDL). |
| **Actuation** | Direct write; no audit. | "Safe Actuation" with 2FA/Audit. | Lack of non-repudiation (**IEC, 2018**). |
| **Connectivity** | Polling-based. | Event-driven with Heartbeats. | Reliability monitoring (**Pliatsios et al., 2020**; **Lydia et al., 2023**). |

## 5. Future State Design (To-Be)
The TMG platform addresses these gaps through the following architectural definitions.

### 5.1. Stakeholder Analysis (Actors & Roles)
The research validates a multi-tier stakeholder model:
*   **Device Integrator (Builder):** Analogous to the "System Designer" (**Atlagic et al., 2012**) or "Digital OEM" (**Slama et al., 2023**).
*   **Operator (User):** Responsible for real-time monitoring. This aligns with the "Digital Equipment Operator" (**Slama et al., 2023**) and Fleet Managers in AI-enabled frameworks (**Potdar & Parikh, 2025**).
*   **Coopetitors:** In modern SME networks, stakeholders may include "coopetitors" who share infrastructure while competing (**da Silva & Cardoso, 2024**).
*   **Software Agents:** Specialized agents (rational, monitoring, control) that perform autonomous tasks (**Abbas & Shaheen, 2014**; **Dorneanu et al., 2022**).
*   **Data Brokers & Aggregators:** Intermediaries coordinating data services and community-level data (**Wang et al., 2024**; **Motta et al., 2025**).
*   **Cross-Functional Teams:** Includes "IT talents," managers, and **PRA (Probabilistic Risk Assessment)** experts required for Smart Production (**Agerskans et al., 2025**; **Zhang & Kelly, 2023**).
*   **Security Officer:** Manages policies, certificates, and RBAC (**DiLuoffo et al., 2018**; **Zhang & Kelly, 2023**).

### 5.2. Process Architecture (System Boundaries & I/O)
*   **Three-Layer CPS Model:** TMG adopts a Perception (sensing), Transmission (networking), and Application (processing) architecture (**Lydia et al., 2023**; **Hudda & Haribabu, 2025**).
*   **Ingestion & Buffering:** Classifies I/O into Telemetry, States, and Commands, utilizing **adaptive sampling** and data buffering to ensure continuity (**Motta et al., 2025**; **Fang et al., 2025**).
*   **MAPE-K Feedback Loop:** Implements a Monitor-Analyze-Plan-Execute loop to manage self-adaptive asset behavior (**Pfeiffer et al., 2022**).
*   **Swarm Intelligence:** Uses hierarchical topologies (edge/fog/cloud) to derive fleet-wide insights from aggregated asset data (**Slama et al., 2023**; **Brecher et al., 2024**).
*   **Discovery & Registry:** Support for automated discovery via "Digital Twin Web" templates and block timestamps (**Ala-Laurinaho et al., 2024**; **Khalil et al., 2023**).
*   **Multi-Robot Coordination:** Enables a single operator to oversee a diverse MR-fleet through a centralized interface (**Mitchell et al., 2025**).

### 5.3. Data Governance & Standards
*   **Interoperability Layers:** Adoption of **OPC UA**, **AAS**, and **DTDL** for semantic asset definition (**Belbachir et al., 2025**; **Cavalieri & Gambadoro, 2023a**; **Schmidt et al., 2023**).
*   **Semantic Mapping:** Uses DTDL v2 to describe twin properties and relationships, mapping them to the OPC UA `WriteMask` and `DisplayName` attributes (**Kuruppu Appuhamilage et al., 2025**; **Cavalieri & Gambadoro, 2023b**).
*   **Metadata Metamodels:** Implementation of the **RAI4.0 metamodel** or **GOPPRR** semantic modeling to serve as a "single source of truth" (**Dintén et al., 2023**; **Li et al., 2021**).
*   **Digital Assets:** Encapsulation of digital representations and synchronization mechanisms into one "Digital Asset" business object (**Duan et al., 2025**).
*   **Complex Data Types:** Storage strategies must handle standard telemetry as well as complex multi-dimensional structures like real-time geospatial data cubes (**Liu et al., 2024**).
*   **Asset Identity:** Unique identification via **NFTs (ERC-721)** or IRDI/IRI identifiers (**Khalil et al., 2023**; **Hakimi et al., 2024**).
*   **Storage Strategy:** A centralized **Data Lake** using a "Postgres for Everything" approach, potentially supplemented by **Cassandra** for rapid data ingestion (**Tavares, 2024**; **Dintén et al., 2023**; **Brecher et al., 2024**).

### 5.4. Interface Design
*   **Customization & UXD:** Supports "Personalized Dashboards" through **User-Experience Design (UXD)** and adaptive user interfaces (**Guggenberger et al., 2021**; **Xiao et al., 2025**).
*   **HMI Technology:** Explicit validation of **React JS** for building modern, responsive HMIs (**Belbachir et al., 2025**; **Motta et al., 2025**).
*   **Lightweight Implementations:** For SMEs or specific CNC use cases, lightweight frameworks using standard protocols are validated (**Anbalagan et al., 2025**).
*   **Visual Patterns:** Use of card-based grid layouts (**Slama et al., 2023**), Node-RED for low-code composition (**Orłowski & Adrych, 2024**), and personalized warnings (**Fang et al., 2025**).
*   **Digital Twin Visualization:** Support for 3D/VR Digital Twins, immersive visualizations, and "DT Cockpits" generated via Model-Driven Engineering (**Lehner et al., 2025**; **Ward et al., 2023**; **Ala-Laurinaho et al., 2024**).
*   **Advanced Maintenance:** Use of **AR-based interface design** for providing intuitive manual maintenance guidance (**Xiao et al., 2025**; **Hakimi et al., 2024**).

### 5.5. Risk & Security Management
*   **Secure Product Lifecycle:** Alignment with **IEC 62443-4-1** and **NIST SP 800-82** (**IEC, 2018**; **Zhang & Kelly, 2023**; **Guduru & Azad, 2026**).
*   **Fine-Grained RBAC:** Implementation of metric-level access control and the **RRBAC** (Role- and Resource-Based) model to prevent privilege abuse (**Colombo & Ferrari, 2024**; **Zhao et al., 2008**).
*   **DevSecOps & Threat Modeling:** Integration of security practices into the entire development lifecycle (**Slama et al., 2023**).
*   **Safety Interlocks:** Mandatory "Human-in-the-loop" verification and runtime monitoring for safety halts (**McGinnis, 2019**; **Brecher et al., 2024**).
*   **Data Integrity:** Use of TLS 1.3, mTLS, and **digital watermarking** to protect against unauthorized interception or copyright disclosure (**Zhang et al., 2025**; **Wang et al., 2024**).

### 5.6. Functional Requirements
1.  **REQ-AUTH-01:** Strict Integrator/Operator separation via fine-grained, metric-level RBAC (**Colombo & Ferrari, 2024**).
2.  **REQ-DATA-01:** Asset modeling engine supporting AAS/DTDL concepts and MAPE-K loops (**Schmidt et al., 2023**; **Pfeiffer et al., 2022**).
3.  **REQ-SAFE-01:** Safety Interlock UI and runtime monitoring for actuation (**McGinnis, 2019**; **Brecher et al., 2024**).
4.  **REQ-AUDIT-01:** Tamper-proof, immutable Audit Log potentially stored in a distributed ledger (**Khalil et al., 2023**).
5.  **REQ-CONN-01:** Native Heartbeat monitoring and RBE telemetry ingestion (**Eclipse Foundation, 2023**; **Pliatsios et al., 2020**).

## 6. Impact & Benefits
*   **Efficiency:** Swarm intelligence allows for broader fleet insights (**Slama et al., 2023**).
*   **Safety:** DevSecOps and hazard prevention interlocks prevent catastrophic failures (**Kim et al., 2025**; **Cavalieri & Gambadoro, 2023a**).
*   **Interoperability:** Standardized AAS/DTDL models allow for vendor-neutral transformation and rapid scaling (**Schmidt et al., 2023**; **Schwörer et al., 2025**).

## 7. Implementation Plan (High-Level)
1.  **Foundation:** Scaffold stack, implement Postgres/TimescaleDB schema, and basic RBAC.
2.  **Data Core:** Build Asset Modeling Engine (AAS/DTDL) and RBE Telemetry ingestion.
3.  **Visualization:** Develop React Grid dashboard and Widget library (including 3D/AR).
4.  **Safety & Automation:** Implement Safety Interlocks, Fine-grained RBAC, and MDE tools.

## 8. References

* Abbas, H., & Shaheen, S. (2014). Future SCADA challenges and the promising solution: the agent-based SCADA. *International Journal of Critical Infrastructures*, 10, 307-333. https://doi.org/10.1504/IJCIS.2014.066354
* Agerskans, N., et al. (2025). A data flow framework to support the selection and integration of digital technologies for smart production. *International Journal of Production Research*, 63(12), 4269–4286. https://doi.org/10.1080/00207543.2024.2333141
* Ala-Laurinaho, R., et al. (2024). Paradigm shift in mechanical system design through a digital twin web. *Software & Systems Modeling*, 24(4). https://doi.org/10.1007/s10270-024-01215-8
* Alfaouri, F., & Saleet, H. (2025). Smart system development for real-time container dispatch optimization and strategic truck allocation using genetic algorithms. *Arabian Journal for Science and Engineering*. https://doi.org/10.1007/s13369-025-10582-3
* Anbalagan, A., et al. (2025). Lightweight CNC digital process twin framework: IIoT integration with open62541 OPC UA protocol. *Production & Manufacturing Research*, 13(1), 2544981. https://doi.org/10.1080/21693277.2025.2544981
* Atlagic, B., et al. (2012). Model-based approach to the development of SCADA applications. *IEEE ECBS*, 308-315. https://doi.org/10.1109/ecbs.2012.6487435
* Belbachir, A., et al. (2025). COGNIMAN digital twin architecture for flexible manufacturing. *Journal of Intelligent Manufacturing*. https://doi.org/10.1007/s10845-025-02625-1
* Brecher, C., et al. (Eds.). (2024). *Internet of Production*. Springer. https://doi.org/10.1007/978-3-031-44497-5
* Cavalieri, S., & Gambadoro, S. (2023a). Enhancing Interoperability of Digital Twins through a Mapping of DTDL to AAS. *ICEIS 2023*.
* Cavalieri, S., & Gambadoro, S. (2023b). Proposal of Mapping DTDL to OPC UA. *Sensors*, 23(4). https://doi.org/10.3390/s23042349
* Colombo, P., & Ferrari, E. (2024). Access Control Integration in Sparkplug-Based IIoT Systems. *WEBIST 2024*, 380-384.
* Crespi, N., et al. (Eds.). (2023). *The Digital Twin* (Vol. 1 & 2). Springer Nature. https://doi.org/10.1007/978-3-031-21343-4
* Dai, H.-N., Wang, H., Xu, G., Wan, J., & Imran, M. (2020). Big data analytics for manufacturing internet of things: opportunities, challenges and enabling technologies. *Enterprise Information Systems*, 14(9-10), 1279-1303. https://doi.org/10.1080/17517575.2019.1633689
* da Silva, A., & Marques Cardoso, A. J. (2024). Designing the future of coopetition: An IIoT approach for empowering SME networks. *International Journal of Advanced Manufacturing Technology*, 135, 747–762. https://doi.org/10.1007/s00170-024-14528-1
* Dintén, R., et al. (2023). Fleet management systems in Logistics 4.0 era: a real time distributed and scalable architectural proposal. *Procedia Computer Science*, 217, 806–815. https://doi.org/10.1016/j.procs.2022.12.277
* DiLuoffo, V., et al. (2018). Robot Operating System 2: The need for a holistic security approach to robotic architectures. *International Journal of Advanced Robotic Systems*, 15(3), 1–15. https://doi.org/10.1177/1729881418770011
* Dorneanu, B., et al. (2022). Big data and machine learning: A roadmap towards smart plants. *Frontiers of Engineering Management*, 9(4). https://doi.org/10.1007/s42524-022-0218-0
* Duan, H., et al. (2025). The development of a digital twin concept system. *Digital Twin*, 2(10). https://doi.org/10.12688/digitaltwin.17599.3
* Eclipse Foundation. (2023). *Sparkplug® Specification v3.0.0*. https://sparkplug.eclipse.org/spec/sparkplug-specification-3.0.0.pdf
* Enescu, F. M., & Bizon, N. (2017). SCADA Applications for Electric Power System. In *Reactive Power Control in AC Power Systems* (pp. 561-582). Springer. https://doi.org/10.1007/978-3-319-51118-4_15
* Fang, F., et al. (2025). Enhancing SCADA systems in oil and gas pipelines through electronics and full data-type publishing technology. *Australian Journal of Electrical and Electronics Engineering*. https://doi.org/10.1080/1448837X.2025.2459491
* Figueroa-Lorenzo, S., Añorga, J., & Arrizabalaga, S. (2019). A Role-Based Access Control Model in Modbus SCADA Systems. A Centralized Model Approach. *Sensors*, 19(20), 4455. https://doi.org/10.3390/s19204455
* Flores-García, E., et al. (2023). Enabling industrial internet of things-based digital servitization in smart production logistics. *International Journal of Production Research*, 61(12), 3884–3909. https://doi.org/10.1080/00207543.2022.2081099
* Gharibvand, V., et al. (2024). Cloud based manufacturing: A review. *The International Journal of Advanced Manufacturing Technology*, 131. https://doi.org/10.1007/s00170-024-12989-y
* Guduru, J., & Azad, S. M. A. K. (2026). Analysis of networked control system with 3-layer delayed network in industrial process automation. *Journal of the Chinese Institute of Engineers*, 49(1), 174-188. https://doi.org/10.1080/02533839.2025.2529394
* Guggenberger, T. M., et al. (2021). How to Design IIoT-Platforms Your Partners are Eager to Join. *Innovation Through Information Systems*, 48, 441-456. https://doi.org/10.1007/978-3-030-86800-0_34
* Hakimi, O., et al. (2024). Digital twin-enabled smart facility management: A bibliometric review. *Frontiers of Engineering Management*, 11(1). https://doi.org/10.1007/s42524-023-0254-4
* Hudda, S., & Haribabu, K. (2025). A review on WSN based resource constrained smart IoT systems. *Discover Internet of Things*, 5(56). https://doi.org/10.1007/s43926-025-00152-2
* Hunzinger, R. (2017). SCADA fundamentals and applications in the IoT. In *Internet of Things and Data Analytics Handbook* (pp. 283–294). Wiley.
* IEC. (2018). *IEC 62443-4-1:2018, Part 4-1: Secure product development lifecycle requirements*. International Electrotechnical Commission.
* Khalil, U., et al. (2023). Leveraging a novel NFT-enabled blockchain architecture for IoT asset management. *Scientific Reports*, 13. https://doi.org/10.1038/s41598-023-45812-4
* Kim, D., et al. (2025). Reconfigurable machine tending with collaborative robots: leveraging ISO 21919. *International Journal of Computer Integrated Manufacturing*. https://doi.org/10.1080/0951192X.2025.2496901
* Kuruppu Appuhamilage, G. D., et al. (2025). A health digital twin framework. *NPJ Digital Medicine*, 8(1738). https://doi.org/10.1038/s41746-025-01738-4
* Lehner, D., et al. (2025). Model-driven engineering for digital twins. *Software & Systems Modeling*, 24(4). https://doi.org/10.1007/s10270-025-01264-7
* Li, H., et al. (2021). Supporting Digital Twin Integration Using Semantic Modeling and High-Level Architecture. *Advances in Production Management Systems (APMS)*. https://doi.org/10.1007/978-3-030-85910-7_24
* Liu, R., et al. (2024). RTGDC: a real-time ingestion and processing approach in geospatial data cube for digital twin of earth. *International Journal of Digital Earth*, 17(1), 2365386. https://doi.org/10.1080/17538947.2024.2365386
* Lydia, M., et al. (2023). Securing the cyber-physical system: a review. *Cyber-Physical Systems*, 9(3), 193–223. https://doi.org/10.1080/23335777.2022.2104378
* McGinnis, L. (2019). Formalizing ISA-95 Level 3 Control with Smart Manufacturing System Models. *NIST GCR 19-022*. https://doi.org/10.6028/NIST.GCR.19-022
* Mitchell, D., et al. (2025). A cyber physical architecture for symbiotic multi-robot fleet management. *Virtual and Augmented Reality Technology-Enhanced Learning*, 379–421. https://doi.org/10.1007/978-981-97-9614-4_16
* Mondal, S., et al. (2025). Real-time analysis of cyber attacks in SCADA based power system. *Australian Journal of Electrical and Electronics Engineering*. https://doi.org/10.1080/1448837X.2025.2531694
* Motta, L. L., et al. (2025). A cloud architecture for home energy management systems: a conceptual model. *Energy Informatics*, 8, 142. https://doi.org/10.1186/s42162-025-00433-y
* Nechibvute, A., & Mafukidze, H. D. (2024). Integration of SCADA and Industrial IoT: Opportunities and Challenges. *IETE Technical Review*, 41(3), 312–325. https://doi.org/10.1080/02564602.2023.2246426
* Orłowski, C., & Adrych, M. (2024). Model of IoT design decision-making processes in Flow Based Programming systems. *Journal of Information and Telecommunication*, 8(3), 315–324. https://doi.org/10.1080/24751839.2023.2286765
* Petrik, D. (2023). Exploring the Determinants of Partner Management in IIoT Platform Ecosystems. *European Journal of Management Issues*, 31(2), 79-92. https://doi.org/10.15421/192307
* Pfeiffer, J., et al. (2022). Towards a Product Line Architecture for Digital Twins. *ISW*.
* Pliatsios, D., Sarigiannidis, P., Lagkas, T., & Sarigiannidis, A. G. (2020). A Survey on SCADA Systems: Secure Protocols, Incidents, Threats and Tactics. *IEEE Communications Surveys & Tutorials*, 22(3), 1942-1976. https://doi.org/10.1109/COMST.2020.2987688
* Potdar, P. R., & Parikh, S. M. (2025). Internet of things (IoT) and artificial intelligence (AI) enabled framework for smart fleet management. *OPSEARCH*. https://doi.org/10.1007/s12597-025-00961-7
* Schmidt, C., et al. (2023). Increasing Interoperability between Digital Twin Standards: A Mapping from DTDL to AAS. *Sensors*, 23(18). https://doi.org/10.3390/s23187742
* Schwörer, T., et al. (2025). Modular and reconfigurable factories for continuous production innovation in pharmaceutical manufacturing. *International Journal of Production Research*. https://doi.org/10.1080/00207543.2025.2575844
* Slama, D., et al. (Eds.). (2023). *The Digital Playbook*. Springer. https://doi.org/10.1007/978-3-030-88221-1
* Tavares, A. (2024, May 28). Understanding IoT (Internet of Things). *TigerData*. https://www.tigerdata.com/learn/understanding-iot-internet-of-things
* Wang, B., et al. (2024). Cooperative IoT data sharing based on electricity retail. *IEEE Transactions on Industrial Informatics*.
* Ward, R., et al. (2023). The challenges of using live-streamed data in a predictive digital twin. *Journal of Building Performance Simulation*, 16(5), 609–630. https://doi.org/10.1080/19401493.2023.2187463
* Xiao, X., et al. (2025). Industrial Metaverse design methodologies: a comprehensive literature review. *International Journal of Computer Integrated Manufacturing*. https://doi.org/10.1080/0951192X.2025.2544545
* Zhang, F., & Kelly, K. (2023). Overview and recommendations for cyber risk assessment in nuclear power plants. *Nuclear Technology*, 209(3), 488–502. https://doi.org/10.1080/00295450.2022.2092356
* Zhang, H., et al. (2025). Developing real-time IoT-based public safety alert and emergency response systems. *Scientific Reports*, 15(1738). https://doi.org/10.1038/s41598-025-01738-4
* Zhao, Y., Zhao, Y., & Lu, H. (2008). A Flexible Role- and Resource-Based Access Control Model. *2008 ISECS International Colloquium on Computing, Communication, Control, and Management*, 75-79. https://doi.org/10.1109/CCCM.2008.231
* Zvarivadza, T., et al. (2024). On the impact of Industrial Internet of Things (IIoT) - mining sector perspectives. *International Journal of Mining, Reclamation and Environment*, 38(10), 771–809. https://doi.org/10.1080/17480930.2024.2347131