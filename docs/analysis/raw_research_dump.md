# Raw Research Dump (TMG)

This file contains the raw output from NotebookLM for each source investigated. 
The Mentor will process this information to populate the formal Research Log and BPA Report.

---

<!-- PASTE NEW ANALYSES BELOW THIS LINE -->

# Batch 1 of Sources
### Analysis of Source: A Role-Based Access Control Model in Modbus SCADA Systems. A Centralized Model Approach.

**APA Style**  

Figueroa-Lorenzo, S., Añorga, J., & Arrizabalaga, S. (2019). A Role-Based Access Control Model in Modbus SCADA Systems. A Centralized Model Approach. _Sensors_, _19_(20), 4455. https://doi.org/10.3390/s19204455

**RQ1 (Actors & Roles):** The source defines the **"Operator"** as a specific role that can be stored within the `roleName` field of an X.509v3 certificate extension to authorize actions. It describes a communication model between a **"Client"** (e.g., a SCADA system) and a **"Server"** (e.g., a PLC). While it validates the "Operator" role, the source does **not mention the "Integrator" role**; instead, it refers to the entity that populates the role database as "the client, e.g., the organization that own the SCADA". There is no mention of "Maintenance Engineers" or "Data Analysts" as additional stakeholders.

**RQ2 (System Boundaries & I/O):** The source aligns with the **ISA-95 model**, specifically focusing on data sharing between the **field device level (Level 1)** and the **SCADA system level (Level 2)**.

- **Inputs:** It identifies Modbus frames consisting of an **MBAP header and PDU** (Protocol Data Unit), containing **Function Codes** such as Read Coils (0x01), Read Holding Registers (0x03), and Read-Write Multiple Register (0x17).
- **Data Flows:** It details the **TLS 1.3 handshake** (Client_Hello, Server_Hello, Certificate exchange) as a critical data flow for authentication.
- **Missing Flows:** The source does **not explicitly mention firmware updates or heartbeats** as specific data flows, though it does mention the "Unit ID" and "Function Codes" as primary components of the command flow. **Audit logs** are not discussed as a system output [N/A].

**RQ3 (Data Modeling & Standards):** The source utilizes the **ISA-95 functional hierarchy** to contextualize the Modbus protocol's action fields. It details the modeling of the **Modbus TCP frame**, which includes the **MBAP header** (Transaction ID, Protocol ID, Length, and Unit ID) and the **PDU** (Function Code and Data). There is **no mention of MQTT Sparkplug B or Digital Twin Definition Language (DTDL)** [N/A]. It acknowledges Modbus as a "serial de facto standard" for communicating with heterogeneous automation devices like PLCs, HMIs, and I/O devices.

**RQ4 (Dashboard Architecture):** **N/A.** The source focuses exclusively on the protocol security layer, RBAC implementation, and network latency; it does not contain information regarding React, grid layouts, or frontend widget patterns.

**RQ5 (OT Security & Safety):** The source proposes an **RBAC model** using **X.509v3 digital certificates** where roles are inserted as arbitrary extensions to authorize clients during the **TLS handshake**. For "Remote Actuation" safety, it introduces a second authorization phase where the **"Unit ID"** in the Modbus header is used to authorize individual frames even after a secure channel is established. It utilizes the **IEC 62443 standard** to define a testnet architecture divided into security levels (Level 1 for controllers/actuators and Level 2 for HMI/monitoring). It also mentions the use of **TLS 1.3** to provide confidentiality, integrity, and protection against replay and Man-in-the-Middle (MiTM) attacks.

**Key Quote:** "Our proposal is a way to contextualize the specifications and to demonstrate the viability of it through both a security and a performance analysis... this study proposes a role-based access control model (RBAC), which allows the server (e.g., PLC) to authorize a client (e.g., SCADA system)."

---

### Analysis of Source: A Survey on SCADA Systems: Secure Protocols, Incidents, Threats and Tactics.pdf

D. Pliatsios, P. Sarigiannidis, T. Lagkas and A. G. Sarigiannidis, "A Survey on SCADA Systems: Secure Protocols, Incidents, Threats and Tactics," in IEEE Communications Surveys & Tutorials, vol. 22, no. 3, pp. 1942-1976, thirdquarter 2020, doi: 10.1109/COMST.2020.2987688.
keywords: {Security;SCADA systems;Protocols;Internet;Tutorials;Market research;Topology;SCADA;cybersecurity;protocols;security;smart grid;trends},


**RQ1 (Actors & Roles):** The source defines the **"Operator"** as a core component of SCADA architecture, responsible for monitoring the system, addressing alerts, and performing control operations either locally or via the Internet. It does not explicitly mention the "Integrator" role, but it identifies technical actors such as the **Master Terminal Unit (MTU)** for gathering data and sending signals, and **Remote Terminal Units (RTUs)** for exchanging data with field devices. While it mentions that organizations run "analytics" on collected data via an Intranet, it does not define a "Data Analyst" or "Maintenance Engineer" as a specific personnel role.

**RQ2 (System Boundaries & I/O):** The source aligns with several proposed I/O categories and identifies missing data flows:

- **Inputs:** It confirms **telemetry** from distributed field devices (sensors) and **commands** translated by the HMI.
- **Missing Flows (Heartbeats/Probing):** It identifies **"link status probing"** as a function within the DNP3 protocol, which serves as a heartbeat mechanism.
- **Missing Flows (Firmware/Reprogramming):** It mentions that the Unitronics PCOM protocol supports **"administrative operations"** used to **"manage and reprogram the PLC"**, effectively covering firmware updates.
- **Missing Flows (Audit Logs):** It discusses the security objective of **"non-repudiation,"** which requires providing irrefutable evidence of actions performed, implying the need for audit logs. It also mentions the use of **"log files"** for recording experimental results in testbeds.

**RQ3 (Data Modeling & Standards):** The source provides details on interoperability modeling through specific standards:

- **IEC 61850:** This standard defines a **"hierarchical, object-oriented, data representation model"** that creates an abstract layer, allowing clients to browse and retrieve data without knowing implementation details.
- **Device Profiles:** Both **Ethernet Powerlink** and the **Common Industrial Protocol (CIP)** utilize **"device profiles"** to define device properties and increase interoperability across different vendors.
- **N/A:** The source does **not mention MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** **N/A.** The source focuses on protocol specifications, network security, and SCADA architecture; it does not contain information regarding React-based grid layouts or frontend widget patterns.

**RQ5 (OT Security & Safety):** The source provides extensive details on OT security standards and safe actuation:

- **Standards:** It cites **NIST SP-800** for ICS security and **NIST IR-7628** for Smart Grid guidelines. It also mentions **IEC 62443**, specifically regarding the **"Zones and Conduits"** security measure and dynamic zoning via SDN.
- **Remote Actuation Safety:** It discusses **"Command Injection"** as a significant threat and reviews a **"semantic analysis framework"** designed to detect and mitigate malicious control command injection attacks by evaluating command effects prior to execution.
- **RBAC:** It defines **"authorization"** and **"authentication"** as key security objectives to manage user access and determine privileges.

**Key Quote:** "The IEC 61850... introduces an abstract layer, which enables a client to browse and retrieve data from a device without knowing details and implementation of the device."

---

### Analysis of Source: A flexible role- and resource- based access control model.pdf

Y. Zhao, Y. Zhao and H. Lu, "A Flexible Role- and Resource-Based Access Control Model," 2008 ISECS International Colloquium on Computing, Communication, Control, and Management, Guangzhou, China, 2008, pp. 75-79, doi: 10.1109/CCCM.2008.231. keywords: {Access control;Security;Adaptation model;Authorization;Computational modeling;Educational institutions;Companies;RBAC;Access Control;ATN;Information security;Grid Compute},

**RQ1 (Actors & Roles):** The source defines several key actors within its proposed RRBAC model. The **"System Administrator"** is responsible for managing sessions, generating SessionIDs, and checking user identities. The **"Resource Provider"** is a critical stakeholder who performs tasks similar to an "Integrator," such as registering resources into the security domain, providing specific roles for that domain, and storing Access Control Lists (ACLs). While the source does not use the specific term "Operator," it refers to **"Requestors"** or **"Users"** who attain privileges to perform actions on resources. A practical use case identifies specific personnel roles such as **"Professor," "Tutor," "PhD," and "Guest"**.

**RQ2 (System Boundaries & I/O):** The source describes system interactions through a specialized set of data and functions:

- **Inputs:** It identifies **"Identity/Attribute Certificates"** or **"Trust Negotiation"** data as inputs for user authorization.
- **Data Flows/Commands:** Instead of "telemetry," it focuses on **"Privileges"** which represent operation actions like **access, read, write, modify, delete, upgrade, and downgrade**.
- **System Functions:** It introduces **"Session IDs"** as a string to denote the procedure for a user to perform actions.
- **Missing Flows:** The source does **not mention heartbeats, firmware updates, or external APIs** (e.g., weather data) [N/A]. It mentions **ACLs** as a record of user operations, which functions as a form of audit documentation.

**RQ3 (Data Modeling & Standards):** The source focuses on a novel modeling approach called **RRBAC**, which introduces the **"Resource"** concept as an intermediary between roles and privileges to handle heterogeneous applications. It models authorization through four mapping functions: **UR** (User to Role), **RRes** (Role to Resource), **ResP** (Resource to Privilege), and **SR** (Session to Role). It discards traditional "Role Hierarchy" in favor of a **"Role Directory Structure"** where roles are independent and disrelated to reduce implementation complexity. There is **no mention of ISA-95, MQTT Sparkplug B, or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** **N/A.** The source is strictly focused on access control logic and mathematical mapping models; it contains no information regarding React, grid layouts, or frontend widget patterns.

**RQ5 (OT Security & Safety):** The source addresses security in distributed environments by modifying **RBAC** to prevent "privilege abuse" where a user might otherwise access a kind of resource rather than a _specified_ resource. It suggests using **Trust Management (TM)** and **Automated Trust Negotiation (TN/ATN)** to allow users to dynamically attain roles or privileges in open environments. For safety and security, it advocates for the **"separation of duty"** and a "global management and local autonomy" philosophy for resources. It does not specifically mention IEC 62443 or physical safety interlocks for remote actuation [N/A].

**Key Quote:** "In RRBAC, we discard role hierarchy and adopt role directory structure, i.e., the roles are disrelated to each other, and each role has its corresponding privileges. The modification reduces the complexity and helps to the system implementation."

---

### Analysis of Source: An Energy Considering RBAC Model for Wireless Sensor Network.pdf

Song, W., Wu, Z., Yuan, L., & Xiong, W. (2011). An Energy Considering RBAC Model for Wireless Sensor Network. _International Conference on Wireless Communications, Networking and Mobile Computing_, 1–4. https://doi.org/10.1109/WICOM.2011.6040157

**RQ1 (Actors & Roles):** The source does not explicitly use the terms "Integrator" or "Operator." Instead, it defines **"Users"** as technical entities including **sensor nodes, base station nodes, and SINK nodes**, identified by **Node ID, Group ID, and Cluster ID**. Roles are defined as a set of permissions to complete required work, with specific examples including **"cluster head node," "legitimate nodes," "initial_role"** (to send ID data), and **"Ori_role"** (to receive and forward data). It also mentions a **"processing center"** that handles authentication and search requests in a local database.

**RQ2 (System Boundaries & I/O):** The source details various data flows and operations:

- **Inputs (Telemetry/Data):** It identifies **"local probe data,"** "read and write data," and "data aggregation".
- **Commands/Outputs:** It lists "Device Management" operations such as **"open and closed nodes," "activating dormant node,"** and "transmit power control".
- **System Functions:** It identifies **"Energy management"** and "routing management" as key processes.
- **Missing Flows:** While it does not explicitly name "heartbeats," it describes an **initialization process** where nodes send IDs to a sink node to be "certified" as legitimate, which serves a similar discovery function. **Audit logs** are not mentioned [N/A].

**RQ3 (Data Modeling & Standards):** The source classifies data resources into categories: **source/target detected data, network routing data, user ID data, and security data** (plain data, encrypted data, and keys). It models hierarchy through a **"partial order" inheritance relationship** (ri ≥ rj), where a child role inherits all permissions of the parent. There is **no mention of ISA-95, MQTT Sparkplug B, or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** **N/A.** The source focuses on the energy consumption and security of wireless sensor networks; it does not contain information regarding React, grid layouts, or frontend widget patterns.

**RQ5 (OT Security & Safety):** The source proposes an **"Energy Considering RBAC"** model to balance security and limited resource overhead.

- **RBAC Mechanisms:** It introduces **Static Separation of Duty (SSD)**, where a user's **energy level must be higher than a pre-defined standard** to obtain a role. It also uses **Dynamic Separation of Duty (DSD)** to limit privileges during a session by checking energy and role keys before activation.
- **Key Management:** To prevent unauthorized control, it uses a **one-way hash function hierarchy** for role keys, where keys for higher-level roles are generated from "terminal role" keys using hash functions.
- **Safety/Actuation:** Remote management includes the ability to **"open and closed nodes"**. The source notes that nodes are often in "hostile or harsh environments," making them vulnerable to capture or failure.

**Key Quote:** "In the method user who want to activate a role must got the key of the role. A user can not perform work if it has not the key of role even if it has the role."

---

### Analysis of Source: Big data analytics for manufacturing internet of things: opportunities, challenges and enabling technologies

Hong-Ning Dai, Hao Wang, Guangquan Xu, Jiafu Wan & Muhammad Imran
(2020) Big data analytics for manufacturing internet of things: opportunities, challenges
and enabling technologies, Enterprise Information Systems, 14:9-10, 1279-1303, DOI:
10.1080/17517575.2019.1633689

**RQ1 (Actors & Roles):** The source defines the manufacturing chain as involving multiple parties: **suppliers, manufacturers, distributors, logistics, retailers, and customers**. While it does not explicitly use the terms "Integrator" or "Operator" as platform roles, it distinguishes between **"academic researchers and industrial practitioners"** as those interested in enabling technologies. It also identifies the **"customer"** as a stakeholder whose data (from sales, social media, etc.) is analyzed to improve product design and after-sales support.

**RQ2 (System Boundaries & I/O):** The source aligns with and expands upon several proposed I/O categories:

- **Inputs:** Validates **External Data** by specifically mentioning **weather or seasonal conditions** used to forecast demand and proactively allocate machinery resources. It also lists **sensory data** (temperature, humidity, air pressure) and **RFID readings** as primary inputs.
- **Outputs:** Identifies **Visualization** (including statistic plots, heat maps, and geographic data) and **Control Signals** where the system "makes actions on the physical environment" via actuators.
- **Missing Flows:** Mentions **"logs"** as a heterogeneous data type generated during the manufacturing process. **"Traceability"** is identified as a necessary function to identify data access or modification. The source does **not mention firmware updates or heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** The source models data for heterogeneous devices by categorizing it into **structured, semi-structured, and unstructured** types.

- **Standards:** It mentions **6LoWPAN** and **WirelessHART** for wireless connectivity.
- **Database Patterns:** It identifies **PostgreSQL** as a typical relational database used in manufacturing (e.g., for ERP/SCM) but notes that **NoSQL databases** are more "promising" for managing massive, heterogeneous sensory and device data due to superior scalability.
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source identifies **web-based visualization tools** as a key technology, specifically listing **Tableau, Plotly, Sisense, and D3.js**. It also mentions **Python-based libraries** like Seaborn and Matplotlib for generating statistic plots. However, it does **not mention React, grid layouts, or specific widget patterns** [N/A].

**RQ5 (OT Security & Safety):** The source classifies MIoT systems as **mission-critical** and highly sensitive to machinery downtime or system failure.

- **Security Mechanisms:** It advocates for **authentication mechanisms** (access control for files/records), **proper key management**, and **traceability** to prevent or identify malicious behaviors.
- **Remote Actuation:** It discusses the shift to **Edge/Fog computing** to allow "delay-critical" tasks like **monitoring and controlling** to be executed in the proximity of factories.
- **N/A:** The source does **not explicitly cite IEC 62443 or specific safety interlocks** for remote actuation [N/A].

**Key Quote:** "MIoT systems are usually mission-critical and sensitive to system failure or machinery downtime while CIoT [Consumer IoT] systems are non-mission-critical."

---

### Analysis of Source: Designing interoperable telehealth platforms: bridging IoT devices with cloud infrastructures

Kostas M. Tsiouris, Dimitrios Gatsios, Vassilios Tsakanikas, Athanasios A.
Pardalis, Ioannis Kouris, Thelma Androutsou, Marilena Tarousi, Natasa Vujnovic Sedlar, Iason
Somarakis, Fariba Mostajeran, Nenad Filipovic, Harm op den Akker, Dimitrios D. Koutsouris
& Dimitrios I. Fotiadis (2020) Designing interoperable telehealth platforms: bridging IoT
devices with cloud infrastructures, Enterprise Information Systems, 14:8, 1194-1218, DOI:
10.1080/17517575.2020.1759146

**RQ1 (Actors & Roles):** The source identifies three primary stakeholders in its architectural description: **clinical experts, patients, and data analysts**. Within the specific HOLOBALANCE use case, roles are further refined into **"healthcare professionals"** (primarily physiotherapists) and **"patients"**. An **"administrator"** role is also defined, responsible for managing user accounts, setting roles, and defining privileges for accessing platform functionality. The source does not explicitly use the terms "Integrator" or "Operator" as defined in the research plan [N/A].

**RQ2 (System Boundaries & I/O):** The platform defines clear data boundaries and I/O categories:

- **Inputs:** High-frequency **telemetry** includes raw sensor data from IMUs (motion tracking), pressure insoles, depth cameras, and heart rate monitors (Polar H10). **External Data** is integrated via the **Fitbit Web API** to include third-party activity tracking.
- **Commands:** The system supports **"real-time interaction"** where the task management module receives commands to control a holographic surrogate physiotherapist.
- **Missing Flows:** The source identifies **"log files"** used for technical inspection and stability monitoring. It mentions a **"global clock policy"** to synchronize incoming data streams, which relates to timing, though it does not explicitly name "heartbeats" or "firmware updates" [N/A].

**RQ3 (Data Modeling & Standards):** Interoperability is modeled using several key standards:

- **Communication Standards:** Uses the **FIWARE-Orion** protocol and the **NGSI v2 REST API** reference data context model. Data is formatted as **JSON objects** and converted to byte-streams using **Protocol Buffers** for efficiency.
- **Healthcare Standards:** Specifically integrates the **Fast Healthcare Interoperability Resources (FHIR)** standard from **HL7**, utilizing the **"Observation"** and **"PlanDefinition"** models to exchange metrics and management plans.
- **Schema Modeling:** Employs **Entity-Relationship (ER) models** for database design.
- **N/A:** The source does not mention ISA-95, MQTT Sparkplug B, or DTDL [N/A].

**RQ4 (Dashboard Architecture):** The platform utilizes a dual-interface approach: a **web-based interface** (Professional Web Portal) for experts and a **native mobile application** for patients.

- **Technologies:** The web interface is built using **PHP, JavaScript, and HTML5**.
- **Patterns:** It features **graphical elements**, **newsfeed components**, and a **social network** for user community interaction.
- **N/A:** There is no mention of "React," specific "grid layouts," or the "widget pattern" [N/A].

**RQ5 (OT Security & Safety):** Security and safety are handled through several layers:

- **Standards:** The system follows **IEEE Standard 1471–2000** for architecture and **ISO 14791–2012** for medical device **risk management**.
- **RBAC:** Implements **"role-dependent access"** where the administrator defines privileges.
- **Authentication:** Uses **JSON Web Tokens (JWT)** and **"X-Auth-Token"** headers for stateless cloud authentication.
- **Remote Safety:** For remote interaction with the hologram, the system uses a **task management module** to ensure the system operates within intended limits. It also utilizes **SSL certificates** and **HTTPS** for secure data exchange.

**Key Quote:** "The proposed scheme involves Orion... to define a universal set of standards for context data management, enabling cross-platform compatibility and easy integration of different components."

---

### Analysis of Source: Designing the future of coopetition: An IIoT approach for empowering SME networks

da Silva, A., Marques Cardoso, A.J. Designing the future of coopetition: An IIoT approach for empowering SME networks. _Int J Adv Manuf Technol_ **135**, 747–762 (2024). https://doi.org/10.1007/s00170-024-14528-1

**RQ1 (Actors & Roles):** The source defines stakeholders within a "service ecosystem" including **providers, customers, and rivals (coopetitors)**. It introduces the **"Coopetitor"** as a central role that simultaneously competes and collaborates, utilizing a specialized "Coopetition Information Compartment" to share data. Other identified actors include **regulatory authorities**, who participate in collaborative validation, and **SMEs** (Small and Medium-sized Enterprises) acting as the primary industrial nodes. The source does not explicitly use the terms "Integrator" or "Operator" as defined in the research plan, nor does it mention "Maintenance Engineers" [N/A].

**RQ2 (System Boundaries & I/O):** The system identifies clear functional hierarchies and data flows:

- **Inputs:** High-frequency **real-time sensor data** is used to inform immediate adjustments in machine operations. The system also ingests **"Descriptive Content"** (product specifications) co-created by manufacturers and customers.
- **Outputs:** The system generates **"Fingerprint4.0 +"**, a digital blueprint that carries ecological, lifecycle, and geometric data. It also outputs **control signals** used in manufacturing execution processes.
- **Data Flows:** It distinguishes between **horizontal communication** (machine-to-machine on the shop floor) and **vertical communication** (device-to-cloud data transfer).
- **Missing Flows:** While it mentions "lifecycle" data, it does not explicitly mention **firmware updates** or **heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** Interoperability and device modeling are centered on the **OPC UA (Unified Architecture)** standard.

- **Standardization:** OPC UA is utilized for its platform-independent data model and ability to combine web services with integrated security.
- **Modeling Approach:** The source proposes **"Fingerprint4.0 +"**, an advanced modeling tool composed of three virtual compartments: **Descriptive Content** (specifications), **Coopetition Information** (rival-specific data), and **Geometric Information** (for generating intelligent objects in manufacturing).
- **Interoperability:** It details three levels of interoperability: **Technical** (communication pathways), **Semantic** (meaningful message patterns), and **Pragmatic** (alignment with business rules).
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source presents a prototype interface called **"Cockpit 4.0 +"**.

- **UI Patterns:** It advocates for **"architectural modules"** that allow for "disintermediation and fragmentation," enabling the system to be reconfigured for personalization.
- **Design Philosophy:** The interface emphasizes **usability and accessibility** through "modular, adaptable, and user-friendly interfaces".
- **N/A:** The source does **not mention React, grid layouts, or specific persistence strategies** for frontend state [N/A].

**RQ5 (OT Security & Safety):** Security is managed through the **OPC UA security framework**.

- **Authentication & RBAC:** The system uses **"Authorization and access control"** mechanisms, including **user security tokens** and **digitally signed certificates** for session setup.
- **Security Protocols:** It employs **transport security protocols** to prevent message tampering and eavesdropping, ensuring data integrity and confidentiality.
- **Safety:** While "Remote Actuation" is not a primary term used, the source describes the **"control, coordination, and management of the physical world"** (machines and infrastructure) via these secure protocols. Safety is supported by "intelligent, self-regulating" processes and real-time sensor processing to inform machine adjustments.

**Key Quote:** "By leveraging these sophisticated security and interoperability features of OPC UA, the Coopetition IIoT-based System emerges as a powerful tool in facilitating a secure coopetition environment, essential for driving innovation and value creation in today’s dynamic business landscapes."

---

### Analysis of Source: Exploring the Determinants of Partner Management in IIoT Platform Ecosystems.pdf

Petrik, D. (2023). Exploring the Determinants of Partner Management in IIoT Platform Ecosystems. _European Journal of Management Issues_, _31_(2), 79-92. https://doi.org/10.15421/192307

**RQ1 (Actors & Roles):** The source validates the presence of multiple stakeholders in an IIoT ecosystem and explicitly identifies **"Device Integrators"** as a distinct partner type alongside infrastructure providers and complementors. It describes **"Complementors"** (or development partners) as those who create vertical solutions or complementary applications. It also identifies missing critical stakeholders not listed in the initial plan, specifically **"Consulting Organizations"** who provide support with platform integration for end customers, and **"Sales and Implementation Partners"** who handle customization and sales of digital services. The **"Platform Provider"** acts as an orchestrator, while the **"End Customer"** is the final user of the joint value proposition.

**RQ2 (System Boundaries & I/O):** The system is described as a middleware foundation for exchanging data across diverse industrial assets.

- **Inputs:** Identifies **"machinery data streamed to the platform"** and the integration of **"diverse industrial assets, enterprise systems, and external data sources"** for aggregated analysis.
- **Outputs:** Includes **"Digital services and software applications"** such as data-driven maintenance.
- **Data Flows:** It emphasizes the flow of **"Boundary Resources"** (e.g., APIs, SDKs, and support documentation) from the platform provider to partners to enable innovation.
- **Missing Flows:** The source identifies **"Change Management"** communications as a necessary flow when the platform evolves. It does **not explicitly mention heartbeats or firmware updates** [N/A].

**RQ3 (Data Modeling & Standards):** The source highlights the necessity of solving **"technical issues of standardization"** to enable technical interoperability between diverse assets. It suggests that partner selection should be based on **"platform compatibility"** and the **"compatibility of technologies used"**. While it mentions the use of **APIs** and **SDKs** as standardized boundary resources, it **does not mention MQTT Sparkplug B or DTDL** [46, N/A].

**RQ4 (Dashboard Architecture):** **N/A.** The source focuses on the business and organizational management of partners within the ecosystem; it does not contain details regarding React, grid layouts, or specific frontend widget patterns.

**RQ5 (OT Security & Safety):** Security and control are managed through **"Partner Programs"** which standardize rules for the ecosystem.

- **Formal Control:** The source distinguishes between **"Input Control"** (quality control at the application/marketplace level) and the actual **"machinery data,"** noting that formal app-style control does not typically affect the raw data streams.
- **RBAC & Governance:** It discusses **"Decision Rights"** to steer the degree of centralization and uses **"Certification"** and **"Demonstration of Competency"** as a form of authorization for different partner levels.
- **Safety:** It mentions **"Intellectual Property Rights (IPR)"** rulesets as essential for protecting partner resources. It does **not mention IEC 62443 or specific remote actuation safety interlocks** [N/A].

**Key Quote:** "IIoT platforms simultaneously act as multi-sided markets, connecting different capabilities across organizational borders... acting as middleware systems for connecting diverse industrial assets, enterprise systems, and external data sources."

---

### Analysis of Source: Formalizing ISA-95 Level 3 Control with Smart Manufacturing System Models (NIST GCR 19-022)

McGinnis, L. (2019), Formalizing ISA-95 Level 3 Control with Smart Manufacturing System Models, Grant/Contract Reports (NISTGCR), National Institute of Standards and Technology, Gaithersburg, MD, [online], https://doi.org/10.6028/NIST.GCR.19-022 (Accessed January 1, 2026)

**RQ1 (Actors & Roles):** The source provides a detailed personnel model centered around **ISA-95 Level 3 (Operations Management)** and **Level 2 (Control)**.

- **Operator:** Validated as the **"Workstation Operator,"** who may be a human performing manual drug dispensing or a pharmacist performing **"visual verification"**.
- **Integrator:** While the specific term is not used, the source identifies the **"System Owner"** (who defines performance criteria like throughput and cost) and the **"Decision-makers"** involved in **"designing, planning, managing and controlling the system"**.
- **Additional Stakeholders:** It explicitly identifies **"Academic researchers"** and **"Industrial practitioners"** as the primary users of the modeling and simulation technologies. It also mentions **"Suppliers"** and **"Retail Pharmacies"** (End Customers) as external stakeholders in the logistics chain.

**RQ2 (System Boundaries & I/O):** The source aligns with the proposed I/O categories through the **ISA-95 and DELS (Discrete Event Logistics Systems)** frameworks:

- **Inputs:** Identifies **"Customer Orders"** (consisting of StoreOrders and OrderLines), **"Information Flows"** from Level 4 (Production Plans), and **"System Feedback"** (State Changes, KPIs) from Level 2.
- **Outputs:** Identifies **"Dispatched Jobs/Tasks"** (authorizations for process execution), **"Control Signals"** sent to physical resources, and **"Visualization"** of performance metrics like **"Cycle Time vs. Throughput"**.
- **Missing Flows (Audit Logs):** It identifies the need for a **"detailed pedigree for a product"**, which functions as an audit log by recording every process step (make, move, or store) that the product underwent.
- **Missing Flows (Heartbeats/Firmware):** Not explicitly mentioned. However, it identifies **"timers"** and **"event triggers"** (like resource failure) as the mechanisms for triggering controller decision-making.

**RQ3 (Data Modeling & Standards):** The source is heavily focused on modeling standards for heterogeneous systems:

- **ISA-95:** Uses the **ISA-95 Control Hierarchy** (Levels 0–4) as the primary framework for separating business planning, operations management, and intelligent devices.
- **DELS Reference Model:** Introduces the **Discrete Event Logistics Systems (DELS)** ontology, which specifies a standardized mapping for **Product, Process, Resource, Facility, and Control**.
- **SysML (OMG SysML™):** Employed as the formal modeling language to provide a **"single source of truth"** for system definition.
- **Data Structures:** It utilizes **"Bill of Materials" (BOM)** and **"Product Segments"** to organize the manufacturing bill of materials for specific product instances.
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source does not discuss React or modern frontend grid layouts. It does, however, mention a **"Python-based GUI"** developed to simplify the specification of parameters and the assembly of computational results for researchers. It also highlights that most **COTS (Commercial Off-the-Shelf)** simulation packages have limited native capability for complex controller decision-making, requiring external code integration.

**RQ5 (OT Security & Safety):** The source focuses on safety through **regulatory compliance and control architecture**:

- **Remote Actuation Safety:** In high-volume pharmacies, **"visual verification"** is a **"regulatory requirement to ensure patient safety,"** involving imaging dispensed pills for pharmacist review.
- **RBAC/Authorization:** Defines a **"Task"** as the **"authorization for process execution"**. It suggests that the **"Plant Model"** within the controller must maintain the current state of resources to ensure tasks are only assigned to capable and available resources.
- **Operational Safety:** Mentions that move operations require **"destination interface locations to be reserved"** to avoid **deadlocks**, which is a functional safety concern in automated material handling.
- **N/A:** The source **does not explicitly cite IEC 62443** [N/A].

**Key Quote:** "Achieving smart manufacturing... requires high-quality detailed reference models for the information being exchanged... [The approach is] to use a single modeling language (OMG SysML™) to construct a standard representation of the manufacturing system that explicitly formalizes plant and control separation."

---

**Analogy for Understanding:** The system described in the sources is like a **high-stakes airport tower (The L3 Controller)**. While the **pilots (Level 2/PLCs)** handle the physical act of flying, the tower doesn't just watch; it issues **"Tasks" (Authorizations)**. If a plane (Product) needs to move to a gate (Interface Location), the tower must "elaborate" that request to ensure the path is clear and the gate is reserved, or else the entire airport faces a **deadlock**.

---

### Analysis of Source: Future SCADA challenges and the promising solution: the agent-based SCADA.pdf

Abbas, Hosny & Shaheen, Samir. (2014). Future SCADA challenges and the promising solution: the agent-based SCADA. International Journal of Critical Infrastructures. 10. 307 - 333. 10.1504/IJCIS.2014.066354. 

**RQ1 (Actors & Roles):** The source identifies **"operators"** and **"technical engineers"** as the primary human actors who manage the increasing volume of data in SCADA systems. It also refers to **"SCADA designers and developers"** as the practitioners responsible for selecting architectural styles and handling quality attributes. While the term "Integrator" is not explicitly used, the text describes the role of **"SCADA vendors"** who customize systems at the moment of purchase and thereafter. The source also mentions **"suppliers and consumers"** as stakeholders in the context of smart grids.

**RQ2 (System Boundaries & I/O):** The source describes I/O through a three-layer **"Automation Stack"** conceptual model:

- **Inputs:** Includes **"field measurements"** (temperature, level, flow, speed) and **"status data"** collected from sensor systems.
- **Commands:** Identifies **"operator-driven supervisory commands"** and **"control signals"** pushed to remote station control devices.
- **Data Flows:** Mentions **"data transportation,"** "data display," and "data retrieval".
- **Missing Flows:** The source identifies **"configuration audit"** and "reporting tasks" as specific functions for software agents. It does **not explicitly mention firmware updates or heartbeats** [N/A], though it notes "remote monitoring" as a core capability.

**RQ3 (Data Modeling & Standards):** The source proposes modeling heterogeneous devices using **"Multi-Agent Systems (MAS)"** where agents provide a "suitable abstraction" for modeling complex subsystems and their relationships.

- **Standards:** Mentions the **OPC DA protocol** and **Foundation of Intelligent and Physical Agents (FIPA)** specifications for agent platform interoperability.
- **Data Model:** Recommends the design of an **"application domain ontology"** to provide a clear, rigorous vocabulary separate from implementation.
- **Agent Communication:** Utilizes a specialized **"agent-communication language"** for social ability between entities.
- **N/A:** There is **no mention of ISA-95, MQTT Sparkplug B, or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source highlights the use of **"internet browser programs"** (e.g., Firefox, Internet Explorer) as the **Graphical User Interface (GUI)** for the operator's HMI. This allows users to access the system via **"thin clients, PDA, and mobile phones"**. However, it does **not mention React, grid layouts, or the widget pattern** [N/A].

**RQ5 (OT Security & Safety):** The source discusses security and safety in terms of both traditional and novel agent-based approaches:

- **Hard Security:** Refers to traditional mechanisms like **authentication, encryption, and access control**.
- **Soft Security:** Introduces social control mechanisms such as **"Trust" and "Reputation"** for evaluating incoming information quality.
- **Remote Actuation Safety:** Notes that failure in SCADA systems can lead to **"catastrophic consequences"** and direct loss of life. It emphasizes that SCADA enables **"operator-driven supervisory commands"** to be pushed to field devices to control local operations like opening/closing valves.
- **N/A:** The source does **not mention IEC 62443** or specific safety interlocks [N/A].

**Key Quote:** "SCADA as a critical information system faces the same challenges of current and future information systems such as dynamicity and openness of working environments, efficiency, complexity, and reliability... the agent-based approach matches future SCADA because of its unique ability to improve its quality attributes and handle its challenges."

---

**Analogy for Understanding:** Think of a **Multi-Agent SCADA system** as a **highly organized emergency response team**. Instead of one central dispatcher (Server) trying to micromanage every single medic and firefighter (Field Devices), each person is an **"Agent"** with their own **"Autonomy"** and **"Ontology"** (specialized knowledge). They communicate using a shared language to coordinate, and if one medic is busy, another "self-organizes" to fill the gap, making the whole system much more **"Robust"** and **"Scalable"** than a traditional top-down hierarchy.

---

### Analysis of Source: Research Plan (TMG) & "How to Design IIoT-Platforms Your Partners are Eager to Join"

Guggenberger, T.M., Hunke, F., Möller, F., Eimer, AC., Satzger, G., Otto, B. (2021). How to Design IIoT-Platforms Your Partners are Eager to Join: Learnings from an Emerging Ecosystem. In: Ahlemann, F., Schütte, R., Stieglitz, S. (eds) Innovation Through Information Systems. WI 2021. Lecture Notes in Information Systems and Organisation, vol 48. Springer, Cham. https://doi.org/10.1007/978-3-030-86800-0_34

**RQ1 (Actors & Roles):** The research plan defines four core roles: **System Administrator** (infrastructure/security), **Device Integrator** (onboarding/data modeling), **Operator** (monitoring/commands), and **The Device** itself as an autonomous actor. The IIoT platform study validates and expands this list, identifying the **Platform Owner** (mediator/infrastructure provider), the **Machine Manufacturer** (partner to the owner), the **Complementor** (third-party software company providing apps), and the **Customer** (manufacturing company using the platform). The study also mentions specialized roles involved in platform development and use, such as **Data Scientists** and **Industry 4.0 Experts**.

**RQ2 (System Boundaries & I/O):** The research plan identifies **telemetry, external data, and commands** as inputs, with **visualization, notifications, and control signals** as outputs. The IIoT platform study aligns with these categories:

- **Inputs/Functions:** It highlights the need for **real-time data** such as machine utilization, material consumption, and current machine programs. It also specifies **"rich data"** as a requirement for complementors to build individualized products.
- **Missing Flows:** While the research plan specifically seeks to validate flows like **Audit Logs, Firmware Updates, and Heartbeats**, the IIoT study identifies **"transactional exchange"** and **"cloud-services"** (storage and integration) as critical functional requirements (DP2).
- **Outputs:** It emphasizes the provision of **APIs and documentation** as "boundary resources" to enable third-party contributions.

**RQ3 (Data Modeling & Standards):** The research plan acknowledges the challenge of modeling heterogeneous devices (from PLCs to ESP32s) and mentions **MQTT Sparkplug B** and **DTDL** as potential standards. The IIoT study confirms that **technical diversity** and **heterogeneity** of legacy machinery are primary obstacles to connectivity. To address this, it proposes **Design Principle 1 (Low Entry Barriers)**, which mandates using **commonly used technological standards and interfaces** (KR1) to allow actors to integrate quickly without adopting entirely new technologies.

**RQ4 (Dashboard Architecture):** The research plan focuses on a **"Drag-and-Drop"** dashboard system using **React Grid Layout** and the **Widget Pattern**. The IIoT study supports the _need_ for this flexibility through **Design Principle 5 (Customizable Solutions)**, stating platforms should offer **highly individualized** products and services to meet diverse business needs. It mentions that current applications provide real-time overviews of machine utilization, but it does not provide specific frontend implementation details like React or grid-based persistence [N/A].

**RQ5 (OT Security & Safety):** The research plan prioritizes **Remote Actuation** safety and **RBAC**. The IIoT study addresses this through **Design Principle 3 (Trusted Collaboration)**, which requires the platform to ensure **secure exchanges** between actors to build the necessary trust to join the ecosystem (KR6). It defines the platform as a tool to make physical resources **controllable and optimizable** via a network layer. Additionally, it suggests that **active ecosystem management** and **governance mechanisms** are necessary to manage the tensions and risks inherent in industrial co-creation.

**Key Quote:** "The design of IIoT-platforms is directly correlated to such systems’ efficiency and effectiveness... providing commonly used technological standards and interfaces so that the actors can integrate quickly, rather than having to adopt new technologies."

---

**Analogy for Understanding:** The **IIoT Platform** is like a **Standardized Shopping Mall (The Platform)**. The **Integrators and Complementors** are the **Store Owners** who need "low entry barriers" (standardized storefront sizes/utilities) to set up their shops (Applications). The **Operator/Customer** is the **Shopper** who needs a "customizable experience" to find what they need. Without **"Trusted Collaboration" (Security/Governance)**, the store owners won't stock their best goods, and the shoppers won't feel safe entering the building.

---

### Analysis of Source: Research Plan (TMG) & ISA-95 Common Object Model

OPC Foundation. (2013, October 30). OPC 10030: ISA-95 common object model (Release 1.00). https://reference.opcfoundation.org/ISA-95/v100/docs/8

**RQ1 (Actors & Roles):** The sources provide a detailed mapping of personnel and organizational roles.

- **Proposed Roles:** The research plan defines four core actors: **System Administrator** (infrastructure), **Device Integrator** (onboarding/dashboard design), **Operator** (monitoring/commands), and **The Device** (autonomous agent).
- **ISA-95 Personnel Model:** ISA-95 validates the **"Operator"** as a specific Person Type and emphasizes that roles are associated with **"PersonnelClasses"**.
- **Certifications:** A critical addition from ISA-95 is that roles may require **"specific training or certification"** or "qualification tests" to demonstrate competency for specific operations.
- **Integrator Hint:** ISA-95 notes that a **"system integrator"** may act as the **Vendor** providing a specific physical asset, even if they didn't manufacture it.

**RQ2 (System Boundaries & I/O):** The research plan's I/O list is expanded by the ISA-95 functional requirements:

- **Inputs:** Validates **telemetry** (high-frequency time-series data) and **external data**. ISA-95 adds **"Qualification Test Results"** for personnel and **"Capability Test Results"** for equipment as critical inputs.
- **Outputs:** Includes **visualization, notifications, and control signals**. ISA-95 emphasizes **"Historical storage"** (Historizing) of these variables to ensure prior results are available for audit and analysis.
- **Missing Flows:** ISA-95 explicitly tracks **"Asset Assignment"** history—recording which physical device was assigned to which logical equipment over time.

**RQ3 (Data Modeling & Standards (ISA-95 Focus)):** ISA-95 provides a comprehensive framework for modeling heterogeneous assets, which addresses the "Device Schema" assumption in the research plan.

- **Abstraction Layer:** It distinguishes between **"Logical Equipment"** (the function/role in the system) and **"Physical Assets"** (the actual hardware). A logical meter remains the same in the system even if the physical hardware is replaced.
- **Class/Type Hierarchy:** Assets are modeled through a hierarchy: **EquipmentClassType** (general functionality) $\rightarrow$ **EquipmentType** (logical definition) $\rightarrow$ **PhysicalAssetType** (specific hardware with serial numbers).
- **Material Modeling:** It includes a **"Material Information Model"** to track Material Classes (e.g., "stainless steel"), Definitions (e.g., "Ajax Steel wire"), and Lots/Sublots for tracking specific batches.
- **N/A:** The source does **not mention MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The research plan identifies a gap in implementing **"Drag-and-Drop" dashboards** using **React Grid Layout** and the **Widget Pattern**. ISA-95 does not provide frontend code but recommends **naming conventions** for test results and specifications so that **"operators can more easily match"** data on their interfaces.

**RQ5 (OT Security & Safety):** Security and safety are handled through competency and asset tracking:

- **Safe Actuation:** ISA-95 uses **"QualificationTestSpecification"** to ensure a person has the "correct training and/or experience for specific operations," functioning as a human-centric layer of RBAC.
- **Identification:** It tracks **"FixedAssetId"** (serial numbers) and **"VendorId"** to ensure the hardware's pedigree is known.
- **Hierarchy-Based Control:** It utilizes an **"EquipmentLevel"** enumeration to identify the asset's position within the role-based hierarchy, which can inform access control depth.

**Key Quote:** "The ISA-95 Equipment Model is an abstract model that describes classes of logical equipment. The physical equipment is defined by physical assets. In the ISA-95 model, a logical device (equipment) usually does not change, but a physical device may change over time."

---

**Analogy for Understanding:** Think of the ISA-95 model as a **Professional Sports Team**. The **"Logical Equipment"** is the **Position** (e.g., "Quarterback"). The **"Physical Asset"** is the **Specific Player** (e.g., "Player #12"). The team's strategy (The System) stays the same regardless of which player is wearing the jersey. To ensure safety and performance, the player must pass a **"Qualification Test"** (a physical or tryout) to prove they are capable of performing the **"Role"** associated with that position.

---

# Analysis of Source: IEC 62443-4-1_2018, Part 4-1, 1_0, 2018.pdf

This analysis examines the IEC 62443-4-1 standard, focusing on requirements for the secure development lifecycle of Industrial Automation and Control Systems (IACS) products.

--------------------------------------------------------------------------------

#### RQ1: Analysis of Actors and Roles

The IEC 62443-4-1 standard defines several key roles to support a clear separation of duties across the product life-cycle. As illustrated in _Figure 2 – Example scope of product life-cycle_, the standard explicitly distinguishes between the **Asset Owner**, who _Operates_ the final system, and the **System Integrator**, who _Integrates_ components into a solution.

Key roles defined within the standard include:

- **System Integrator:** Defined in section 3.1.34 as a "person or company that specializes in bringing together component subsystems into a whole and ensuring that those subsystems perform in accordance with project specifications."
- **Product Users:** A broad category defined in section 3.1.25 as "users of the hardware and/or software product including asset owners, integrators and maintenance personnel, vendors of other components or products that reuse or contain this product." This definition confirms that **maintenance personnel** are considered critical stakeholders.
- **Administrator:** Defined in section 3.1.4 as a "user who has been authorized to manage security policies/capabilities for a product or system."

#### RQ2: System Boundaries and Data I/O

The primary focus of IEC 62443-4-1 is on the _processes_ for secure product development, not on the specific operational data flows (e.g., Telemetry, Commands) of a running system.

However, the standard mandates the protection of critical data assets fundamental to system security. The supplemental guidance for section 7.2.2 (SD-1) emphasizes the need to comprehensively identify and secure assets, providing a sample list of data assets and resources requiring protection:

- databases and database tables
- configuration files
- cryptographic key stores
- access control lists (ACLs)
- registry keys
- web pages (static and dynamic)
- audit logs
- network sockets / network media
- inter-process communications (IPC), services and remote procedure call (RPC) resources
- any other files and directories
- any other memory resource

#### RQ3: Data Modeling and Standards

N/A

#### RQ4: Dashboard Architecture

N/A

#### RQ5: OT Security and Safety Principles

The IEC 62443-4-1 standard establishes a foundational framework for secure product development that is essential for ensuring the safety of remote actuation. The overarching philosophy is **"Secure by design"** (Practice 3), which embeds security into every phase of the product lifecycle. This philosophy is implemented through tactical principles like **"Defense in depth"** (SD-2), which layers security mechanisms to prevent a single point of failure, and adherence to **"Secure design best practices"** (SD-4). A core tenet of these practices is the principle of **"least privilege"**, which minimizes the potential damage a compromised component or unauthorized user can cause by granting only the minimum permissions necessary for a function. To prevent unauthorized control, the standard's account management guidelines (SG-6) mandate the clear definition of the components that form the basis of a Role-Based Access Control (RBAC) system. Specifically, section 12.7 requires product documentation to define "user account permissions (access control) and privileges (user rights)" for secure operation.

--------------------------------------------------------------------------------

"[This part of IEC 62443 specifies process requirements for the secure development of products used in industrial automation and control systems.]"

---

### Analysis of Source: Model of IoT design decision-making processes in Flow Based Programming systems.pdf


Orłowski, C., & Adrych, M. (2024). Model of IoT design decision-making processes in Flow Based Programming systems. _Journal of Information and Telecommunication_, _8_(3), 315–324. https://doi.org/10.1080/24751839.2023.2286765

**RQ1 (Actors & Roles):** The source defines a "parallel design environment" where **partners** share common and individual tasks. In this model, an individual partner can act as a **"programmer"** while simultaneously being **"responsible for the delivery of the system"**. The source also emphasizes identifying the relationships between the **"designer"** and the **"supplier"**. While it mentions that Flow Based Programming (FBP) connects **"objects and people,"** it does not explicitly use the terms "Integrator" or "Operator" as defined in the research plan [12, N/A].

**RQ2 (System Boundaries & I/O):** The source outlines a functional paradigm of **"RECEIVE THE DATA → PROCESS THIS DATA → FORWARD THE DATA"**.

- **Inputs:** Identifies data acquisition from **APIs**, **incoming HTTP requests**, **text messages**, and changes in a **file system**.
- **Data Flows:** Details the use of an **MQTT broker** with specific **"publishers and subscribers"**. It also mentions using **RabbitMQ (task_queue)** to process data locally or in the cloud.
- **Outputs:** Includes storing data in a **PostgreSQL database**, as well as transmission to **websites** and **mobile applications**.
- **Missing Flows:** The source mentions **"debug nodes"** for monitoring, but there is no explicit mention of Audit Logs, Firmware Updates, or Heartbeats [30, N/A].

**RQ3 (Data Modeling & Standards):** The source focuses on the modeling of **heterogeneously connected resources**, including processor cores and hardware accelerators.

- **Protocols & Standards:** It confirms the use of the **MQTT** protocol and **JSON** for receiving processed data.
- **Storage:** It specifically validates the use of **PostgreSQL** for storing dynamic data.
- **Standardization:** It advocates for the **"standardization of the software development process and infrastructure construction"** to be used by project teams.
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source identifies **Node-RED** as a primary environment for **"industry 4.0 dashboard design"**.

- **UI Patterns:** It confirms the **"DRAG AND DROP method"** for connecting hardware devices and APIs.
- **Visualization:** It notes that FBP allows for the **visualizing of system architecture**, which combines design and implementation.
- **N/A:** The source does **not mention React, React Grid Layout, or the specific "Widget Pattern"** referenced in the research plan [N/A].

**RQ5 (OT Security & Safety):** The source discusses security primarily through **infrastructure isolation**.

- **Mechanism:** It utilizes **Docker** to separate applications from the infrastructure by installing software in **isolated containers**.
- **Configuration:** Examples provided include basic credential management (e.g., setting a `PGADMIN_DEFAULT_PASSWORD`) within a **docker-compose** file.
- **N/A:** The source does **not mention RBAC, remote actuation safety interlocks, IEC 62443, or NIST 800-82** [N/A].

**Key Quote:** "The use of Flow-based Programming primarily contributes to improving the work of programmers in creating and modelling the structure of the application... [it] allows for a combination of the system design and implementation process."

---

### Analysis of Source: Model-based Approach to the Development of SCADA applications.pdf

B. Atlagic, M. Sagi, D. Milinkov, B. Bogovac and S. Culaja, "Model-based approach to the development of SCADA applications," 2012 IEEE 19th International Conference and Workshops on Engineering of Computer-Based Systems, Novi Sad, Serbia, 2012, pp. 308-315, doi: 10.1109/ecbs.2012.6487435. keywords: {Process control;Control systems;Industrial plants;SCADA systems;Computer architecture;Real-time systems;Object oriented modeling;Unified modeling language;IEC Standards;Computational modeling;SCADA;control application;S88 batch control;IEC 61131-3},


**RQ1 (Actors & Roles):** The source validates the separation between the system's creator and its user by distinguishing between the **"application designer"** (or developer) and the **"system operator"**.

- **Integrator/Builder:** Referred to as the **"SCADA application designer"** or **"design engineer,"** this role is responsible for HW design, SW design (control and GUI procedures), and configuring the IO model.
- **Operator/User:** Referred to as the **"human operator"** or **"system operator,"** who is involved in the "chain of action" and maintains visual and manual control over running recipes, including the ability to hold, abort, or restart operations.
- **Missing Stakeholders:** The source identifies roles associated with **"Business IS"** and **"Management IS"** (Information Systems), implying stakeholders interested in high-level decision support and material reports.

**RQ2 (System Boundaries & I/O):** The source describes a functional hierarchy that aligns with several proposed categories:

- **Inputs:** Validates **IO signals** and **process variables** (Telemetry) collected from field devices. It also mentions **"user supplied recipes"** as a form of configuration input that defines operations and parameters.
- **Outputs:** Includes **"Control signals"** (commands) propagated to field devices for execution and **"technical diagrams"** for visualization.
- **Missing Flows:** The source identifies **"Event generation"** and **"Material reports"** (which function as data pedigree/audit logs). It also mentions a **"Time Manager"** and **"Data Synchronization"** for reliability.
- **N/A:** There is **no explicit mention of firmware updates or heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** The source is heavily centered on two international standards for modeling heterogeneous industrial plants:

- **ISA-S88 (Batch Control):** Used as the fundamental model for defining a physical hierarchy: **Process Cell → Unit → Equipment Module → Control Module**.
- **IEC 61131-3:** Specifically uses **SFC (Sequential Function Charts)** to model the internal structure of control operations as state machines (steps and transitions).
- **Naming/Schema:** Uses **"Catalogs"** to define metadata for digital devices (e.g., states and commands) and **"Process Variables"** to represent physical components.
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The GUI development process focuses on specialized tools rather than modern web frameworks:

- **UI Patterns:** Mentions the definition of **"technical diagrams forms"** and the programming of **"user dialogs"** (specifically citing **C#**).
- **N/A:** The source does **not mention React, React Grid Layout, the Widget Pattern, or component serialization** [N/A].

**RQ5 (OT Security & Safety):** Security is mentioned in the context of system reliability, but specific protocols are limited:

- **Remote Actuation Safety:** Emphasizes that the system operator has **"manual control"** to **"Hold, Abort, or Restart"** a recipe during execution. It also mentions using a **"simulator"** to verify control code before final installation to prevent malfunctions.
- **N/A:** There is **no mention of RBAC, IEC 62443, or specific command authentication protocols** [N/A].

**Key Quote:** "SFC, as a domain specific programming language, provides communication between the people of different backgrounds, skills and rolls [roles] in a control project."

---

**Analogy for Understanding:** The methodology in this source treats a manufacturing plant like a **Theater Production**. The **ISA-S88 Physical Model** defines the **Stage and Props** (Equipment and Units). The **IEC 61131-3 SFC** is the **Script** (the sequence of steps). The **Integrator** is the **Director/Set Designer** who configures the stage and writes the script, while the **Operator** is the **Stage Manager** who watches the live performance and can "stop the show" if something goes wrong.

---

### Analysis of Source: Ontology-based multi-source heterogeneous O&M data integration framework for tunnel structural health assessment

 Longxiang Liu , Peng An , Zhengru Ren , Ru An , Jiarui Lin , Yutao Guo
& Zhen-Zhong Hu (22 Jun 2025): Ontology-based multi-source heterogeneous O&M data
integration framework for tunnel structural health assessment, Structure and Infrastructure
Engineering, DOI: 10.1080/15732479.2025.2521016

**RQ1 (Actors & Roles):** The source identifies **"O&M personnel"** as the primary users who input natural language requirements and natural language statements into the platform to develop application-specific ontologies. It also mentions **"domain experts"** and **"relevant tunnel experts and engineers"** who are involved in defining indicator threshold intervals and consulting on the weight of monitoring indicators using the AHP method. The source does not explicitly use the terms "Integrator" or "Operator" as defined in the research plan [N/A].

**RQ2 (System Boundaries & I/O):** The system is structured as a four-layer framework (data, ontology, mapping, and application) for health assessment.

- **Inputs:** High-frequency **monitoring data** (telemetry) includes **peripheral displacement, tunnel settlement, crack width, stress, and strain**. It also ingests **BIM data** (.ifc), **GIS data**, **text data** (inspection reports/maintenance logs), and **image data** (inspection pictures/surveillance videos).
- **Outputs:** The system produces **structural health assessment values** (quantifiable health indices), **structural health grades** (Grades 1-5), and recommended **maintenance strategies**.
- **Data Flows:** Employs **SPARQL** Protocol and RDF Query Language for extracting data instances from the integrated model.
- **Missing Flows:** The source does not explicitly mention "Audit Logs," "Firmware Updates," or "Heartbeats" [N/A].

**RQ3 (Data Modeling & Standards):** The framework is built on **Semantic Web technologies** to model heterogeneous assets.

- **Standards:** It utilizes the **SSN (Semantic Sensor Network)** and **SOSA (Sensor, Observation, Sample, and Actuator)** ontologies for monitoring data. It uses **ifcOWL** for BIM data and **CityGML** for GIS data.
- **Data Format:** Data is represented using **Resource Description Framework (RDF)** and **Web Ontology Language (OWL)**.
- **Storage:** Relational databases such as **PostgreSQL, MySQL, and SQL Server** are used for metadata, while file systems store raw images and videos.
- **N/A:** The source does **not mention MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source describes a **"tunnel multi-source heterogeneous O&M data management platform"**.

- **Visualization:** It features 3D visualizations for the **"Overall Tunnel"** and detailed **"Tunnel Cross-Section and Segment"** views to display health grades [Fig 12].
- **N/A:** There is **no mention of React, React Grid Layout, or the "Widget Pattern"** [N/A].

**RQ5 (OT Security & Safety):** Safety is handled through automated assessment and alerting rather than traditional OT security protocols.

- **Safety Interlocks:** The framework establishes an **"automated alert module"** that triggers maintenance recommendations when specific indicators exceed expert-defined threshold limits.
- **Operational Safety:** For Grade 5 (Dangerous condition) assessments, the system mandates a **"maintenance strategy"** of **promptly closing the tunnel** for emergency intervention.
- **Reasoning:** Uses **SWRL (Semantic Web Rule Language)** and the **Drools** reasoning engine to automatically infer health grades and maintenance needs.
- **N/A:** The source **does not mention RBAC, IEC 62443, or NIST 800-82** [N/A].

**Key Quote:** "The framework consists of four layers: data layer, ontology layer, mapping layer, and application layer, enabling the unified modeling, integration, and comprehensive application of multi-source heterogeneous tunnel O&M data."

---

### Analysis of Source: RTGDC: a real-time ingestion and processing approach in geospatial data cube for digital twin of earth

Ruixiang Liu, Peng Yue, Boyi Shangguan, Jianya Gong, Longgang Xiang
& Binbin Lu (2024) RTGDC: a real-time ingestion and processing approach in geospatial
data cube for digital twin of earth, International Journal of Digital Earth, 17:1, 2365386, DOI:
10.1080/17538947.2024.2365386

**RQ1 (Actors & Roles):** The source defines roles primarily through a communication and data delivery lens rather than industrial personnel hierarchies.

- **Publisher:** The party responsible for publishing information/observations to specific topics.
- **Subscriber:** The party interested in the information, who initiates a subscription and consumes data for analysis.
- **User:** Identified as the actor who operates real-time data ingestion and utilizes the processing engine for tasks like spatiotemporal analysis.
- **N/A:** The source does **not explicitly mention "Integrator" or "Operator"** as defined in the research plan, nor does it mention "Maintenance Engineers" or "Data Analysts" [N/A].

**RQ2 (System Boundaries & I/O):** The system acts as a real-time ingestion and processing engine for a "Digital Twin of Earth."

- **Inputs:** Ingests **"Real-time observation streams"**. Specific data includes **raster data** (e.g., GeoTIFF, NetCDF) and **vector data**. Examples of telemetry include **precipitation, temperature, wind speed, and relative humidity**.
- **Outputs:** Generates **"real-time results"**, **"visualizations"** (raster and vector), and **"analytical results"** used for simulation and emulation.
- **Data Flows:** Utilizes a **"Pub/Sub model"** for asynchronous delivery. It uses **HTTP** and **MQTT** for message exchange.
- **Missing Flows:** While it focuses on continuous observation streams, it does **not mention Audit Logs, Firmware Updates, or Heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** The source emphasizes interoperability through established geospatial and IoT standards.

- **Standards:** Built on the **OGC SensorThings API** and **OGC Pub/Sub interface**. It also utilizes **ISO 19156** (Observations and Measurements) and **COG (Cloud Optimized GeoTIFF)** for raster organization.
- **Modeling Approach:** Defines a multidimensional structure with four primary dimensions: **Spatial, Temporal, Sensor, and Observation**.
- **Data Structure:** The **"ObservationCell"** is defined as the smallest entity and fundamental building block of the cube.
- **Storage:** Mentions using **PostgreSQL** for metadata and **columnar storage** (like HBase or GeoParquet) for vector data.
- **N/A:** There is **no mention of MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source discusses a prototype web system but uses different technical stacks than those proposed in the research plan.

- **Visualization Engine:** Employs **CesiumJS** (an open-source JavaScript library) for 3D visualization of raster and vector data.
- **UI Features:** Includes a **web system** for interactive access where users can trigger real-time computation and spatiotemporal analysis.
- **N/A:** The source does **not mention React, React Grid Layout, the Widget Pattern, or component serialization** [N/A].

**RQ5 (OT Security & Safety):** Security and safety mechanisms are not a primary focus of this paper.

- **Access Control:** Briefly mentions that users can perform tasks **"based on permissions"** within the web system interface, but it does not detail the underlying protocol.
- **N/A:** There is **no mention of RBAC, Remote Actuation safety, IEC 62443, or NIST 800-82** [N/A].

**Key Quote:** "In RTGDC, using cube cells as the fundamental building blocks and harnessing the strengths of multidimensional data modeling and the robust analytical capabilities of OLAP, it becomes possible to conduct real-time, multiscale spatiotemporal analysis of data within the Digital Twin of Earth."

---

**Analogy for Understanding:** The **RTGDC** system is like a **Real-Time Newsroom (The Data Cube)**. Instead of waiting for the morning paper to be printed in a batch (The traditional GDC), reporters (Sensors) send in live feeds as **"ObservationStreams."** The newsroom organizes these feeds into specific sections like **Location (Spatial)** and **Time (Temporal)**. An editor (The Processing Engine) uses **"Micro-batches"** to quickly verify and publish the news to digital screens (Visualizations) in less than a second, ensuring the audience sees the world exactly as it is happening.

---

### Analysis of Source: SCADA Applications for Electric Power System (Enescu & Bizon, 2017)

Enescu, F.M., Bizon, N. (2017). SCADA Applications for Electric Power System. In: Mahdavi Tabatabaei, N., Jafari Aghbolaghi, A., Bizon, N., Blaabjerg, F. (eds) Reactive Power Control in AC Power Systems. Power Systems. Springer, Cham. https://doi.org/10.1007/978-3-319-51118-4_15

**RQ1 (Actors & Roles):** The source identifies the **"human operator"** (or dispatcher) as the central role responsible for monitoring parameters and issuing **"manual commands"** based on processed data. It also identifies organizational stakeholders such as the **"Director," "Technical Director," and "Dispatcher Leader"**. While the specific term "Integrator" is not used, the text describes the **"application designer"** or user who creates projects, configures **"variable tags,"** and sets user **"rights"** and access levels. The source also mentions roles for **"Maintenance"** and **"Economic Planning"** within the enterprise hierarchy.

**RQ2 (System Boundaries & I/O):** The system is defined as a multi-layered structure involving bidirectional information flows between remote and central units.

- **Inputs:** Includes **"telemetry"** (analog and digital signals from sensors/transducers), **"Meteo station"** data, and **"User supplied recipes"** or programs for plant operation.
- **Outputs:** Includes **"Control signals"** (closing valves, starting motors), **"Visualization"** (real-time gauges, trends, historical graphs), and **"Notifications"** (alarms via email or lists).
- **Data Flows:** Identifies **"Historical storage"** and **"Asset Assignment"** history as endpoints in a distributed database.
- **Missing Flows:** It explicitly tracks **"Damage registration"** and **"sequential recording"**. It does **not explicitly mention firmware updates or heartbeats** [N/A], though it notes "monitoring of service continuity".

**RQ3 (Data Modeling & Standards):** The source highlights the use of a **"distributed database"** where hardware and software items are modeled as **"endpoints"**.

- **Standards:** Identifies **OPC (Open Platform Communications)** as the primary gateway for interoperability between diverse PLC manufacturers and SCADA servers. It also cites **MODBUS (RTU/TCP)**, **IEC 60870-5-101/104**, **IEC 61850**, and **DLMS** for energy metering.
- **Modeling:** The **"Equipment level"** hierarchy is used to identify assets within the station.
- **N/A:** The source **does not mention ISA-95, MQTT Sparkplug B, or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source describes using **"Vijeo Citect"** and **"iFix"** for GUI development.

- **UI Patterns:** Mentions **"libraries with symbols"** and **"Genies/Super Genies"** (standardized graphical objects) to achieve configuration.
- **Web Integration:** Discusses **"Web SCADA"** clients that access **"dynamic Web pages"** via an **"Internet browser"**, though they have fewer HMI features than regular clients.
- **N/A:** It does **not mention React, React Grid Layout, or the specific "Widget Pattern"** [N/A].

**RQ5 (OT Security & Safety):** Security is addressed through both physical architecture and software permissions.

- **RBAC:** The system allows for **"setting application users"** and **"setting their rights"** based on priority levels.
- **Safety:** Identifies the **"interlock of primary equipment"** as a core function to prevent unsafe operations. It also emphasizes that dispatchers can perform **"manual maneuvers"** to control turbine valves or grid breakers in response to demand or hazards.
- **Cybersecurity:** Discusses **"Cyber security risk assessment"** (mentioning Stuxnet) and the use of **"Firewalls"** and **"physical separation"** of LANs to protect the SCADA network.
- **N/A:** The source **does not explicitly cite IEC 62443 or NIST 800-82** [N/A].

**Key Quote:** "The record of each endpoint, including its dynamic, is stored in the database to have the history of all endpoints. This will help in predictive maintenance and the security of the EPS as well."

---

**Analogy for Understanding:** A SCADA system in this context is like a **Regional Traffic Control Center**. The **"Sensors" (Inputs)** are the cameras and road sensors providing real-time telemetry. The **"Dispatcher" (Operator)** uses a **"Dashboard" (HMI)** to see the big picture. If a crash occurs, they use **"Interlocks" (Safety)** to prevent more cars from entering the lane and issue **"Commands" (Outputs)** to change the digital signs. The **"Integrator"** is the engineer who programmed the signs and mapped every camera's **"Endpoint"** into the central database.

---

### Analysis of Source: Security gaps assessment of smart grid based SCADA systems.pdf

Mir AW, Ketti Ramachandran R (2019), "Security gaps assessment of smart grid based SCADA systems". _Information and Computer Security_, Vol. 27 No. 3 pp. 434–452, doi: [https://doi.org/10.1108/ICS-12-2018-0146](https://doi.org/10.1108/ICS-12-2018-0146)

**RQ1 (Actors & Roles):** The source defines several organizational and technical roles centered around security governance and system operation:

- **Single Point of Accountability (SPoA):** A member of the **senior management team** with ultimate responsibility for SCADA/DCS security.
- **System Owner:** Responsible for approving exceptions to security standards and authorizing changes.
- **System Users:** Personnel who operate the system and should be included in risk assessment processes.
- **Operational and Support Staff:** Individuals who require baseline training to report suspected security risks or incidents.
- **Third Parties/Vendors:** External entities providing **remote support services** or equipment; they must provide assurance of their own security management.
- **N/A:** The source does **not explicitly use the term "Integrator"** as defined in the research plan, nor does it mention "Maintenance Engineers" or "Data Analysts" [N/A].

**RQ2 (System Boundaries & I/O):** The source outlines a typical SCADA architecture with specific data flows:

- **Inputs:** Information from **sensors and actuators** is collected by **Remote Terminal Units (RTUs)** and relayed to a **Master Terminal Unit (MTU)**.
- **Processing & Storage:** Data is processed by **Data Acquisition Servers** and stored in a **Historian** database for future analysis.
- **Outputs:** **"Commands"** (transmission and execution) are sent back to physical components. The **HMI (Human-Machine Interface)** provides **"alarms"** and monitoring for control operations.
- **Missing Flows:** The source emphasizes **"Internal compliance audits"** and **"Backup and recovery"**. While it mentions **"Patch management"**, it does **not explicitly mention "Heartbeats" or "Firmware updates"** [N/A].

**RQ3 (Data Modeling & Standards):** Interoperability and modeling are addressed through security frameworks rather than communication schemas:

- **Security Standards:** The assessment is based on a superset of frameworks including **NIST SP 800-53, ISA 62443, ISO/IEC 27001, and COBIT 5**.
- **Asset Management:** Requires an **"inventory of all SCADA/DCS system assets"** maintained in a standard format.
- **N/A:** The source **does not mention ISA-95, MQTT Sparkplug B, or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source describes the use of an **HMI** for monitoring and control operations.

- **N/A:** There is **no mention of React, React Grid Layout, the Widget Pattern, or "Drag-and-Drop"** functionality [N/A].

**RQ5 (OT Security & Safety):** This source provides extensive detail on security and safety requirements:

- **Remote Actuation Safety:** Identifies **"unauthorized control/operation (via remote access)"** as a critical threat scenario. It states that the timely execution of commands is vital, as failure can lead to **"safety compromise"** or service shutdowns.
- **RBAC & User Access:** Mandates the **"principles of least privilege"**. User access must be limited to necessary functionality and revoked promptly if a role changes or is terminated.
- **Network Security:** Requires **"electronic and physical security perimeters"**. SCADA networks must be segregated from corporate networks using at least a **"three-tier architecture"** with a **DMZ**.
- **Standards:** Explicitly references the **NIST Cybersecurity Framework** and **ISA 62443** for gap assessment.

**Key Quote:** "The consequences of overlooking the threats or applying the insufficient controls may have consequences involving loss of life, reputation as well as financial losses."

---

**Analogy for Understanding:** This source treats a SCADA system like a **National Vault**. The **SPoA (The Warden)** oversees the entire security policy. To get in, you need to pass through **Perimeters (The DMZ/Firewalls)**. Once inside, you are only allowed to touch specific items based on **Least Privilege (RBAC)**. Every action you take is recorded by the **Historian (The Security Camera)**, and if you try to perform a **Remote Actuation (Remote Entry)** without authorization, the system is designed to trigger **Alarms** and **Incident Response** to prevent a "national-level disaster."

---

### Analysis of Source: Towards the IIoT Ecosystem Development - Understanding the Stakeholder Perspective

Petrik, Dimitri and Herzwurm, Georg, "Towards the iIoT Ecosystem Development - Understanding the Stakeholder Perspective" (2020). _In Proceedings of the 28th European Conference on Information Systems (ECIS)_, An Online AIS Conference, June 15-17, 2020.  
https://aisel.aisnet.org/ecis2020_rp/74

**RQ1 (Actors & Roles):** The source provides an extensive expansion of the stakeholder landscape, identifying **seven key stakeholder types** in the IIoT ecosystem: **Machine tool companies**, **component providers** (tool/end effector suppliers), **automation companies**, **retrofit companies**, **software developing companies**, **data analytics companies**, and the **machine operating end customers**.

- **Integrator vs. Operator:** While the research plan defines the "Integrator" as the builder, this source identifies **"systems-integrating companies"** as a specific category of partners. It notes that **machine tool companies** often act as the "intermediate provider" because they decide which platform to connect to the machine.
- **The End Customer:** A critical missing stakeholder identified is the **"machine operating end customer"** who may hold a "power position" to dictate which platform is used.
- **The Complementor:** The source introduces the concept of **"complementors"** (third-party participants) who create value by developing modular complements or services on the platform.

**RQ2 (System Boundaries & I/O):** The system is described as a **digital infrastructure** that fosters connectivity across company boundaries.

- **Inputs:** Focuses on the **"extraction of machine data"** and **"sensor data"** from the field level (telemetry). It also mentions the ingestion of **"natural language requirements"** from personnel during the design of ecosystem mechanisms.
- **Outputs:** Includes **"digital value-added services"** such as **"data-driven maintenance"**.
- **Boundary Resources (BR):** The source identifies **APIs, documentation, agreements, SDKs, and supported libraries** as the essential "interfaces" that allow external actors to interact with the platform.
- **N/A:** The source does **not explicitly mention firmware updates or heartbeats** as specific data flows [N/A].

**RQ3 (Data Modeling & Standards):** The source emphasizes the need for **common standards and interfaces** to support heterogeneous hardware and software.

- **Standards:** Mentions the use of specific industrial platforms like **Siemens MindSphere, PTC Thingworx, GE Predix, and SAP Leonardo**.
- **Interoperability:** It highlights that "top IT" help is often needed for **"integration issues"** caused by the variety of existing fieldbus protocols and controllers.
- **N/A:** There is **no mention of MQTT Sparkplug B, DTDL, or ISA-95** [N/A].

**RQ4 (Dashboard Architecture):** The source discusses the importance of visualization but focuses on the "provider" perspective of these tools.

- **UI Patterns:** It mentions the existence of **"dashboard makers"** and the need for **"data visualization knowledge"** as a core competency for data analytics providers.
- **Tailored UI:** It argues that **Boundary Resources** (like developer portals) should not be "one size fits all" and should instead provide different information for software developers versus mechanical engineers.
- **N/A:** The source does **not mention React, React Grid Layout, or the Widget Pattern** [N/A].

**RQ5 (OT Security & Safety):** Security is addressed through **governance** and the management of relationships.

- **Governance:** The platform provider uses **Boundary Resources** (software tools and regulations) to establish an "arm’s-length relationship" with developers.
- **Lock-in Effects:** By providing high-quality technical resources, the platform creates **"lock-in effects"** for technical experts, which ensures the stability and security of the ecosystem.
- **N/A:** The source **does not mention RBAC, Remote Actuation safety, or IEC 62443** [N/A].

**Key Quote:** "Most market-ready IIoT platforms... have rather low entry barriers and offer resources to third-parties... it is crucial to complete these rather technological platform definitions with the aligning organizational aspects."

---

**Analogy for Understanding:** An IIoT platform is like a **Smartphone App Store for Factories**. The **Platform Provider** (e.g., Apple/Google) provides the **Boundary Resources** (the SDKs and Store Rules). The **Machine Tool Companies and Component Providers** are like the **App Developers** who build specialized tools (Maintenance Apps). Without a clear understanding of who these developers are (Stakeholder Analysis), the Store Owner might provide tools that are too complex for a mechanical engineer but too simple for a software developer, causing the "Ecosystem" to fail.

---

### Analysis of Source: The challenges of using live-streamed data in a predictive digital twin.pdf

Ward, R., Choudary, R., Jans Singh, M., Roumpani, F., Lazauskas, T., Yong, M., … Hauru, M. (2023). The challenges of using live-streamed data in a predictive digital twin. _Journal of Building Performance Simulation_, _16_(5), 609–630. https://doi.org/10.1080/19401493.2023.2187463

**RQ1 (Actors & Roles):** The source identifies a diverse team required for digital twin operation: **System Operators** (end-users), **Facility Managers** (maintaining hardware), **Software Engineers** (platform development), and **Engineering Researchers**. It also notes that different stakeholders, such as the **Business Team**, require data at different frequencies and resolutions compared to operators. While the "Integrator" role is not used, the source describes a development team involving **software specialists** and **researchers** who build the communication infrastructure and models.

**RQ2 (System Boundaries & I/O):** The system (CROP) utilizes a defined set of data flows:

- **Inputs:** High-frequency **telemetry** (temperature, relative humidity, PAR, CO2, air velocity, and energy meters). It also ingests **External Data** via the Meteomatics API (weather data) and Stark/Zensie APIs. **Crop growth data** (categorical and numeric) is also included.
- **Outputs:** Includes **3D visualizations** (via Unity/WebGL), **forecasts** (SARIMAX and GES models), **historical data downloads**, and **actionable statistics**.
- **Actuation:** Currently uses a **"human-in-the-loop"** approach where operators manually adjust ventilation dials, doors, and fans based on platform insights.
- **Missing Flows:** The source identifies **system health monitoring** (identifying missing data or sensor drift) as a critical flow. There is **no mention of Audit Logs, Firmware Updates, or Heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** The source addresses data storage and interoperability:

- **Storage:** Explicitly validates the use of a **PostgreSQL** relational database for storing numeric and categorical metadata.
- **Modeling:** Uses **SQLAlchemy** (Python) for the backend and API to handle data abstraction.
- **Interoperability:** Highlights the challenge of **proprietary APIs** that restrict access to data streams, requiring intermediate gateways like the Aranet Gateway.
- **N/A:** The source does **not mention MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The UI architecture deviates from the React-based hypothesis in the research plan:

- **Tech Stack:** Developed using **Python (Flask)**, **Jinja**, **Bootstrap**, and **JavaScript**.
- **UI Pattern:** Features a dual approach: a **"classic dashboard interface"** for charts and a **Unity 3D interface** (deployed via WebGL) for an "identical digital replica".
- **Modularity:** New charts or models are added as "extra pages in an html index" rather than a grid-persistence system.
- **N/A:** There is **no mention of React, React Grid Layout, or the specific "Widget Pattern"** [N/A].

**RQ5 (OT Security & Safety):** Security and safety are addressed through access control and manual overrides:

- **Access Control:** Access to the database is restricted via **IP verification** and **selected user accounts**.
- **Remote Actuation Safety:** Emphasizes that for critical machines, automatic control must be implemented safely; the current farm model relies on **human interpretation** before manual actuation to ensure safety.
- **N/A:** The source **does not mention RBAC, IEC 62443, or NIST 800-82** [N/A].

**Key Quote:** "The simplest Monitoring Digital Twin... provides a visual representation and insights into the state of the physical entity to inform human interpretation and action, to a fully Autonomous Digital Twin, which fully controls the behaviour of the physical entity without the need for human intervention."

---

### Analysis of Source: Understanding IoT (Internet of Things) | Tiger Data

Tavares, A. (2024, May 28). Understanding IoT (Internet of Things). TigerData. https://www.tigerdata.com/learn/understanding-iot-internet-of-things

**RQ1 (Actors & Roles):** The source mentions broad categories of people involved in the ecosystem, such as **"developers," "businesses,"** and **"customers"**. It specifically references **"Ajay and Mike"** (founders) who solved sensor data problems for IoT customers. However, it does **not** explicitly define or validate the specific separation of the "Integrator" from the "Operator" role, nor does it mention "Maintenance Engineers" or "Data Analysts" [N/A].

**RQ2 (System Boundaries & I/O):** The source identifies four key components: **Devices/Sensors, Connectivity, Data Processing, and User Interface**.

- **Inputs:** Validates **"telemetry"** as "huge amounts of sensor data with a timestamp associated with it—time-series data". Specific examples include vibration, temperature, and pressure.
- **Outputs:** Users interact via **"user interfaces such as mobile apps or web dashboards"**.
- **Flows:** Mentions **"Real-time monitoring and automation"**.
- **Audit Logs:** Explicitly lists **"Audit Logging"** as a feature to be enabled within the database.
- **N/A:** There is **no mention of firmware updates or heartbeats** [N/A].

**RQ3 (Data Modeling & Standards):** The source provides a direct answer to the gap regarding storing dynamic data in a relational database.

- **Storage Strategy:** It recommends a **"Postgres for Everything"** approach. It suggests storing **"metadata"** (machine settings, line information, shift info) in relational tables and **"time-series data"** (measurements and timestamps) in a time-series extension like **TimescaleDB**.
- **JSONB:** Validates the use of **JSONB** and **JSON metadata** queries within PostgreSQL for handling semi-structured IoT data.
- **Modeling:** Suggests using **"Hypertables"** (partitioned tables) as a best practice for scaling time-series data modeling.
- **N/A:** The source **does not mention MQTT Sparkplug B or DTDL** [N/A].

**RQ4 (Dashboard Architecture):** The source mentions **"web dashboards"** and **"mobile apps"** as the primary user interface. It identifies **"Apache Superset"** as a tool for data visualization in PostgreSQL.

- **N/A:** There is **no mention of React, React Grid Layout, the Widget Pattern, or "Drag-and-Drop"** functionality [N/A].

**RQ5 (OT Security & Safety):** The source discusses security and safety at a high level:

- **Remote Actuation:** Confirms that IoT allows objects to be **"sensed and controlled remotely"**.
- **Safety:** Notes that IoT can **"monitor and manage workplace safety"** to reduce risks and ensure compliance.
- **Security Protocols:** Mentions general **"Postgres Security"** best practices and the use of the **"pgcrypto" extension** to secure time-series data.
- **N/A:** There is **no mention of RBAC, IEC 62443, or NIST 800-82** [N/A].

**Key Quote:** "Like many developers, they were struggling to keep up with the deluge of sensor data, storing it in multiple databases: metadata... in a relational database and time-series data... in a time-series database. There had to be a better way... you can now use Postgres for Everything."

---

**Analogy for Understanding:** Using **PostgreSQL with TimescaleDB** for an IoT platform is like having a **Smart Filing Cabinet**. The **Metadata** is the label on the outside of the folder (who owns the machine, which factory it’s in). The **Time-Series Data** is the massive stack of papers inside, organized strictly by the date and time they were filed. Instead of having two separate cabinets for the labels and the papers, this system keeps them in one drawer, so you can instantly see _which_ machine produced _what_ reading without walking across the room.

---

# Batch 2 of Sources
### Analysis of Source: A Cyber Physical Architecture for Symbiotic Multi-robot Fleet Management

**APA 7 Reference:** Mitchell, D., Gu, Y., Blanche, J., Harper, S., Archibald, B., Sevegnani, M., & Flynn, D. (2025). A cyber physical architecture for symbiotic multi-robot fleet management. In Y. Cai et al. (Eds.), _Virtual and Augmented Reality Technology-Enhanced Learning_ (pp. 379–421). Springer Nature Singapore.

**RQ1 (Actors & Roles):** The text identifies several human roles, including **Teleoperation** (safe positioning for inspection), **Engineering expertise** (validating processes), and **Intervention** (assisting robots with physical hazards). It specifically proposes a shift where a single operator can oversee a diverse multi-robot (MR) fleet through a centralized dashboard, effectively coordinating tasks across multiple autonomous agents. Additional roles mentioned include a **Robot technician** (permitted on warehouse floors for maintenance) and a **Human observer** who can "teleport" through digital plant models.

**RQ2 (System Boundaries & I/O):** The system incorporates **run-time telemetry**, **live camera feeds**, and **teleoperation commands**. Inputs include data from **infrastructural sensors** (e.g., the "Limpet" sensor measuring temperature, humidity, and acceleration) and **robot health status** (battery %, mode of operation, and latency). Outputs consist of **automatic inspection reports**, **visual maps**, and **3D model projections** of robot positions. It also suggests **self-certification protocols** onboard robots to safeguard against operating above physical limits.

**RQ3 (Data Modeling & Standards):** The architecture handles **heterogeneous robotics**, including quadrupeds (Spot), wheeled UGVs (Husky), and UAVs (Tello). Interoperability is achieved through a mix of **Python-based SDKs**, **ROS (Robot Operating System)**, and the **Unity 2020.3.11f1** platform for cross-device support. Communication protocols utilized include **USB, Wi-Fi, Ethernet**, **TCP clients/servers**, and **Universal Data Protocol (UDP)** messages.

**RQ4 (Dashboard Architecture):** The **Operational Decision Support Interface (ODSI)** is built in **Unity** to ensure cross-platform support across multiple devices and operating systems. The UI features a **tab-based design** including "Home" (rapid overview), "Navigation" (summarized and detailed maps), "Inspection Outcomes" (3D warnings and photos), and "Success Probability" (line graphs and tabulated predictions). It uses **sliders** for controlling individual manipulator joint angles.

**RQ5 (OT Security & Safety):** Safety is handled via **Emergency Stop (E-STOP)** buttons for each robot and **safety compliance** interlocks. The text mentions **onboard self-certification protocols** to safeguard autonomous operation. While specific protocols like IEC 62443 are not named, it notes the requirement for **authorized operator verification** and **risk assessments** for robots in dangerous/confined environments.

**Key Quote:** "This allows for a single dashboard where a diverse MR-fleet can be operated by a single operator to coordinate the team."

---

### Analysis of Source: A ROS2 based communication architecture for control in collaborative and intelligent automation systems

**APA 7 Reference:** Erős, E., Dahl, M., Bengtsson, K., Hanna, A., & Falkman, P. (2019). A ROS2 based communication architecture for control in collaborative and intelligent automation systems. _Procedia Manufacturing_, 38, 349-357.

**RQ1 (Actors & Roles):** The text defines an **authorized operator** role, who must be verified via an **RFID reader** before greeting the system and receiving task instructions. It also mentions independent teams of **developers** who create control algorithms for specific components.

**RQ2 (System Boundaries & I/O):** Data flows are categorized into two families: **Command messages** (state-based instructions sent to hubs) and **State messages** (data published by hubs regarding their current status). Specific I/O include **RFID data**, **camera feeds**, **smart tool states**, and **Echo messages** used to inform the controller (Sequence Planner) that a message was successfully received.

**RQ3 (Data Modeling & Standards):** The architecture is based on **ROS2** utilizing the **Data Distribution Service (DDS)** standard for a scalable, distributed control middleware. It achieves interoperability between legacy **ROS1** and **ROS2** via **static and dynamic network bridges**. The system uses **strictly typed messages** and pursues a **node-oriented communication architecture** to handle equipment-agnostic messages for future vendor expansions.

**RQ4 (Dashboard Architecture):** N/A (The text focuses on the communication backbone and uses "Sequence Planner" for logic visualization rather than specific React/Grid UI layout patterns).

**RQ5 (OT Security & Safety):** Safety mechanisms include **safety zones** that trigger a **safeguard stop** if violated. Security is bolstered by placing ROS hubs within a **Virtual Private Network (VPN)** to ensure safe remote access for debugging and data collection.

**Key Quote:** "Utilizing ROS2 and several ROS masters enables us to partition a ROS system into local, single computer hubs, where a hub includes a ROS master and one or multiple local nodes."

---

### Analysis of Source: A cloud architecture for home energy management systems: a conceptual model

**APA 7 Reference:** Motta, L. L., Alvarez, W. S., Carvajal, H. R., Neto, F. B., de Lima, E. R., & Meloni, L. G. P. (2025). A cloud architecture for home energy management systems: a conceptual model. _Energy Informatics_, 8, 142.

**RQ1 (Actors & Roles):** The framework classifies functionalities based on three key stakeholders: **End-Users** (managing DERs and consumption), **Service Aggregators** (intermediaries coordinating community-level data), and **Utility Operators** (managing grid stability and large-scale data).

**RQ2 (System Boundaries & I/O):** The **Ingestion Environment** classifies I/O into **Telemetry** (numerical measurements like voltage, current, and temperature) and **States** (on/off status, HVAC modes). It also processes **Commands** for remote device control, **Notifications/Alerts** for dynamic pricing, and maintains **Event logging/Auditing** for compliance and diagnostics.

**RQ3 (Data Modeling & Standards):** The architecture is **technology-agnostic**, using **MQTT** and **AMQP** protocols for ingestion. It employs a **Schema Registry** to enforce data contracts and organizes storage using a **Data Lakehouse** with a **Medallion Architecture** (Bronze for raw data, Silver for enterprise-view, and Gold for curated business-ready data).

**RQ4 (Dashboard Architecture):** The source mentions the use of **React.js** for developing web applications to deliver dynamic and responsive user experiences. It advocates for **Single-Page Applications (SPA)** and a per-stakeholder **API Gateway** to route requests to backend services.

**RQ5 (OT Security & Safety):** Security includes **RBAC (Role-based access control)** for sensitive historical data, **OAuth2** for authentication, and **Two-Factor Authentication (2FA)**. Real-time communication is protected via **TLS encryption** and **network segmentation**, isolating internal operations in private subnets reachable only through a **VPN**.

**Key Quote:** "The proposed architecture aligns with stakeholder needs by defining the requirements of End-Users, Service Aggregators, and Utility Operators, enabling a more effective and adaptable cloud-based solution."

---

### Analysis of Source: A data flow framework to support the selection and integration of digital technologies for smart production

**APA 7 Reference:** Agerskans, N., Ashjaei, M., Bruch, J., & Chirumalla, K. (2025). A data flow framework to support the selection and integration of digital technologies for smart production. _International Journal of Production Research_, 63(12), 4269–4286.

**RQ1 (Actors & Roles):** The source suggests that Smart Production requires **cross-functional teams** including **managers, shop floor workers, and IT talents**. It highlights **Maintenance** as a specific application area and identifies the risk of **human factors** (e.g., typing errors) in data reporting.

**RQ2 (System Boundaries & I/O):** The framework defines five phases of the data value chain: **Data generation** (sensors/RFID), **Data communication** (Wi-Fi/5G/Ethernet), **Data storage** (cloud/edge), **Data processing** (AI/statistical analysis), and **Data usage** (visualisation for people or machines).

**RQ3 (Data Modeling & Standards):** The study identifies challenges in **interoperability** due to different communication protocols and **legacy systems** that lack new standard support. It emphasizes a **technology-agnostic** approach to ensure clusters encompass existing and future technologies.

**RQ4 (Dashboard Architecture):** N/A (The text discusses "Data Visualization Quality" as a general challenge—such as data overload or unclear meanings—but does not detail React grid layout implementation).

**RQ5 (OT Security & Safety):** Key security challenges include **intentional damage** (unauthorized access to assets), **sharing data with partners**, and ensuring **sensitive data** (e.g., failure analysis) does not leak. It also notes **privacy regulations** regarding data collection on human operators.

**Key Quote:** "It is not the digital technologies themselves that will make production smarter, but rather how they are integrated to manage the key resource, which is the data."

---

### Analysis of Source: A novel approach detection for IIoT attacks via artificial intelligence

**APA 7 Reference:** Karacayılmaz, G., & Artuner, H. (2024). A novel approach detection for IIoT attacks via artificial intelligence. _Cluster Computing_, 27, 10467–10485.

**RQ1 (Actors & Roles):** The text distinguishes between the **Attacker** and the **Cybersecurity staff/System administrators** who deal with attacks. It also notes that many tasks previously carried out by humans are now replaced by information systems for efficiency.

**RQ2 (System Boundaries & I/O):** Input features for the detection system include **RTT (Round Trip Time)**, **TTL (Time to Live)**, and **dup and retransmission rates**. Protocol-specific fields extracted from **S7comm** include **function code, parameter length, data length, error class, and error code**.

**RQ3 (Data Modeling & Standards):** The research evaluates performance using **Modbus** and **MQTT** protocols. It also specifically analyzes the **S7comm** protocol used for Siemens PLC communications.

**RQ4 (Dashboard Architecture):** The system includes a **Data Visualization** component that uses **dashboards, charts, and maps** to present alerts graphically to cybersecurity staff.

**RQ5 (OT Security & Safety):** Focuses on detecting and mitigating **MitM**, **DDoS**, and **Start-Stop (replay)** attacks targeting PLCs. It uses **packet mirroring** (network tap) to collect data without disrupting the continuity of industrial processes. The expert system uses a **Neural Network (NN-ReLU)** to achieve a 99.7% accuracy rate in attack detection.

**Key Quote:** "This model is designed to help make IoT and IIoT systems more secure by collecting network packets through mirroring in ICS processes and analyzing and learning from the data."

---

### Analysis of Source: Analysis of networked control system with 3-layer delayed network in industrial process automation

**APA 7 Reference:** Guduru, J., & Azad, S. M. A. K. (2026). Analysis of networked control system with 3-layer delayed network in industrial process automation. _Journal of the Chinese Institute of Engineers_, 49(1), 174-188. https://doi.org/10.1080/02533839.2025.2529394

**RQ1 (Actors & Roles):** The text identifies **operators** and **designers** in the context of managing network performance and process time response. It notes that human factors can be a source of disturbances.

**RQ2 (System Boundaries & I/O):** The system is defined as a **Networked Control System (NCS)** involving real-time data exchange via **sensors** (input) and **actuators** (output). Data flows include **periodic and aperiodic packets** transmitted through three layers: physical, network, and application. Input variables are measured by sensors and routed to a **controller** (control station), which computes actions based on predefined inputs or feedback.

**RQ3 (Data Modeling & Standards):** The research references the **OSI model** for networking layers. It mentions industrial protocols used for loop management, specifically **Modbus, Profibus, and Device-Net**.

**RQ4 (Dashboard Architecture):** N/A (The text discusses generating reports and displaying results but does not detail UI/React patterns).

**RQ5 (OT Security & Safety):** The source mentions the importance of **securing Industrial Control Systems (ICS)** against cyber threats and highlights **IEC 62443** (parts 1–4) as a standard for security in the manufacturing sector.

**Key Quote:** "Analyzing these time delays enables effective control loop configuration, improving the process control time response and overall stability."

---

### Analysis of Source: Digital Twins for Nuclear Power Plants and Facilities (Volume I & II)

**APA 7 Reference:** Crespi, N., Drobot, A. T., & Minerva, R. (Eds.). (2023). _The Digital Twin_ (Vol. 1 & 2). Springer Nature Switzerland AG. https://doi.org/10.1007/978-3-031-21343-4

**RQ1 (Actors & Roles):** The text explicitly identifies **integrators**, **platform developers**, **technology providers**, **AI experts**, and **cloud providers** as critical stakeholders. It distinguishes between **end-users** (citizens, patients, learners) and **utility/facility operators**.

**RQ2 (System Boundaries & I/O):** It defines **"Passive DTs"** as one-way links providing status data, and **"Active DTs"** as two-way communication systems where the twin can affect the physical object’s behavior via **actuation**. Data is conveyed via **"digital threads"** in real-time. System boundaries are managed through **Service Interfaces**.

**RQ3 (Data Modeling & Standards):** The source identifies several critical standards: **Digital Twin Definition Language (DTDL)** (Microsoft), **NGSI-LD** (ETSI standard using JSON-LD), **OPC UA**, and **Asset Administration Shell (AAS)** for Industry 4.0.

**RQ4 (Dashboard Architecture):** It advocates for **low-code application composition platforms** where "Packaged Business Capabilities" (PBCs) are **dragged-and-dropped** onto an application experience canvas. It also mentions **React-based Single-Page Applications (SPA)** for stakeholder gateways in energy contexts [Motta et al. section, see previous analysis].

**RQ5 (OT Security & Safety):** The framework includes **Security, Trust, and Governance** as foundational layers, emphasizing **Functional Safety (FuSa)**, **Cybersecurity**, and **Reliability**. It references **NIST SP 800-82** and **IEC 62443** for OT security.

**Key Quote:** "The game-changing novelty of the Digital Twin concept is that it offers the ability to transform physical objects into programmable entities."

---

### Analysis of Source: Enabling industrial internet of things-based digital servitization in smart production logistics

**APA 7 Reference:** Flores-García, E., Jeong, Y., Liu, S., Wiktorsson, M., & Wang, L. (2023). Enabling industrial internet of things-based digital servitization in smart production logistics. _International Journal of Production Research_, 61(12), 3884–3909. https://doi.org/10.1080/00207543.2022.2081099

**RQ1 (Actors & Roles):** The stakeholders include **factory managers**, **production planners**, and **development engineers**. It also discusses the roles of **suppliers**, **manufacturers**, and **customers** in outcome-based service models.

**RQ2 (System Boundaries & I/O):** The architecture uses a three-layer model: **Sensing** (data collection from IIoT devices), **Networking** (standardizing and transferring information), and **Application** (monitoring, optimization, and control services). I/O includes **real-time telemetry** (position, time, battery) and **mission commands** (start/finish locations, velocity).

**RQ3 (Data Modeling & Standards):** The study uses **Systems Modeling Language (SysML)** to create modeling profiles (Product, Database, and Service profiles). It mentions communication protocols like **MQTT, HTTP, and AMQP** and data formats like **JSON**.

**RQ4 (Dashboard Architecture):** The **User Interface** is mentioned as the top layer for monitoring and status analysis. It facilitates the visualization of **real-time location** and **status analysis** through spaghetti diagrams and heat maps.

**RQ5 (OT Security & Safety):** It highlights the need for **authentication, authorization, and information protection** during data transfer within the networking layer. Safety is addressed through **autonomy services** that help AGVs avoid physical obstacles.

**Key Quote:** "Manufacturers must capitalise on the cooperation across products, services, and software for transitioning from product- to service-oriented manufacturing."

---

### Analysis of Source: Enhancing SCADA systems in oil and gas pipelines through electronics and full data-type publishing technology

**APA 7 Reference:** Fang, F., Sun, T., Mei, Z., Yan, F., Zhang, L., Sun, L., & Wang, W. (2025). Enhancing SCADA systems in oil and gas pipelines through electronics and full data-type publishing technology. _Australian Journal of Electrical and Electronics Engineering_. https://doi.org/10.1080/1448837X.2025.2459491

**RQ1 (Actors & Roles):** The text mentions **operators** as primary decision-makers and **site officers** who monitor construction/operation data.

**RQ2 (System Boundaries & I/O):** Inputs are defined as **telemetry** from field devices (pressure, flow rate, temperature). The **publishing server** acts as an aggregator that standardizes and prioritizes raw data before sending it to a **client application**. Missing data is addressed through **data buffering** and **adaptive sampling**.

**RQ3 (Data Modeling & Standards):** It identifies **OPC UA** and **IEC 61850** as key data protocols for standardized transmission. It also mentions **BACnet** and **LoRa** in its comparative analysis.

**RQ4 (Dashboard Architecture):** The system features **graphical user interfaces (GUIs)** providing **personalized dashboards and warnings**. These GUIs are designed to facilitate decision-making and depict clear pipeline status.

**RQ5 (OT Security & Safety):** Security involves implementing **SSL (Secure Socket Layer)** or **TLS (Transport Layer Security)** for data integrity. It emphasizes **user authentication and access controls** to prevent unauthorized control.

**Key Quote:** "Full data type publishing technology ensures compatibility between heterogeneous devices and correct field condition representation."

---

### Analysis of Source: Fleet management for earthmoving operation in the phase of detail estimation using mixed integer nonlinear programming

**APA 7 Reference:** Ngov, K., Ko, Y., Noh, J., Lee, S., & Han, S. (2025). Fleet management for earthmoving operation in the phase of detail estimation using mixed integer nonlinear programming. _Journal of Asian Architecture and Building Engineering_, 24(2), 800-815. https://doi.org/10.1080/13467581.2024.2320321

**RQ1 (Actors & Roles):** The primary roles identified are **construction planners** and **site managers**.

**RQ2 (System Boundaries & I/O):** The system boundary is defined by the **earthmoving operation cycle** (load, travel, return, dump). Inputs include **working conditions** (soil density, distance) and **machinery availability**. I/O is tracked via **CCTV and GPS data** in some contexts, though the proposed model uses deterministic values for estimation.

**RQ3 (Data Modeling & Standards):** N/A (The source focuses on **Mixed Integer Nonlinear Programming (MINLP)** and the **GEKKO** python library rather than naming-convention standards like DTDL or Sparkplug B).

**RQ4 (Dashboard Architecture):** The system uses a **bubble chart** to visually rank project scenarios based on business impact and technical readiness.

**RQ5 (OT Security & Safety):** Safety is treated as a **business impact metric** for project ranking. The text notes that site officers may not be able to manually monitor all recorded data, implying a need for automation in monitoring.

**Key Quote:** "The proposed method can be implemented without conducted repeated simulation... allowing planners with limited simulation experience to make feasible plans."

---

### Analysis of Source: Fleet management systems in Logistics 4.0 era: a real time distributed and scalable architectural proposal

**APA 7 Reference:** Dintén, R., García, S., & Zorrilla, M. (2023). Fleet management systems in Logistics 4.0 era: a real time distributed and scalable architectural proposal. _Procedia Computer Science_, 217, 806–815. https://doi.org/10.1016/j.procs.2022.12.277

**RQ1 (Actors & Roles):** The text identifies several key roles including **drivers** (who receive tips and warnings), **fleet owners** (who make instant decisions), and **IT responsibles** who oversee architectural improvements. It also mentions **developers** who manage backend code complexity.

**RQ2 (System Boundaries & I/O):** The system uses **telemetry** such as truck positioning and diagnostic data (consumption, distance traveled, and number of accelerations). Inputs include data from **CLV (board computer) devices and CANBUS** frames. Outputs consist of **near real-time statistics**, **warning messages**, **driving tips**, and visual analytics displayed on a **dashboard**.

**RQ3 (Data Modeling & Standards):** The architecture utilizes the **MQTT protocol** for the queue manager (RabbitMQ). It proposes the **RAI4.0 metamodel**, which acts as a "single source of truth" to describe all elements including data, resources, workloads, and metrics. Persistence is handled through **SQL Server** for transactional data and **Cassandra** for rapid data ingestion and queries.

**RQ4 (Dashboard Architecture):** The source mentions a **dashboard** for analyzing trip computations and statistics in near real-time. It notes that complex views are loaded from an interface designed to avoid overloading relational databases, but does not specify React-based grid patterns.

**RQ5 (OT Security & Safety):** Security is described as **harder and more complex in cloud-based applications** compared to centralized on-premise versions due to the number of components and communication paths. The text notes that the **RAI4.0 architecture security service** is still under implementation.

**Key Quote:** "The inclusion of a data stream processing engine in the architecture allows the company to know statistics in near real time... some of them could be sent to the drivers during their trip as warning messages or driving tips."

---

### Analysis of Source: Implementation mechanism of wide area cloud bus based on scada system for oil and gas pipeline

**APA 7 Reference:** Huang, H., Sun, T., Feng, L., Li, Y., Yang, J., Fang, F., & Zhuang, H. (2025). Implementation mechanism of wide area cloud bus based on scada system for oil and gas pipelines. _Australian Journal of Electrical and Electronics Engineering_. https://doi.org/10.1080/1448837X.2025.2590889

**RQ1 (Actors & Roles):** Identified actors include **operators** (who monitor and operate pipelines from a distance), **site officers** (monitoring data), **pipeline managers** (receiving alerts), and **technicians** (who spend less time on-site due to remote diagnostics).

**RQ2 (System Boundaries & I/O):** The system boundary includes **sensors** (measuring temperature, pressure, flow rate, and gas composition), **actuators** (pumping and valves), and **PLCs**. Data flows include **real-time data transmissions**, **status reports**, and **control instructions**. It uses **redundant communication connections** to ensure constant data flow, functioning as a heartbeat mechanism.

**RQ3 (Data Modeling & Standards):** The architecture employs protocols such as **MQTT, OPC-UA, TCP/IP, Modbus, and DNP3**. It highlights the use of **API and middleware solutions** for protocol adapters to ensure compatibility with **legacy SCADA systems**.

**RQ4 (Dashboard Architecture):** The system includes a **central monitoring and control dashboard** that displays the "overall health" of the pipeline network. It uses **graphical views** and **user-friendly control interfaces** that allow operators to modify parameters remotely.

**RQ5 (OT Security & Safety):** Security mechanisms include **mutual TLS, Multi-Factor Authentication (MFA)**, and **AES-256 encryption**. It uses **VPNs, SSL**, and **SHA-256 algorithms** to verify data integrity. **Remote control capabilities** allow operators to adjust set-points (flow and pressure) remotely in emergencies.

**Key Quote:** "The wide-area cloud bus allows for centralised real-time monitoring and control of the global pipeline infrastructure."

---

### Analysis of Source: Industrial Metaverse design methodologies: a comprehensive literature review

**APA 7 Reference:** Xiao, X., Roy, R., Omidyeganeh, M., & Furnari, F. (2025). Industrial Metaverse design methodologies: a comprehensive literature review. _International Journal of Computer Integrated Manufacturing_. https://doi.org/10.1080/0951192X.2025.2544545

**RQ1 (Actors & Roles):** Stakeholders listed include **Quality Inspectors, Producers, Operations Managers, Platform Operators, and Solution Providers**. It emphasizes **human-centred design** and includes **customers** in the design phase via co-design.

**RQ2 (System Boundaries & I/O):** The system utilizes **perception** (data acquired through sensors) and **control** (hardware to monitor and drive the Metaverse). It specifies high requirements for **data throughput** and **latency** (as low as 1 ms for digital twins). It connects people, machines, processes, and environments within a virtual replica.

**RQ3 (Data Modeling & Standards):** The technology foundations include **blockchain, digital twins, Internet of Things (IoT), and NFTs**. It mentions the **3C** (Connection, Conversion, Cyber) and **5C** (Cognition, Configuration) architectural frameworks for Cyber-Physical Systems.

**RQ4 (Dashboard Architecture):** The source mentions **UXD (User-Experience Design)** as a core component. It highlights **adaptive user interfaces** and **modular content design** to support the reuse of design elements. **AR-based interface design** is recommended for providing intuitive guidance during manual maintenance.

**RQ5 (OT Security & Safety):** The framework includes **security and ethics** (privacy, identity, and accessibility). **Blockchain** is used for secure authentication and identity management of **avatars**. Safety concerns are linked to **real-time control dependencies** and rigorous data synchronization, such as operating large robots using AR.

**Key Quote:** "The industrial metaverse is a fully immersive virtual space that interacts with the physical space in real time to enhance operational efficiency."

---

### Analysis of Source: Integration of SCADA and Industrial IoT: Opportunities and Challenges

**APA 7 Reference:** Nechibvute, A., & Mafukidze, H. D. (2024). Integration of SCADA and Industrial IoT: Opportunities and Challenges. _IETE Technical Review_, 41(3), 312–325. https://doi.org/10.1080/02564602.2023.2246426

**RQ1 (Actors & Roles):** The **Human Operator** is responsible for monitoring the SCADA system, performing control operations, and addressing alerts. The text also highlights the convergence of **IT teams** (focused on security) and **OT teams** (focused on availability and safety).

**RQ2 (System Boundaries & I/O):** The architecture includes the **Master Terminal Unit (MTU)**, which gathers data from **Remote Terminal Units (RTUs)** or **PLCs** and sends control signals. I/O involves **sensors** collecting data and **actuator devices** performing control functions. **Telemetric status reports** from remote devices are integrated into the cloud.

**RQ3 (Data Modeling & Standards):** Protocols mentioned include **Modbus, DNP3, OPC, and IEC 61850**. **MQTT** and **CoAP** are cited as techniques to increase gateway scalability. It notes the transition from Industry 3.0 (logic processor-based) to **Industry 4.0** (data-driven).

**RQ4 (Dashboard Architecture):** The **Human-Machine Interface (HMI)** presents data to the operator using **graphics, schematics, windows, pull-down menus, and touch-screens**.

**RQ5 (OT Security & Safety):** 4th generation SCADA employs **TLS and SSL**. The text identifies that standard SCADA protocols like **MODBUS and DNP3 are inherently insecure**. It emphasizes **functional safety** and the need for **RBAC** (implied via IT/OT convergence and data protection goals) to protect against new attack vectors.

**Key Quote:** "SCADA systems and industrial IoT technologies need each other, and their integration will push industry and manufacturing to the next level of efficiency and productivity."

---

### Analysis of Source: Internet of things (IoT) and artificial intelligence (AI) enabled framework for smart fleet management

**APA 7 Reference:** Potdar, P. R., & Parikh, S. M. (2025). Internet of things (IoT) and artificial intelligence (AI) enabled framework for smart fleet management. _OPSEARCH_. https://doi.org/10.1007/s12597-025-00961-7

**RQ1 (Actors & Roles):** The framework involves **fleet managers** (decision-making), **drivers** (monitoring behavior and safety), **IT staff**, **maintenance crews**, and **customers** (tracking deliveries).

**RQ2 (System Boundaries & I/O):** Inputs include **telematics** (fuel, engine diagnostics, tire pressure, temperature), **GPS** (location, speed, trajectory), and **environmental sensors** (weather, traffic). Data is processed through **edge devices** to reduce latency before cloud transmission. Outputs include **real-time alerts**, **maintenance notifications**, **safety feedback**, and **performance metrics** on dashboards.

**RQ3 (Data Modeling & Standards):** The framework uses a **unified data platform with APIs** for connectivity between IoT devices and AI systems. It mentions technologies like **MS Azure IoT, TensorFlow, and PyTorch** for model development.

**RQ4 (Dashboard Architecture):** The **Fleet Management and Health Monitoring Dashboard** includes contextual filters (**fleet ID, date, driver ID, location, weather**). It uses **circular gauges** for critical health indicators (engine health, battery status, coolant level) and **metrics panels** for incidents like harsh braking or seat belt violations.

**RQ5 (OT Security & Safety):** Security is addressed through **GDPR compliance** and **end-to-end encryption**. Safety is managed via **Advanced Driver Assistance Systems (ADAS)** and **driver behavior monitoring** to detect dangerous actions like speeding or sudden braking.

**Key Quote:** "Consolidation of real-time data onto one platform has simplified data-driven decision-making, enabling fleet managers to enhance fuel efficiency, driver performance, and vehicle health."

---

### Analysis of Source: Lightweight CNC digital process twin framework: IIoT integration with open62541 OPC UA protocol

**APA 7 Reference:** Anbalagan, A., Zanhar, W. Y., George, S., Kauffman, M., & Long, T. (2025). Lightweight CNC digital process twin framework: IIoT integration with open62541 OPC UA protocol. _Production & Manufacturing Research_, 13(1), 2544981. https://doi.org/10.1080/21693277.2025.2544981

**RQ1 (Actors & Roles):** The text identifies **Subject Matter Experts (SMEs)** and a **Quality Unit** who are responsible for approving User Requirement Specifications (URS). It also mentions the role of **"Users"** who receive automated decision-making notifications via email. The framework is designed to help **Small and Medium-sized Enterprises (SMEs)** adopt cost-effective automation.

**RQ2 (System Boundaries & I/O):** The system is defined by a **five-layer architecture**: Physical (microcontroller and sensors), Virtual (modeling and GM code), Data (OPC UA transfer), Interaction (visualization), and Decision (logic and analytics). **Inputs** include telemetry from **accelerometers (vibration), temperature, and humidity sensors**. **Outputs** consist of **real-time time-series graphs**, **aggregate data statistics**, and **automated email alerts** triggered when sensor thresholds are breached.

**RQ3 (Data Modeling & Standards):** The framework utilizes the **open62541** open-source C implementation of the **OPC UA** protocol for communication. Data is stored in **JSON format** within the Arduino environment. The text also mentions the **Asset Administration Shell (AAS)** and **NGSI-LD** in its literature review regarding interoperability standards.

**RQ4 (Dashboard Architecture):** Visualization is managed through the **Interaction Layer**, which uses the **Siemens Insights Hub interface** and **Node-RED**. The dashboard displays **real-time time-series plots** to identify data spikes and **circular gauges** for critical health indicators like battery status and coolant levels.

**RQ5 (OT Security & Safety):** The source notes that **Arduino Uno devices lack built-in security features** essential for industrial environments, necessitating intermediary software for secure data exchange. It emphasizes **secure and efficient connectivity** between Node-RED and the Insights Hub cloud. Safety is managed via **rule-based triggers** that monitor signal deviations and notify personnel to take immediate action.

**Key Quote:** "The proposed five-layer architecture enhances the process efficiency by integrating real-time data capture, precise modeling, and efficient data transfer with the open62541-enabled OPC UA."

---

### Analysis of Source: Modular and reconfigurable factories for continuous production innovation in pharmaceutical manufacturing

**APA 7 Reference:** Schwörer, T., Jensen, M. B., Schou, C., Dueholm, B. C., Andersen, R., de Neergaard, W., Chrysostomou, D., Madsen, O., & Olesen, O. V. (2025). Modular and reconfigurable factories for continuous production innovation in pharmaceutical manufacturing. _International Journal of Production Research_. https://doi.org/10.1080/00207543.2025.2575844

**RQ1 (Actors & Roles):** The source identifies **Operators** as primary users who require training in non-GMP environments. It also lists **Subject Matter Experts (SMEs)**, **Quality Units**, and **System Owners** as critical stakeholders for approving designs and requirements. It notes a need for **collaboration between vendors and pharmaceutical companies**.

**RQ2 (System Boundaries & I/O):** System boundaries are defined during **System Classification (SC)** and include sterile connectors but exclude filters and upstream tanks. Data flows involve **standardized digital interfaces** and **information flows** between modules. The architecture utilizes **Discrete Event Simulation (DES)** to refine material flow and identify bottlenecks.

**RQ3 (Data Modeling & Standards):** The architecture advocates for vendor-neutral frameworks, specifically the **Asset Administration Shell (AAS)** and **Modular Type Package (MTP)**. Communication standards include **OPC UA PubSub**, **MQTT**, and **AMQP**. It also mentions the **Unified Namespace (UNS)** as an enterprise-wide IIoT backbone.

**RQ4 (Dashboard Architecture):** The source proposes a **Data & Analytics Layer** that supports a **centralized broker** for collecting and distributing data. While specific React grid patterns aren't detailed, it emphasizes **digital prototyping and simulation** using flow simulations and physics-based models.

**RQ5 (OT Security & Safety):** Security is linked to **continuous upgrading** to comply with changing **cybersecurity demands**. Safety is addressed through **local orchestration** that manages **real-time constraints and safety interlocks** for coordinated devices. It also references **Good Manufacturing Practice (GMP) Annex 1** for graded area safety.

**Key Quote:** "Ownership of the digital architecture does not mean that existing equipment becomes incompatible; existing equipment can be integrated through the development of equipment-specific proxy layers."

---

### Analysis of Source: Next Generation NDE Sensor Systems as IIoT Elements of Industry 4.0

**APA 7 Reference:** Valeske, B., Osman, A., Römer, F., & Tschuncky, R. (2020). Next generation NDE sensor systems as IIoT elements of Industry 4.0. _Research in Nondestructive Evaluation_, 31(5-6), 340–369. https://doi.org/10.1080/09349847.2020.1841862

**RQ1 (Actors & Roles):** The text distinguishes between **expert human inspectors** and **assistance technologies**. It identifies **"Novices in NDE"** who utilize **Human-Machine-Interaction (HMI)** assistance systems for training.

**RQ2 (System Boundaries & I/O):** The **Data Value Chain** is defined as: Signal Generation -> Interaction -> Acquisition -> Reconstruction -> Processing -> Analytics. **Inputs** include data from **ultrasound, X-ray, and optical sensors**. **Outputs** feature **Augmented Reality (AR) visualizations** via devices like Microsoft HoloLens, mapping defect results onto real-world video images.

**RQ3 (Data Modeling & Standards):** The source recommends the **DICONDE** (Digital Imaging and Communications for Non-Destructive Evaluation) standard as a uniform generic data format. It uses **OPC UA** as the standardized interface for network connection. It also follows the **RAMI 4.0 (Reference Architecture Model for Industry 4.0)**.

**RQ4 (Dashboard Architecture):** The **SmartInspect** system functions as an HMI that uses **AR glasses** for real-time visualization. It presents data in **2D (C-Scan)** or **3D volumetric displays**. The interface also supports **speech recognition** for hands-free operation.

**RQ5 (OT Security & Safety):** Focuses on **"Trusted AI"** and **"Explainable AI"** to build user acceptance of automated decisions. It mentions **Blockchain** as a potential solution for secure data exchange and integrity. The system includes **self-monitoring and self-surveillance** to ensure safe operation and valid data recording.

**Key Quote:** "NDE4.0 sensor systems should supply only relevant information and as such contribute only with value-added data to the industrial data space."

---

### Analysis of Source: On the Reliability of Industrial Internet of Things from Systematic Perspectives: Evaluation Approaches, Challenges, and Open Issues

**APA 7 Reference:** Kim, D.-S., Tran-Dang, H., & Huynh-The, T. (2022). On the reliability of industrial internet of things from systematic perspectives: Evaluation approaches, challenges, and open issues. _IETE Technical Review_, 39(6), 1277–1308. https://doi.org/10.1080/2028586

**RQ1 (Actors & Roles):** The source acknowledges the role of **technicians, managers, and engineers** in design and maintenance. It notes that in **consumer IoT**, humans can reconfigure and recover systems, whereas in **IIoT**, human intervention is often impossible due to rapid automation.

**RQ2 (System Boundaries & I/O):** Defines three functional building blocks: **Perception** (sensing), **Data Communication** (transmitting), and **Data Handling** (analytics). It emphasizes the importance of **Heartbeats** (implied via availability metrics) and the risk of latency in time-critical control signals.

**RQ3 (Data Modeling & Standards):** Identifies a **"semantic-oriented"** vision for dealing with unstructured IoT data. It discusses standards like **WirelessHART (IEC62591)** and **ZigBee** for industrial networking.

**RQ4 (Dashboard Architecture):** The management system uses **Application Programming Interfaces (APIs)** to build a **centralized dashboard** that visualizes analysis results, predictions, and notifications like alerts or alarm signals.

**RQ5 (OT Security & Safety):** Analyzes security risks in protocols like **MQTT and CoAP**, noting they lack mechanisms to check payloads. It recommends **AES encryption** and **Intrusion Detection Systems**. Concepts like **Self-healing** and **Fault Tolerance** are categorized as essential for operational reliability.

**Key Quote:** "Failures and downtime in any industrial process of IIoT-based systems can lead to highly hazardous situations or even life-threatening."

---

### Analysis of Source: On the impact of Industrial Internet of Things (IIoT) - mining sector perspectives

**APA 7 Reference:** Zvarivadza, T., Onifade, M., Dayo-Olupona, O., Said, K. O., Githiria, J. M., Genc, B., & Celik, T. (2024). On the impact of Industrial Internet of Things (IIoT) - mining sector perspectives. _International Journal of Mining, Reclamation and Environment_, 38(10), 771–809. https://doi.org/10.1080/17480930.2024.2347131

**RQ1 (Actors & Roles):** Identifies **Mining Engineers**, **Business Managers**, and **Drill and Blast Crews** as users of IIoT software. It also mentions **Auto Electricians and Mechanical Fitters** who use mixed-reality headsets for on-site support.

**RQ2 (System Boundaries & I/O):** Data flow moves from **Data Collection (mine)** -> **Data Transmission (network)** -> **Processing** -> **Decision-making**. **Inputs** include geological data (ore quality, depth) and environmental telemetry (gases, noise, water quality). **Outputs** include **3D mine maps**, **automated alarms** for gas leaks/fires, and **fuel utilization reports**.

**RQ3 (Data Modeling & Standards):** Mentions a **Mine Automation System (MAS)** used by Rio Tinto to consolidate data into a **unified data format**, though specific standards like Sparkplug B are not named.

**RQ4 (Dashboard Architecture):** The architecture includes a **Compliance Dashboard** that benchmarks environmental data against regulatory standards. It also features a **Community Engagement Portal** for sharing real-time air and water quality data with the public. **Big Data visualization** is used to create 3D layouts for troubleshooting emergencies.

**RQ5 (OT Security & Safety):** Emphasizes that **Cybersecurity** is a high priority, requiring protection against online, hardware-based, and physical interference. **Proximity detection sensors** are used on moving machinery to prevent accidents. **Autonomous operations** (drones, self-driving trucks) are used to reduce human exposure to dangerous environments.

**Key Quote:** "IIoT can eliminate the aspect of human hesitation or error by making an enhanced and quick judgement based on all of the facts."

---

### Analysis of Source: Overview and Recommendations for Cyber Risk Assessment in Nuclear Power Plants

**APA 7 Reference:** Zhang, F., & Kelly, K. (2023). Overview and recommendations for cyber risk assessment in nuclear power plants. _Nuclear Technology_, _209_(3), 488–502. https://doi.org/10.1080/00295450.2022.2092356

**RQ1 (Actors & Roles):** The text identifies several roles within the industrial ecosystem, including **operators** who must dynamically respond to cyberattacks, **trained security personnel**, and **human PRA (Probabilistic Risk Assessment) experts**. It also distinguishes between types of attackers, ranging from **irrational individuals** to **government cyber-warriors**. While it does not explicitly define an "Integrator" vs. "Operator" split, it notes that **system designers** are in charge of development and that **specialist cybersecurity groups** act as defenders.

**RQ2 (System Boundaries & I/O):** The system boundary includes **digital instrumentation and control (I&C) systems**, which are classified into **safety systems** (requiring higher reliability) and **nonsafety systems**. **Inputs** include **remote operation data** and **false data injection** (an attack vector), while **outputs** include the **Safety Parameter Display System** and **real-time risk/failure profiles**. The text highlights **monitoring and logging** as critical technical security controls, aligning with the need for audit logs.

**RQ3 (Data Modeling & Standards):** N/A

**RQ4 (Dashboard Architecture):** The source mentions a **"dynamic visual display"** used for risk calculations according to the progress of an attack. It also notes a **system management console** containing an **administrative security panel** that allows an administrator to view network topology.

**RQ5 (OT Security & Safety):** The article provides extensive details on OT security, referencing **NIST SP 800-82** and **NRC Regulatory Guide 5.71**. It identifies **access control, monitoring and logging, and encryption** as the three most critical technical controls. It specifically addresses the safety of **remote operation** and identifies **false data injection** at controllers as a primary risk to physical processes (e.g., pump speed affecting reactor cooling).

**Key Quote:** "Ideal risk frameworks for the nuclear industry are dynamic and account for system dependencies... recognizing that components of a CPS interact and therefore the effects of an attack may cascade."

---

### Analysis of Source: Real-time analysis of cyber attacks in SCADA based power system

**APA 7 Reference:** Mondal, S., Prudhvi, B., Khare, P., & Reddy, M. J. B. (2025). Real-time analysis of cyber attacks in SCADA based power system. _Australian Journal of Electrical and Electronics Engineering_. https://doi.org/10.1080/1448837X.2025.2531694

**RQ1 (Actors & Roles):** Roles identified include the **operator**, who monitors the system and executes control actions from a center, and **power engineers**, who aim to mitigate cyber-attacks. It also mentions internal threats from **hostile engineers**.

**RQ2 (System Boundaries & I/O):** The system includes **Intelligent Electronic Devices (IEDs)**, **Remote Terminal Units (RTUs)**, and **Master Terminal Units (MTUs)**. **Inputs** consist of real-time bus data: **voltage magnitude, current magnitude, voltage angle, and current angle**. **Outputs** include **breaker status** and **control commands** communicated to local IEDs. The source identifies **Transaction IDs** as a critical data flow used to synchronize master-slave messages, functioning similarly to a heartbeat; a mismatch results in a **timeout/read failure**.

**RQ3 (Data Modeling & Standards):** N/A

**RQ4 (Dashboard Architecture):** The source describes the **Human-Machine Interface (HMI)** as a platform where processed data is presented through **graphic interfaces** to allow operators to monitor, control, and respond to critical situations.

**RQ5 (OT Security & Safety):** Focuses on **Man-in-the-Middle (MITM)** and **Denial of Service (DoS)** attacks. It advocates for **firewall-based prevention** (host-based, network-based, and zone-based) to block unwanted traffic. It highlights the **lack of built-in encryption and authentication** in standard Modbus TCP as a major vulnerability and proposes using **TLS (Transport Layer Security)** and **Multi-Factor Authentication** to enhance security.

**Key Quote:** "Ensuring data transmission between IEDs and the control centre without delay, loss, or alterations is paramount for the reliable operation of the system."

---

### Analysis of Source: Reconfigurable machine tending with collaborative robots: leveraging ISO 21919 for enhancing flexibility and safety

**APA 7 Reference:** Kim, D., Kim, M., Lee, J., Lee, D., & Um, J. (2025). Reconfigurable machine tending with collaborative robots: leveraging ISO 21919 for enhancing flexibility and safety. _International Journal of Computer Integrated Manufacturing_. https://doi.org/10.1080/0951192X.2025.2496901

**RQ1 (Actors & Roles):** The source identifies the **operator** (who monitors equipment and performs real-time tracking), **external engineers** (who alter robot programming remotely), and **human workers** engaged in cooperative tasks. It also mentions **equipment suppliers**.

**RQ2 (System Boundaries & I/O):** The architecture is structured into five layers: **physical, network, data, cyber, and application**. **Inputs** include **LiDAR sensor data** for worker detection and **machine status** (NCstate, Doorstate). **Outputs** include **cobot speed control commands** (Slow down, Speed up, Stop). The system utilizes a **high-frequency sensor** (3000 times/sec) that provides real-time updates, functioning as a high-velocity data stream.

**RQ3 (Data Modeling & Standards):** The text details a standardized modeling approach using the **Asset Administration Shell (AAS)** to represent the digital identity of assets. It employs **Automation Markup Language (AML)** as an XML-based data exchange format for object-oriented modeling. It specifically proposes a **URI-based address scheme** (e.g., `data://machine/channel/axis/machinePosition`) to normalize data from heterogeneous CNCs.

**RQ4 (Dashboard Architecture):** The system uses a **Node-Red dashboard** as a visual interface for monitoring the states of sensors, machines, and robots. This dashboard supports **real-time tracking** and provides an overview of the operational state for quick adjustments.

**RQ5 (OT Security & Safety):** Safety is handled via **ISO 10218** (safety requirements for collaborative robots) and **ISO 21919**. It implements **speed and separation monitoring**, where a cobot reduces speed or stops when a human is detected in the collaborative workspace. Security is bolstered by **remote setup capabilities** that reduce the need for physical intervention.

**Key Quote:** "The proposed system leverages the Asset Administration Shell for standardization and reconfigurability, allowing it to adapt seamlessly to various manufacturing tasks without requiring extensive reprogramming."

---

### Analysis of Source: Robot Operating System 2: The need for a holistic security approach to robotic architectures

**APA 7 Reference:** DiLuoffo, V., Michalson, W. R., & Sunar, B. (2018). Robot Operating System 2: The need for a holistic security approach to robotic architectures. _International Journal of Advanced Robotic Systems_, _15_(3), 1–15. https://doi.org/10.1177/1729881418770011

**RQ1 (Actors & Roles):** The source defines the role of a **Security Officer**, who creates policies and submits them for digital signing. It also mentions **System Administrators** who manage management consoles and defines participants as **publishers and subscribers**.

**RQ2 (System Boundaries & I/O):** The system uses a **pub-sub messaging paradigm** over **Data Distributed Services (DDS)**. **Inputs/Outputs** are defined via an **Interface Description Language (IDL)**. Critical missing data flows identified include **Heartbeats** (part of reliability QoS to ensure participants are alive) and **Logging** (supported by a dedicated logging plug-in). It also identifies **Discovery** data as a critical flow that reveals network topology.

**RQ3 (Data Modeling & Standards):** Interoperability is achieved through **DDS** and **IDL**, which provide type-safe operations. The text mentions that ROS 2 abstracts the complexity of IDL to preserve a familiar API.

**RQ4 (Dashboard Architecture):** N/A

**RQ5 (OT Security & Safety):** The source details the **DDS Security extension**, which includes five plug-ins: **authentication, access control (RBAC), cryptographic, logging, and data tagging**. It discusses **Symmetric (AES-GCM)** and **Asymmetric (RSA/ECDSA)** cryptography. It emphasizes the need for a **"Root of Trust"** and **Hardware Security Modules (HSM)** for credential storage.

**Key Quote:** "By taking a holistic security approach... a number of concerns may be identified as potential risks... adding DDS Security alone is not a holistic robotics security model."

---

### Analysis of Source: SCADA FUNDAMENTALS AND APPLICATIONS IN THE IoT

**APA 7 Reference:** Hunzinger, R. (2017). SCADA fundamentals and applications in the IoT. In H. Geng (Ed.), _Internet of Things and Data Analytics Handbook_ (pp. 283–294). John Wiley & Sons, Inc.

**RQ1 (Actors & Roles):** The text identifies **technicians** (who receive real-time notifications on smartphones) and notes that in autonomous scenarios, the **technician could be a robot**. It also refers to **"relevant parties"** as users of the data.

**RQ2 (System Boundaries & I/O):** IoT systems are characterized by **Data access (sensors)**, **Communication**, **Data manipulation (algorithms)**, and **Visualization**. **Inputs** include sensors (pH, temperature, DO) and **enterprise systems** (ERP, CMMS). **Outputs** include **real-time reports**, **mobile visualization**, and **automated workflow triggers** like work orders.

**RQ3 (Data Modeling & Standards):** The source advocates for **Information Modeling** (virtual models) to normalize data from unrelated sources, creating a **"digital identity"** for assets. It specifically identifies **OPC Unified Architecture (UA)** as the foundational open, cross-platform standard for this transition.

**RQ4 (Dashboard Architecture):** The architecture leverages **HTML5** to allow applications to run natively in modern web browsers on **iOS and Android devices**. It emphasizes **custom data visualization** with graphics chosen by the customer.

**RQ5 (OT Security & Safety):** The source mentions the transition from proprietary systems to those needing to **cross firewalls** and operate in the **cloud**. It notes that traditional SCADA provides **codified standards for security** that the IoT is now adopting. It also discusses keeping sensitive data behind firewalls for proprietary protection.

**Key Quote:** "Because a virtual model is completely indifferent to the source of a particular piece of data, the potential for advanced analytics and automation is nearly unlimited."

---

### Analysis of Source: Securing the cyber-physical system: a review

**APA 7 Reference:** Lydia, M., Kumar, G. E. P., & Selvakumar, A. I. (2023). Securing the cyber-physical system: a review. _Cyber-Physical Systems_, 9(3), 193–223. [https://doi.org/10.1080/23335777.2022.2104378](https://doi.org/10.1080/23335777.2022.2104378)

**RQ1 (Actors & Roles):** The text identifies several critical stakeholders, including **operators** who require training via testbeds, **security personnel**, and **technicians** who monitor real-time notifications. It distinguishes between **IT teams**, who focus on information security, and **OT teams**, who focus on availability and functional safety. While it does not explicitly use the term "Device Integrator," it references **system designers** and **experts** responsible for modeling and protecting cyber-physical infrastructures.

**RQ2 (System Boundaries & I/O):** The system is divided into three layers: **Perception** (sensors/actuators), **Transmission** (communication networks), and **Application** (data processing). **Inputs** consist of **telemetry** from terminal equipment (sensors) and **external traffic** probing. **Outputs** include **actuation signals**, **real-time reports**, **mobile visualizations**, and **automated workflow triggers** like work orders. The source identifies missing data flows in traditional models, specifically highlighting the need for **monitoring and logging** (audit logs) and **heartbeats** (synchronization/reliability signals).

**RQ3 (Data Modeling & Standards):** Interoperability is supported through the use of **Information Modeling** to create a **"digital identity"** for assets. Standards mentioned include **OPC Unified Architecture (UA)** as a cross-platform foundational standard, **IEC 61850** for communication networks in electrical grids, and **Asset Administration Shell (AAS)** for manufacturing. It also references **UML (Unified Modeling Language)** for utilizing IoT benefits in manufacturing.

**RQ4 (Dashboard Architecture):** The source mentions the **Human-Machine Interface (HMI)** and **Safety Parameter Display Systems** as the primary visualization layers. It advocates for the use of **HTML5** to allow these dashboards to run natively in modern web browsers on mobile devices (iOS and Android), providing custom data visualizations chosen by the customer. React-specific grid patterns are not mentioned.

**RQ5 (OT Security & Safety):** Extensive details are provided regarding **NIST SP 800-82**, the **NIST Framework for CPS Security**, and **IEC 62443**. Security protocols discussed include **Role-Based Access Control (RBAC)**, **Multi-Factor Authentication (MFA)**, and **Attribute-Based Encryption (ABE)**. **Remote actuation safety** is addressed through impact analysis and the mitigation of **false data injection attacks** targeting controllers that drive physical processes.

**Key Quote:** "Securing the CPS is a challenging task as new threats and cyber-attacks continue to emerge."

---

### Analysis of Source: Smart System Development for Real-Time Container Dispatch Optimization and Strategic Truck Allocation Using Genetic Algorithms

**APA 7 Reference:** Alfaouri, F., & Saleet, H. (2025). Smart system development for real-time container dispatch optimization and strategic truck allocation using genetic algorithms. _Arabian Journal for Science and Engineering_. [https://doi.org/10.1007/s13369-025-10582-3](https://doi.org/10.1007/s13369-025-10582-3)

**RQ1 (Actors & Roles):** The primary human actor is the **logistics manager**, who is responsible for entering **real-time data** (container status, newly arrived containers, operational parameters) and making **strategic decisions** regarding fleet size. Other stakeholders mentioned include **decision-makers** who utilize the output schedules and **customers** who have specific service-level agreements and demand requirements.

**RQ2 (System Boundaries & I/O):** The system boundary encompasses a **smart logistics system** connecting ports to customers. **Inputs** include **real-time container arrival data**, **truck availability data**, **customer data** (transportation/unloading times), and **port policies** (costs/deadlines). **Outputs** consist of an **optimal dispatch schedule** (container-to-truck assignments) and **strategic planning simulations** for long-term fleet adjustments. **Historical dispatch data** is logged for future forecasting.

**RQ3 (Data Modeling & Standards):** Data is modeled using two primary matrices: **Matrix A** (customer data/demand) and **Matrix B** (container stay time at the port). For strategic planning, unpredictable container arrivals are modeled using a **Poisson distribution** to predict future demand. N/A for MQTT Sparkplug B or DTDL.

**RQ4 (Dashboard Architecture):** The architecture includes a **Decision Support Interface/Output schedule** layer that presents optimized results to the manager. While the text suggests the future integration of a **Graphical User Interface (GUI)** as a software application, it does not provide specific details on React or grid-based widget patterns.

**RQ5 (OT Security & Safety):** N/A (The text focuses on efficiency and cost optimization. Safety is only briefly mentioned as a benefit of **single-container dispatches** reducing complexity in loading/unloading, but specific cybersecurity or remote actuation safety protocols are not discussed).

**Key Quote:** "The optimization process involves iterating through each day’s data, updating the number of containers for each customer, and adjusting truck allocation accordingly."

---

# Batch 3 of Sources

# Analysis of Source: (Book)Digital Twin 101.pdf

## Bibliographic Information

- Book TitleThe Digital Playbook
    
- Book SubtitleA Practitioner’s Guide to Smart, Connected Products and Solutions with AIoT
    
- EditorsDirk Slama, Tanja Rückert, Sebastian Thrun, Ulrich Homann, Heiner Lasi
    
- DOIhttps://doi.org/10.1007/978-3-030-88221-1
    
- PublisherSpringer Cham
    
- eBook Packages[Computer Science](https://link.springer.com/search?facet-content-type=%22Book%22&package=11645&facet-start-year=2023&facet-end-year=2023), [Computer Science (R0)](https://link.springer.com/search?facet-content-type=%22Book%22&package=43710&facet-start-year=2023&facet-end-year=2023)
    
- Copyright InformationAIoT User Group 2023
    
- Softcover ISBN978-3-030-88220-4Published: 01 August 2023
    
- eBook ISBN978-3-030-88221-1Published: 31 July 2023
    
- Edition Number1
    
- Number of PagesXIX, 416
    
- Number of Illustrations10 b/w illustrations, 310 illustrations in colour

### **Actors & Roles**

In modern Artificial Intelligence of Things (AIoT) ecosystems, stakeholders assume distinct strategic roles that dictate their focus, business drivers, and technical approaches. The source document delineates two primary roles—the Digital OEM and the Digital Equipment Operator—which are fundamentally defined by their relationship to the product or solution lifecycle. The Digital OEM focuses on creating standardized, smart, connected products for a broad market, while the Digital Equipment Operator concentrates on implementing custom, smart, connected solutions to optimize their internal operations.

The key differentiators between these two strategic roles are summarized below:

|   |   |
|---|---|
|Aspect|Role Differentiators|
||**Digital OEM**|
|**Core Focus**|Smart, connected **PRODUCTS** (e.g., industrial robots, wind turbines, kitchen mixers)|
|**Primary Business Drivers**|Useability / ease-of-use<br>- Subscription revenues (digital services, physical features as a service)|
|**AI Strategy**|Potentially deep Data Science<br>- High potential for new Intellectual Property (IP)|
|**IoT Hardware Approach**|Usually line-fit<br>- Often custom IoT hardware|

Beyond these two central actors, the source identifies other critical stakeholders within the AIoT value chain. The **Platform owner**, as detailed in Chapter 9, occupies a strategic position, controlling intellectual property and access to an ecosystem of producers and consumers without necessarily having to "manufacture or operate the physical assets." Furthermore, the ecosystem diagram for the "ACME Smart Shuttle" (Fig. 14.8) explicitly includes **System Integrators** as key partners responsible for supplying and integrating essential hardware and platform components. These distinct roles and their interactions are foundational, shaping the overall system architecture of any given AIoT initiative.

### **System Boundaries & I/O**

AIoT system boundaries are multi-layered, defining a complex architecture that spans from physical assets operating in the field to centralized cloud infrastructure. The design of these boundaries and the data flows between them are critical for enabling both local and fleet-wide intelligence. The following points deconstruct this architecture and its characteristic data input/output (I/O) patterns as described in the source.

**System Architecture Stack:** Based on the hierarchical model presented in Figure 5.1, a typical IoT architecture comprises the following layers, ascending from the physical world to the cloud:

- **Physical assets:** The physical products, equipment, or edge appliances in the field.
- **Sensors / Actuators:** Components for data collection and control of the physical assets.
- **Edge Nodes:** Compute nodes integrated with sensors and physical assets.
- **Edge Infrastructure:** Small, distributed data centers deployed on-site or in the field.
- **IoT / Edge Gateways:** Devices providing protocol translation, filtering, and secure remote communication.
- **Cloud:** Large, centralized data centers for processing, storage, and analytics.

**Core Data Flow Patterns:**

- A fundamental distinction in data processing is made between **asset intelligence** and **swarm intelligence**. Asset intelligence is achieved via edge computing, where AI algorithms are applied to data that is locally captured and processed on a single device. In contrast, swarm intelligence is enabled via cloud computing, where AI is applied to data aggregated from a fleet of multiple assets to derive broader insights (p. 7).
- The Digital Twin concept exemplifies a core data flow pattern (Fig. 4.4). **Sensor data** is collected from a "Real-world entity" and used for the "Reconstruction of physical reality," creating a "Virtual representation." This semantically rich virtual model then serves as the primary input for AI applications that drive business logic and outcomes.

**Specific I/O Examples:**

- The Digital Twin for a high-power inverter (Fig. 4.10) illustrates a complex I/O model. Key **inputs** include "Operating Data" (e.g., current, voltage), "External Data" (e.g., vehicle temperature), and data from both "Physical Sensors" (e.g., temperature, mechanical stress) and "Virtual Sensors" (derived from mathematical models). The AI model processes these inputs to generate critical **outputs** like a "Health indicator" for vehicle status monitoring and "Prognostics management" for predictive maintenance.
- A simpler I/O pattern is described for an intelligent vibration sensor (p. 24). The system's input is the continuous vibration data. When a predefined threshold is exceeded, this triggers an **output**: a notification event and a sample data packet are sent to the backend system for root cause analysis.

These data flows, from simple triggers to complex digital twin reconstructions, are contingent on well-defined data models that provide structure and meaning.

### **Data Modeling & Standards**

While the source material does not reference specific data modeling standards such as ISA-95 or protocols like Sparkplug B, it provides a clear framework for data categorization and repeatedly emphasizes the critical need for common, standardized data models to enable interoperable ecosystems.

1. **AIoT Data Categories** The "Digital Playbook" framework defines five main categories of AIoT data, each suited to different AI methods and use cases, as detailed in Figure 3.10:
    - **Snapshot:** A single, complex data snapshot, such as images for optical inspection. Applicable AI methods include `CNNs`, `Pretrained Models (ResNet, AlexNet, MobileNet)`, and `Autoencoder`.
    - **Event Series:** Typed, binary events with timestamps, often sorted by order of reception, such as machine event data. This category is suitable for `Sequence prediction`, `LSTM/GRU/RNN`, `Bayesian Network`, and `Markov chain` algorithms.
    - **Basic Sensor Reading:** A time series with a single dimension, such as data from an electricity smart meter. It is primarily used for `Forecasting` (e.g., BDM, AF, MA, AR, ARMA, ARIMA) and `Anomaly Detection` (e.g., Density, HMMs, SVM).
    - **Panel Data:** A time series with multiple dimensions from different basic sensors, with a particle collider cited as an example. Relevant AI methods include `Basic OLS Models`, `FFNN`, and `CNN`.
    - **Complex Panel Data:** A time series with multiple dimensions originating from different high-resolution sensors, such as data for autonomous driving or video surveillance. This data type is often processed using `CNNs`.
2. **Need for Common Models and Standards** An expert from the TM Forum highlights the necessity of industry collaboration to develop "open standards" and "common data models" (p. 56-57). This is presented as essential for managing the "friction between Telco, IoT, Cloud and vertical applications." Without such standards, creating open, interoperable ecosystems becomes exceedingly difficult, leading to vendor lock-in and hindering innovation.
3. **Other Data Constructs** The text also mentions other data-related constructs from the product lifecycle management (PLM) domain, including the **Engineering Bill of Material (EBOM)** and the **Manufacturing Bill of Material (MBOM)** (p. 20), which provide structural data about a product's design and assembly.

How this categorized and modeled data is ultimately presented to users through interfaces like dashboards is a critical factor for usability and delivering business value.

### **Dashboard Architecture**

The source provides limited but specific examples of user interface (UI) architecture, focusing on two distinct patterns: a centralized, card-based dashboard for data analytics and a distributed Human-Machine Interface (HMI) for consumer product control.

- **Card-Based Dashboard Example:** A soccer analytics dashboard is depicted on page 39. Its architecture is organized around a clear, hierarchical structure. A vertical navigation menu on the left side provides access to primary sections like "Home," "Match Analysis," "Training," and "Medical." The main content area utilizes a card-based, grid-like layout to display discrete information widgets. These cards present key performance indicators for "Statistics," star-based "Coach evaluations," and a visual representation of a player's physical status under "Medical."
- **Distributed HMI Strategy:** The HMI architecture for the "ACME:Vac" vacuum robot (Fig. 22.11) demonstrates a deliberate strategy of distributing user interaction across multiple touchpoints. The physical device itself features a minimal HMI, limited to essential functions like "Status LEDs" and a "Reset Button." The primary interface for control, including scheduling and floor plan management, is a dedicated "Mobile App." This is supplemented by a third layer of interaction through "Smart Home" integration, which supports simple, ad-hoc commands.

Although the concept of dashboards is mentioned in other contexts, such as for visualizing predictive maintenance data (p. 375), the source provides no other visual examples or detailed architectural descriptions of these user interfaces.

### **OT Security & Safety**

While the source does not reference specific standards like Role-Based Access Control (RBAC) or the IEC 62443 series, it addresses the critical domains of Operational Technology (OT) security and safety through strategic frameworks and practical application examples.

**Security of Remote Actuation:** The security of remotely controlling physical systems is illustrated with the "Dog Mode" vehicle example (p. 53), which allows a user to manage features like windows and cooling via a smartphone. Security for such remote actuation is enforced by a strict governance model: apps available in the vehicle's app store can only be provided by the OEM or trusted tier 1 suppliers. This closed-ecosystem approach ensures that the OEM maintains full control over the Quality Assurance (QA) cycle for any software that can interact with vehicle hardware, a measure deemed critical from both a security and a safety perspective.

**DevSecOps Framework:** Chapter 25 advocates for adopting a **DevSecOps** model, which integrates security practices directly into every phase of the DevOps cycle, from design to deployment and operations. A core practice within this framework is **Threat Modeling**, used to identify and prioritize security threats from an attacker's point of view. The text also cites specific technical security measures that can be implemented as part of this strategy, including **firewalls**, hardware-based security like a **Trusted Platform Module (TPM)**, and application testing methods like **Dynamic Application Security Testing (DAST)**.

**Functional Safety:** The document repeatedly acknowledges **functional safety** as a critical real-world requirement for AIoT products, particularly in automotive and industrial contexts (p. 261, 291). However, beyond its identification as a key consideration, the specific implementation details of achieving functional safety are not covered in the provided excerpts.

**Key Quote:** `"Perhaps the most important lesson learned in this project is that due to insufficient data for generic, end-to-end ML solutions, a low-cost solution for Predictive Maintenance of heterogeneous industrial environments is not realistic."`

---

# Analysis of Source: The Internet of Production

This document provides a structured analysis of the source text, _The Internet of Production: Interdisciplinary Visions and Concepts for the Production of Tomorrow_. The analysis is strictly confined to the information presented within the provided excerpts.

## Bibliographic Information

- Book TitleInternet of Production
    
- Book SubtitleFundamentals, Methods and Applications
    
- EditorsChristian Brecher, Günther Schuh, Wil van der Aalst, Matthias Jarke, Frank T. Piller, Melanie Padberg
    
- Series Title[Interdisciplinary Excellence Accelerator Series](https://link.springer.com/series/16852)
    
- DOIhttps://doi.org/10.1007/978-3-031-44497-5
    
- PublisherSpringer Cham
    
- eBook Packages[Engineering](https://link.springer.com/search?facet-content-type=%22Book%22&package=11647&facet-start-year=2024&facet-end-year=2024), [Engineering (R0)](https://link.springer.com/search?facet-content-type=%22Book%22&package=43712&facet-start-year=2024&facet-end-year=2024)
    
- Copyright InformationThe Editor(s) (if applicable) and The Author(s) 2024
    
- Hardcover ISBN978-3-031-44496-8Published: 30 December 2023
    
- Softcover ISBN978-3-031-44499-9Published: 30 December 2023
    
- eBook ISBN978-3-031-44497-5Published: 29 December 2023
    
- Series ISSN2731-4995
    
- Series E-ISSN2731-5185
    
- Edition Number1
    
- Number of PagesXXXV, 521
    
- Number of Illustrations20 b/w illustrations, 140 illustrations in colour
    
- Topics[Industrial and Production Engineering](https://link.springer.com/search?facet-sub-discipline=Industrial%20and%20Production%20Engineering&facet-content-type=Book), [Data Structures and Information Theory](https://link.springer.com/search?facet-sub-discipline=Data%20Structures%20and%20Information%20Theory&facet-content-type=Book), [Materials Science, general](https://link.springer.com/search?facet-sub-discipline=Materials%20Science,%20general&facet-content-type=Book), [Production](https://link.springer.com/search?facet-sub-discipline=Production&facet-content-type=Book), [Logistics](https://link.springer.com/search?facet-sub-discipline=Logistics&facet-content-type=Book), [Supply Chain Management](https://link.springer.com/search?facet-sub-discipline=Supply%20Chain%20Management&facet-content-type=Book)

### **Actors and Roles**

N/A

### **System Boundaries and Data Flow Architecture**

The source text outlines a complex data architecture for the Internet of Production (IoP) designed to overcome the challenges of traditional manufacturing information systems. The key elements of this architecture, its boundaries, and its data flows are detailed below:

- **OT-IT Integration Challenge:** A primary challenge addressed by the IoP architecture is the historical separation of Operational Technology (OT) and Information Technology (IT). Traditional manufacturing systems often prevent external IT systems from accessing sensor and actuator data, limiting opportunities for advanced data analytics and condition monitoring.
- **Hierarchical Data Processing Topology:** Data originates from sensors and actuators on the shop floor, which can generate enormous data volumes at high frequencies. To manage this, the architecture employs a multi-level topology of edge, fog, and cloud computing nodes. This distributed infrastructure allows for a continuous query to be partitioned across the network, enabling data reduction, condensation, and analysis at various points—from the edge (close to the data source) to centralized cloud data centers.
- **Centralized Data Repository:** A core concept within the IoP is the "data lake," which serves as a centralized, scalable repository for all historical production data. It is designed to address the challenges of fragmented computing and storage resources found in today's data processing systems. Implemented as a distributed system with centrally controlled storage, the data lake provides a flexible and agile infrastructure that can adapt to the inconsistent data bursts characteristic of manufacturing processes.
- **Communication Standards and Protocols:** The system relies on standardized interfaces for communication and data exchange. The text explicitly mentions the use of **MQTT**, which connects a runtime monitor to a message broker for its verification task, and **OPC UA**, which provides standardized interfaces for communication, such as request/reply communication, service discovery, and communication security.
- **Diverse Data Source Integration:** The architecture is designed to integrate data from a wide variety of sources to create a holistic view of the production process. This includes not only machine and sensor data but also information from enterprise-level systems such as Enterprise Resource Planning (ERP), Customer Relationship Management (CRM), Product Lifecycle Management (PLM), and Manufacturing Execution Systems (MES).

### **Data Modeling and Standards**

The terms "ISA-95" and "Sparkplug B" are not mentioned in the provided source context. The text instead describes several other data modeling concepts, schemas, and standards to achieve interoperability and semantic consistency.

- **Object-Centric Event Log (OCEL):** Identified as a standard format for the storage and exchange of object-centric event data. It provides the foundation for process mining techniques that can analyze the interactions between different object types (e.g., machines, products) in a production process.
- **Web Ontology Language (OWL):** Utilized for developing a common definition of semantic dependencies. Ontologies built with OWL provide a standardized and formalized description of knowledge and the relationships between various assets in production, including materials, processes, and products.
- **Specific Ontologies:** The source identifies a key problem in production ontologies: numerous existing models, such as the **ADACOR** ontology, are "not harmonized," considered "lightweight," and are "hardly be configurable and mutually interoperable." To address this, the **Elementary Multiperspective Material Ontology (EMMO)** is presented as a solution. EMMO is a foundational ontology that provides "the framework for standardized integration and a modular, re-useable configuration of a variety of domain ontologies."
- **Digital Shadow Reference Model:** Defined as a UML class model that provides a conceptual framework for Digital Shadows. It is designed for purposefully collecting, aggregating, and abstracting production data enriched with meta-information to support decision-making.
- **Asset Administration Shells (ASS):** Mentioned as a focus of the "Infrastructure" research within the IoP. An ASS provides a standardized method for defining and establishing connectivity to an Industry 4.0 asset, functioning either passively to provide information or actively as a communication interface.
- **FactDAG Interoperability Model:** This model is presented as an adaptation and extension of the FAIR (Findable, Accessible, Interoperable, and Reusable) data principles for industrial data. It uses a directed, acyclic graph (DAG) of immutable data elements ("Facts") to ensure data provenance and quality.
- **LISSU:** A proposed approach that allows for the description of sensor-produced data to ensure semantic correctness. Its purpose is to validate that a Digital Shadow consuming a data stream interprets the data correctly, thereby preventing errors that could arise from hardware changes. For example, LISSU can prevent manufacturing errors by verifying that both parties understand a value from a changed temperature sensor as Celsius rather than Fahrenheit.

### **Dashboard Architecture and UI Patterns**

The source text describes and illustrates several applications and decision support tools that utilize dashboard-style user interfaces, although it does not delve into the specific technical implementation of these UIs. The overarching concept is the **Production Control Center**, depicted in Figure 16.1, which shows a user interacting with a set of interlinked applications on multiple screens. This central hub is designed for long-term production management and provides data-driven transparency through dashboards such as a **Supply Chain Cockpit**, a **Site Selection** app using maps for geographic analysis, a **Best Practices Sharing** app, and a **Sustainable Footprint Design** tool. The various app prototypes shown in other figures (e.g., Fig. 5.9, Fig. 16.2, Fig. 16.3) display common UI patterns for data visualization, including process flow diagrams to illustrate manufacturing steps, charts to compare performance metrics, and lists to present procurement data. These visualizations are intended to provide decision-makers with actionable insights derived from the underlying data lake. Specific technical UI architecture terms, such as "grid layouts," are not mentioned in the text.

### **Operational Technology Security and Safety**

The terms "RBAC" (Role-Based Access Control) and "IEC 62443" are not mentioned in the provided source context. However, the text does address network security and system safety as critical requirements for the IoP.

- **Core Security Mandate:** The source establishes that strong network security is essential to prevent cyberattacks that could lead to production outages or physical harm to humans.
- **Publish/Subscribe Security:** A specific challenge noted is securing the end-to-end communication within the publish/subscribe paradigm common in modern industrial communication. The **ENTRUST** approach is mentioned as a solution that transparently enables this secure communication and integrates into existing infrastructures.
- **Security for Constrained Devices:** The document recognizes that the unique characteristics of industrial settings, particularly the resource constraints of many devices, require the adaptation of traditional security paradigms.
- **Message Authentication:** The source cites research that enables efficient message authentication for short messages and methods to speed up the computation of message authentication tags in the latency-critical input-dependent part, addressing the needs of resource-constrained industrial environments.
- **Human-Robot Collaboration (HRC) Safety:** Safety is explicitly discussed as a primary challenge in HRC scenarios, where humans and robots share a workspace and interact closely.
- **Runtime Monitoring for Safety:** A rudimentary fail-safe mechanism is described, implemented as a **nonintrusive runtime monitoring algorithm**. This monitor observes the Cyber-Physical Production System (CPPS) and can force it to halt and enter a safe state if a violation of a monitored requirement is detected.

### **Key Quote**

"In this chapter, we illustrated how to realize the IoP’s vision of integrating data from human experts, machines, and processes across the design, manufacturing, and use cycle to transform data into actionable insights."

---

# Analysis of Source: (Spec) sparkplug-specification-3.0.0.pdf

### Actors & Roles

N/A

### System Boundaries & I/O

Based on the provided specification, the system's architecture, data flows, and state management are defined by the following core principles:

- **Data Flow:** The architecture specifies a bi-directional communication model arbitrated by an MQTT Server.
    - **Data Publishing:** Sparkplug Edge Nodes (acting as Edge of Network gateways) and associated Devices publish data messages, designated as `NDATA` and `DDATA` respectively, to Host Applications.
    - **Command Publishing:** Conversely, Host Applications publish command messages, `NCMD` and `DCMD`, back to the Edge Nodes and Devices.
- **Telemetry Model:** The primary model for telemetry is **Report by Exception (RBE)**. This principle dictates that data is published only when values change. This approach is recommended to ensure bandwidth efficiency, although the specification notes that periodic publishing is not explicitly disallowed for special circumstances.
- **System Functions & State:** The system relies on a robust session management mechanism to maintain continuous state awareness.
    - **Birth Certificates:** When a component comes online, it establishes its session and data model by publishing a Birth Certificate (`NBIRTH` for nodes, `DBIRTH` for devices, `STATE` for host applications). This message serves as the definitive, self-describing record of all metrics the component will ever report, creating the complete data model upfront. This initial schema declaration is what enables the high-efficiency 'Report by Exception' model for all subsequent data messages. While `NBIRTH` and `DBIRTH` use a Protocol Buffer payload, the `STATE` message for host applications uses a JSON payload to denote its online status.
    - **Death Certificates:** To ensure awareness of ungraceful disconnects, Death Certificates (`NDEATH`, `DDEATH`, `STATE`) are registered as the "Will Message" during the initial MQTT connection. The MQTT Server delivers this message to subscribers if the client's session terminates unexpectedly, providing continuous and reliable session state information.

### Data Modeling & Standards

The specification outlines a precise set of standards for data modeling and payload encoding to ensure interoperability.

- **Primary Standard:** The document normatively defines the **Sparkplug B** payload. This payload is encoded using **Google Protocol Buffers**, a language-neutral, platform-neutral mechanism for serializing structured data.
- **Payload Structure:** The Sparkplug B payload definition supports a rich data model through several key components defined in its schema, including:
    - `Metric`: Represents a single data point or tag, including its name, value, datatype, and timestamp.
    - `DataSet`: Encodes matrices of data, similar to a table with columns and rows.
    - `Template`: Allows for the creation of complex, user-defined data types (UDTs).
    - `PropertySet`: Enables the inclusion of custom key-value metadata for any metric.
    - Metric aliases are also supported to minimize bandwidth; after being defined with a full string name in a BIRTH message, subsequent `NDATA` or `DDATA` messages can refer to the metric using a much smaller integer alias, significantly reducing payload size.
- **Deprecated Standards:** The document explicitly states that the **Sparkplug A** payload definition has been omitted from the specification and is no longer supported due to a lack of adoption and the availability of the more capable Sparkplug B definition.
- **Unmentioned Standards:** The industry standard **ISA-95** is not mentioned in the provided source text.

### Dashboard Architecture

N/A

### OT Security & Safety

The specification addresses security by defining its scope and deferring to established industry standards rather than introducing its own normative security protocols.

- **Primary Stance:** The document's official position, stated in section 1.7, is that "Security is not directly addressed in the Sparkplug Specification with normative statements." It clarifies that Sparkplug relies on the security features inherent to the underlying protocols it utilizes, such as MQTT and TCP/IP. It provides non-normative examples of using Transport Layer Security (TLS) for encryption.
- **Authorization:** The specification includes a non-normative recommendation for implementing authorization. This involves leveraging **Access Control Lists (ACLs)** on the MQTT Server. ACLs can be configured to restrict specific clients, ensuring they can only publish or subscribe to authorized topic namespaces (e.g., allowing an Edge Node to publish only to its own topics), which helps prevent spoofing.
- **Unmentioned Topics:** The following security-related topics are not mentioned in the provided text:
    - RBAC (Role-Based Access Control)
    - Remote actuation safety
    - IEC 62443

### Key Quote

"The intent and purpose of the Sparkplug Specification is to define an MQTT Topic Namespace, payload, and session state management that can be applied generically to the overall IIoT market sector, but specifically meets the requirements of real-time SCADA/Control HMI solutions."

---

### Analysis of Source: A health digital twin framework for discrete event simulation based optimised critical care workflows

**APA Reference:** Kuruppu Appuhamilage, G. D., Hussain, M., Zaman, M., & Khan, W. A. (2025). A health digital twin framework for discrete event simulation based optimised critical care workflows. _NPJ Digital Medicine, 8_(1738). https://doi.org/10.1038/s41746-025-01738-4

**RQ1 (Actors & Roles):** The source identifies multiple professional agents interacting within the system, including doctors, nurses, paramedics, pharmacists, physiotherapists, porters, managers, and discharge specialists. It specifically distinguishes between doctors, who often perform unstructured tasks, and nurses or pharmacists, whose work patterns are heavily structured. For the system interface, the study defines three distinct user roles: **managers**, **administrators**, and **staff**. Administrators are responsible for managing staff access, creating users, and overseeing resource usage, while staff members interact directly with digital twins to create, read, and update data.

**RQ2 (System Boundaries & I/O):** The system uses **telemetry events** triggered by edge devices, with each payload containing discrete time intervals (start and end timestamps) and masked identification data for patients and staff. **Inputs** include data from barcode readers (simulating IoT interfaces), online dashboards (simulating observation forms), and manual paper entries. **Outputs** consist of real-time reports via a web-based graphical user interface, including bed acuity levels, task completion times, and patient costs. The framework also captures "trigger events" associated with internal service state changes, such as digital twin updates.

**RQ3 (Data Modeling & Standards):** The framework utilizes **Digital Twins Definition Language (DTDL) v2** to describe twin properties and relationships as JSON files. It incorporates healthcare standards for communication and security, specifically mentioning **Health Level Seven (HL7)** and **DICOM**. The data model is structured into a "Physical Digital Twin Layer" (representing tangible objects like scanners and units) and a "Conceptual Digital Twin Layer" (representing domain entities like roles, workflows, and tasks).

**RQ4 (Dashboard Architecture):** The system employs a **web-based dashboard** that provides an authenticated interface for users to interact with conceptual digital twins. The dashboard is used to visualize "recent activity" and "allocated patients," and it was designed to be secure and familiar by enabling Microsoft login. While it mentions visualization tools for tracking device status and bed acuity, specific React-based patterns like "React Grid Layout" are not detailed.

**RQ5 (OT Security & Safety):** Security is established through **Azure Entra**, which establishes secure, symmetric-key-based applications for endpoints. End-user access is granted via temporary emails and authenticated through the **Microsoft Authenticator app** or passwords. The system also utilizes **Microsoft Defender for Cloud** to identify malicious activities at the API endpoints. To ensure patient safety, the framework focuses on identifying "fault points" and comparing actual clinical activity against "ideal" practice.

**Key Quote:** "The physical digital twin layer represented twins associated with tangible objects... The conceptual digital twin layer represented twins of key domain entities, such as roles (nurses, consultants), workflows, observations, and tasks."

---

### Analysis of Source: A review on WSN based resource constrained smart IoT systems

**APA Reference:** Hudda, S., & Haribabu, K. (2025). A review on WSN based resource constrained smart IoT systems. _Discover Internet of Things, 5_(56). https://doi.org/10.1007/s43926-025-00152-2

**RQ1 (Actors & Roles):** The text describes a tri-sectional relationship between **humans**, **objects**, and the **internet**. It mentions "end users" who interact with IoT applications through user interfaces to monitor and control devices. In specific domains like smart agriculture, the "farmer" is the actor who uses collected data to make informed decisions and optimize yields.

**RQ2 (System Boundaries & I/O):** The system boundary consists of spatially distributed sensor nodes, microcontrollers, communication modules, and a **sink node** (base station) that acts as the interface to the internet. **Inputs** are physical environmental parameters like temperature, humidity, and motion captured as analog data and converted to digital signals. **Data flows** follow a workflow of sensing, processing, transmission to the sink node, aggregation, and finally forwarding to cloud/edge servers for analysis. **Outputs** include automated responses, alerts, or notifications sent back to users or triggered through **actuators**.

**RQ3 (Data Modeling & Standards):** The source mentions the use of various communication protocols such as **Zigbee, Bluetooth, Wi-Fi, LoRa, and 6LoWPAN**. It also notes that while many architectures exist (3-layer, 4-layer, 7-layer), a **standardized framework and architecture** for smart IoT systems is still missing. Specific standards like DTDL or Sparkplug B are not detailed in this text.

**RQ4 (Dashboard Architecture):** The study highlights that IoT applications require **user interfaces (UIs)** for monitoring, data visualization, and manual control. These are implemented via mobile apps, dashboards, or web-based interfaces. There is no mention of React-specific grid layouts or widget patterns.

**RQ5 (OT Security & Safety):** The source identifies major security risks including **Denial-of-Service (DoS)**, node tampering, and unauthorized data interception. It emphasizes the need for **lightweight cryptosystems** for resource-constrained nodes, as traditional public cryptosystems like RSA are too computationally demanding. It mentions specific security protocols like the **Anonymous Lightweight Authentication Method (ALAM)** and the use of **Software Defined Networking (SDN)** as a primary defense for identifying abnormalities.

**Key Quote:** "The base station serves as a central hub that gathers information from multiple sensor nodes, processes the data, and forwards it to a remote server or cloud platform for further analysis."

---

### Analysis of Source: Access Control Integration in Sparkplug-Based Industrial Internet of Things Systems: Requirements and Open Challenges

**APA Reference:** Colombo, P., & Ferrari, E. (2024). Access control integration in sparkplug-based Industrial Internet of Things systems: Requirements and open challenges. _Proceedings of the 20th International Conference on Web Information Systems and Technologies (WEBIST 2024)_, 380-384. ISBN: 978-989-758-718-4

**RQ1 (Actors & Roles):** The source identifies specialized MQTT clients as the primary actors: **Edge Nodes** (gateways for devices like PLCs and sensors), **Primary Applications** (SCADA/IIoT hosts that monitor and issue commands), and **Secondary Applications** (MES, Historians, and Analytics that process data). It notes that Primary Applications should have full access to metrics and control signals, whereas Secondary Applications should be restricted from control-related metrics.

**RQ2 (System Boundaries & I/O):** The system architecture includes an MQTT server routing messages between edge nodes and applications. **Inputs/Outputs** are defined by Sparkplug message types: **NBIRTH/DBIRTH** (online notification), **NDATA/DDATA** (value changes), and **NCMD/DCMD** (control commands). The **payload** aggregates "metrics" which represent diagnostics, state values, and metadata. Data flow follows a **Report-by-Exception (RbE)** strategy where information is only published upon change to save bandwidth.

**RQ3 (Data Modeling & Standards):** Sparkplug is defined as an open-source software specification that standardizes **state management**, **message topic structures**, and **payload formatting** (encoding) for IIoT. It is explicitly recognized as an **ISO standard** (ISO/IEC 20237:2023). The specification provides vendor-neutral data formats to ensure interoperability between heterogeneous devices.

**RQ4 (Dashboard Architecture):** N/A. The source focuses on access control and messaging protocols rather than UI/dashboard design.

**RQ5 (OT Security & Safety):** The text argues that basic **Access Control Lists (ACLs)** provided by Sparkplug are insufficient because they are coarse-grained (topic-based). It proposes **fine-grained access control** at the "metric" level, using the **Principle of Least Privilege** to ensure subjects only access necessary data. It discusses the need for an **enforcement monitor** to intercept messages and remove unauthorized metrics before they reach a subscriber. The paper also mentions that unauthorized control can lead to **personal safety hazards** and equipment damage.

**Key Quote:** "In Sparkplug systems, the granularity level should be finer-grained... authorized views of Sparkplug messages should substitute the original messages, from which the unauthorized metrics will be removed/obfuscated."

---

### Analysis of Source: Big data and machine learning: A roadmap towards smart plants

**APA Reference:** Dorneanu, B., Zhang, S., Ruan, H., Heshmat, M., Chen, R., Vassiliadis, V. S., & Arellano-Garcia, H. (2022). Big data and machine learning: A roadmap towards smart plants. _Frontiers of Engineering Management, 9_(4), 623–639. https://doi.org/10.1007/s42524-022-0218-0

**RQ1 (Actors & Roles):** The source defines the **Human–Cyber–Physical System (HCPS)**, where human intervention is reduced to a minimum but remains an "inevitable component". It discusses a division of work where humans and intelligent machines (like **inspector robots**) cooperate in a symbiosis. Within the software architecture, it defines **software agents** (rational, monitoring, control, inspection, and learning agents) that perform specific autonomous tasks.

**RQ2 (System Boundaries & I/O):** The system boundary includes a **Physical Layer** (process units, wireless sensors, actuators, controllers, and robots) and a **Cyber Layer** (wireless network, data centres, and model libraries). **Inputs** consist of real-time streams from Massive WSNs and historical process data. **Outputs** include self-regulation signals for assets, early warnings, and visualizations for human operators. Data flows are managed through a **massive connectivity resilient communication network**, often utilizing 5G to reduce latency.

**RQ3 (Data Modeling & Standards):** The text highlights the need for **global standards and data sharing protocols**. It mentions existing ontologies for data integration: **ISO 15926** (for long-term data exchange), **OntoCAPE** (modular ontology for process engineering), and **PetroHAZOP** (for hazard analysis). It also discusses **Web Ontology Language (OWL)** as the formal language for encoding these knowledge structures.

**RQ4 (Dashboard Architecture):** While not mentioning React, the source describes a **Virtual Reality (VR) system** for "visualisation and interaction" between the human operator and the cyber layer. Decisions made by the rational agent are sent to operators for final confirmation via the **VR module**.

**RQ5 (OT Security & Safety):** The roadmap includes **cyber-security** as a key technology for Industry 4.0. It emphasizes **safety hazards** for operators and the environment, noting that technology must help prevent human errors to stop chain reactions leading to catastrophic failures. The architecture incorporates **fault detection and prediction** modules to safeguard industrial assets. It also identifies **legal and data privacy issues** as critical challenges for sustainable business models.

**Key Quote:** "The connection between the virtual (cyber) world and the real (physical) world provides the ability to create and update real-time virtual representations of physical assets to populate a digital twin..."

---

**Analogy for the Fleet Management System (based on the collective sources):** Managing a heterogeneous fleet of Industry 4.0 devices is like operating a high-tech hospital. You have **Specialists (Integrators)** who design the specific treatment plans and map the medical equipment, and **Duty Staff (Operators)** who monitor the live patient vitals on their screens. To keep everything safe and running, you need a **Universal Translator (Sparkplug/DTDL)** so that a heart monitor and a ventilator can talk to the same system, and a **Strict Security Guard (Access Control)** who ensures that only the authorized doctor can change a medication dosage, while the billing department can only see the anonymized records.

---

### Analysis of Source: COGNIMAN Digital Twin Architecture for Flexible Manufacturing

**APA Reference:** Belbachir, A., Ortiz, A. M., Belbachir, A. N., Mallouli, W., Lam, A. N., Srivastava, A. K., & Hemmer, M. (2025). COGNIMAN digital twin architecture for flexible manufacturing. _Journal of Intelligent Manufacturing_. https://doi.org/10.1007/s10845-025-02625-1

**RQ1 (Actors & Roles):** The architecture explicitly integrates human roles, distinguishing between **operators**, **technical developers**, and **administrators**. The **Human Operator** focuses on process optimization and automation within their domain without needing ICT expertise. The **Human Technical Developer** includes "Toolbox Component Developers" (creating individual system components) and "Machining Engineers" (integrating components for machining constraints). The **Human Administrator** manages the platform, user accounts, and permissions.

**RQ2 (System Boundaries & I/O):** The system is divided into seven layers: Physical Twin, Data Layer, Digital Twin Representation, Service Layer, User Interface, Connectivity and Integration, and Ethics. **Inputs** include real-time video streams from grayscale cameras, temperature sensors, and actuator feedback. **Outputs** consist of automatic defect detection alerts, visualization of system behavior, and control signals such as "stop/continue" actions sent to manufacturing machines.

**RQ3 (Data Modeling & Standards):** The architecture adheres to **ISO 23247** (Digital Twin framework for manufacturing), **ISO/TC184**, and **IEC TC65** for interoperability. It mentions the use of **Knowledge Graphs (KG)**, **Ontologies**, and **Asset Administration Shells (AAS)** for structured data representation. Additionally, it identifies the **Digital Twin Definition Language (DTDL)** in the context of Azure Digital Twins.

**RQ4 (Dashboard Architecture):** The User Interface layer utilizes **React JS** for the Human-Machine Interface (HMI). The interface is designed to support different levels of expertise and provides tools for parameter configuration and reporting. While it mentions visualization via dashboards and 2D/3D tools, it does not specify "React Grid Layout" or specific widget patterns.

**RQ5 (OT Security & Safety):** The system prioritizes **Security, Safety, and Privacy (SSP)** through **Role-Based Access Control (RBAC)** mechanisms at the data layer to restrict access to sensitive information. It employs **VPN connections** and secure protocols for data transmission, ensuring compliance with **GDPR** by removing Personally Identifiable Information (PII). For safety, the "human-in-the-loop" approach allows operators to intervene during critical events, such as stopping production upon defect detection.

**Key Quote:** "The COGNIMAN architecture... explicitly integrating human roles, including operators, developers, and administrators, ensuring collaborative decision-making and adaptive responses."

---

### Analysis of Source: Cloud based manufacturing: A review of recent developments in architectures, technologies, infrastructures, platforms and associated challenges

**APA Reference:** Gharibvand, V., Kolamroudi, M. K., Zeeshan, Q., Çınar, Z. M., Sahmani, S., Asmael, M., & Safaei, B. (2024). Cloud based manufacturing: A review of recent developments in architectures, technologies, infrastructures, platforms and associated challenges. _The International Journal of Advanced Manufacturing Technology, 131_, 93–123. https://doi.org/10.1007/s00170-024-12989-y

**RQ1 (Actors & Roles):** The source identifies stakeholders including **manufacturing companies**, **product designers**, **customers**, and **manufacturing brokers**. It also notes that manufacturing resources include human resources such as **technicians and engineers** who can control resources remotely.

**RQ2 (System Boundaries & I/O):** The architecture includes four basic layers: Resource Layer, Virtual Resource Layer, Core Service Layer, and Application Layer. **Data flows** involve task decomposition, service search matching, execution monitoring, and evaluation feedback. The system uses **IIoT Gateways** to unify timestamped manufacturing data from field-level equipment. **Outputs** include real-time information for sales order management, material requirements planning, and business intelligence.

**RQ3 (Data Modeling & Standards):** The text mentions **ISO 10303 (STEP)** for distributed manufacturing collaboration. It highlights **OPC UA**, **MTConnect**, and **REST APIs** as protocols used by IIoT gateways to transform raw field-level data into meaningful information. It also discusses **System-Oriented Architecture (SOA)** as a backbone for interoperability.

**RQ4 (Dashboard Architecture):** The review mentions a "**Cloudlet architecture for dashboard**" to support interactive Web 3.0 applications. It emphasizes that platforms must have a **customizable user interface** that caters to each type of user and role to boost productivity. No specific mention of React-based grid layouts is provided.

**RQ5 (OT Security & Safety):** Security is described as a critical challenge, requiring robust systems to protect private data exchanged between suppliers and customers. The paper suggests that cloud platforms should provide end users with **customizable security policies**. It also identifies **Blockchain** as a potential technology for rapid and safe global payments.

**Key Quote:** "Each CMfg platform must include, at the very least, the capabilities necessary to allow connectivity among the many manufacturing resources available in the system, including the effective flow of the important information."

---

### Analysis of Source: Cooperative IoT Data Sharing With Heterogeneity of Participants Based on Electricity Retail

**APA Reference:** Wang, B., Guo, Q., Xia, T., Li, Q., Liu, D., & Zhao, F. (2024). Cooperative IoT data sharing with heterogeneity of participants based on electricity retail. _IEEE Transactions on Industrial Informatics_.

**RQ1 (Actors & Roles):** The primary actors are **Electricity Retailers** (acting as data buyers/demanders) and **Data Brokers** (acting as data sellers/suppliers). **End users** are identified as the sources of IoT data (generated by smart meters).

**RQ2 (System Boundaries & I/O):** The system manages the flow of **IoT data** from end users to data brokers, who process it into "data services" for electricity retailers. **Inputs** include smart meter data and market prices. **Data flows** involve electricity retailers issuing Day-Ahead (DA) bids to market operators based on improved load forecasting derived from the broker's data.

**RQ3 (Data Modeling & Standards):** The source mentions **Distributed Ledger Technologies (DLTs)** and **Blockchains** as tools to record the history of IoT data sharing and ensure transparency. Standards like Sparkplug B or ISA-95 are not mentioned.

**RQ4 (Dashboard Architecture):** The text includes a conceptual diagram showing a "**Dashboard for Break notification & Visualization**" within the user interface layer. There is no detail regarding its internal architecture, grid systems, or React.

**RQ5 (OT Security & Safety):** For security, the paper discusses **digital watermarking** on IoT data to protect copyright and deter privacy disclosure. It also suggests a **third-party regulatory platform** to conduct security checks of power systems after data sharing to prevent regulation violations.

**Key Quote:** "As the data sharing involves data buyers and sellers, their heterogeneous contributions should be simultaneously considered."

---

### Analysis of Source: Developing real-time IoT-based public safety alert and emergency response systems

**APA Reference:** Zhang, H., Zhang, R., & Sun, J. (2025). Developing real-time IoT-based public safety alert and emergency response systems. _Scientific Reports, 15_(1738). https://doi.org/10.1038/s41598-025-01738-4

**RQ1 (Actors & Roles):** Stakeholders include **emergency responders** (fire, police, ambulance), **system operators**, **citizens**, and **emergency command center** personnel.

**RQ2 (System Boundaries & I/O):** The system architecture includes layers for Sensing, Communication, Computation, and Alert Dissemination. **Inputs** are multivariate time-series data from heterogeneous sensors (gas, flame, vibration, biometric). **Data flows** include "normal data logging" and cloud synchronization. **Outputs** are automated alert chains via mobile push notifications (FCM), SMS, and physical actuators like sirens or electronic signboards.

**RQ3 (Data Modeling & Standards):** Communication is standardized using **MQTT over TLS** and **HTTPS**. Alerts are serialized in structured formats such as **JSON** or **Protocol Buffers**. Specific standards like Sparkplug B or ISA-95 are N/A.

**RQ4 (Dashboard Architecture):** The system provides "intuitive dashboards" for control rooms that display **real-time event maps**, **heatmaps**, and **sensor data plots**. These interfaces are implemented using **WebSockets** or **gRPC** protocols for low-latency streaming. No mention of React grid patterns.

**RQ5 (OT Security & Safety):** The system implements a **Role-Based Access Control (RBAC)** mechanism to limit backend access based on roles like administrator, responder, or operator. Security features include **mutual authentication** via certificates, **TLS 1.3** encryption, and **two-factor authentication (2FA)** for privileged roles. Safety is addressed through an **automated escalation logic** that triggers national disaster response for critical severity levels.

**Key Quote:** "A role-based access control (RBAC) mechanism is integrated into the backend microservices to limit system access based on predefined roles (e.g., administrator, responder, operator)."

---

### Analysis of Source: Digital twin-enabled smart facility management: A bibliometric review

**APA Reference:** Hakimi, O., Liu, H., & Abudayyeh, O. (2024). Digital twin-enabled smart facility management: A bibliometric review. _Frontiers of Engineering Management, 11_(1), 32–49. https://doi.org/10.1007/s42524-023-0254-4

**RQ1 (Actors & Roles):** The source identifies **facility managers** as key actors responsible for budget allocation and scheduling for renovation or disposal. It also references a "human-in-the-loop" concept where human inputs are fused with sensor data for reliable decision-making. Broad stakeholders involved in the facility lifecycle include **product designers**, **manufacturers**, **owners**, and **government** entities.

**RQ2 (System Boundaries & I/O):** The system acquires **real-time status information** via smart sensors and measuring devices. **Inputs** include environmental data, human feedback, and product data. **Telemetry data** is explicitly identified as a requirement for organizing and managing resource information. **Outputs** consist of real-time visualization and **automatic control feedback**. The text also notes the importance of capturing **historical records** of asset states, though it mentions this is a challenge for current standards.

**RQ3 (Data Modeling & Standards):** The review highlights **Building Information Modeling (BIM)** and **Industry Foundation Classes (IFC)** as primary standards for digital representations. It discusses **Digital Twin Definition Language (DTDL)** and **Asset Administration Shell (AAS)** in the context of interoperability and transformation efforts. Identifiers used within these models include **Internationalized Resource Identifiers (IRI)** and **International Registration Data Identifiers (IRDI)**.

**RQ4 (Dashboard Architecture):** The source describes the need for **real-time visualization** of the built environment. It specifically mentions **AR/VR-based visualization** as a tool for facility maintenance, though it does not provide React-specific technical architecture or grid layout details.

**RQ5 (OT Security & Safety):** The source mentions "safety management" and "hazard prevention" as essential dynamics of digital systems. While it notes that **security definitions** are necessary for a holistic view, it explicitly states that security aspects in certain current standards (like AAS) remain preliminary. No specific mention of IEC 62443 was found.

**Key Quote:** "Digital twin (DT) has emerged as a solution for enabling real-time data acquisition, transfer, analysis, and utilization for improved decision-making toward smart FM."

---

### Analysis of Source: Enhancing Interoperability of Digital Twins Based on Digital Twins Definition Language

**APA Reference:** Cavalieri, S., & Gambadoro, S. (2023). Enhancing Interoperability of Digital Twins Based on Digital Twins Definition Language. _Proceedings of the 25th International Conference on Enterprise Information Systems (ICEIS 2023)_, 1, 741-748. ISBN: 978-989-758-648-4.

**RQ1 (Actors & Roles):** The source focuses on system-level interaction, identifying **OPC UA Servers** and **OPC UA Clients** as the primary functional roles. It mentions that Digital Twins must exchange data with "applications using the digital replica," implying external software agents or human users, but it does not detail specific human roles like Integrator or Operator.

**RQ2 (System Boundaries & I/O):** The system boundary is defined by the exchange of data between physical systems and the digital twin replica.

- **Inputs:** **Telemetry** (data streams from sensor readings that are emitted but not stored) and **Properties** (values stored within a twin that can be read or updated).
- **Outputs:** **Commands**, which correspond to functions/operations invoked with optional input and output parameters.

**RQ3 (Data Modeling & Standards):** The paper centers on **Digital Twins Definition Language (DTDL)**, which uses **JSON-LD** formalism to describe devices and assets. It proposes a mapping to **Open Platform Communications Unified Architecture (OPC UA)**. It also references the **Asset Administration Shell (AAS)** as a notable project for standardizing interaction with twins.

**RQ4 (Dashboard Architecture):** The source mentions the **Azure Digital Twin Explorer** as a tool used to import models and create instances of digital twins. No internal UI architecture or React patterns are detailed.

**RQ5 (OT Security & Safety):** The text notes that digital twins enable "hazard prevention for sensitive processes" through better testing and analysis. However, specific security protocols like RBAC or standards like IEC 62443 are not detailed in this source.

**Key Quote:** "Telemetry describes data emitted by a resource, whether it is a regular stream of sensor readings or a calculated data stream; Telemetry does not store any data."

---

### Analysis of Source: Increasing Interoperability between Digital Twin Standards and Specifications: Transformation of DTDL to AAS

**APA Reference:** Schmidt, C., Volz, F., Stojanovic, L., & Sutschet, G. (2023). Increasing Interoperability between Digital Twin Standards and Specifications: Transformation of DTDL to AAS. _Sensors, 23_(18), 7742. https://doi.org/10.3390/s23187742

**RQ1 (Actors & Roles):** The source identifies the **Manufacturer** as the entity storing specific information about an asset. It also mentions the **Customer** as an actor who may choose to operate a device's digital twin using different tools (e.g., transitioning from DTDL to AAS).

**RQ2 (System Boundaries & I/O):** The system architecture differentiates between **Telemetry data** (recorded sensor information) and **Properties** (configuration or status).

- **Inputs:** **Telemetry**, **Events** (e.g., triggered when a certain temperature is reached), and **Relationships/Compositions** between twins.
- **Outputs:** **Functions/Operations**, which include input parameters and return values to ensure information flow back to the physical resource.

**RQ3 (Data Modeling & Standards):** This research provides a comprehensive comparison of several standards: **DTDL**, **Asset Administration Shell (AAS)**, **NGSI-LD**, **Eclipse Vorto**, and **W3C Thing Description (TD)**. It maps DTDL elements to AAS components, identifying that **AAS Properties** are abstract enough to handle both configuration and telemetry. It uses **IRI** and **IRDI** for element identification.

**RQ4 (Dashboard Architecture):** The source mentions the **AASX Package Explorer** and **AASX Package Manager** as tools for representing and managing the hierarchical structure of twins. Specific React-based UI patterns are N/A.

**RQ5 (OT Security & Safety):** The authors state that **security definitions** in the current AAS specification are **"only preliminary"** and were therefore excluded from the detailed transformation definition.

**Key Quote:** "Each element of the DTDL metamodel was mapped to an element of the AAS... AAS property was defined abstractly enough to be suitable for both configuration properties and telemetry data."

---

### Analysis of Source: Leveraging a novel NFT-enabled blockchain architecture for the authentication of IoT assets in smart cities

**APA Reference:** Khalil, U., Malik, O. A., Hong, O. W., & Uddin, M. (2023). Leveraging a novel NFT-enabled blockchain architecture for the authentication of IoT assets in smart cities. _Scientific Reports, 13_(2023). https://doi.org/10.1038/s41598-023-45812-4

**RQ1 (Actors & Roles):** The architecture defines four critical roles:

- **System Owner/Admin (Creator):** The only entity capable of initializing the smart contract and managing authorized access for other roles.
- **End-User:** Accesses IoT devices after successful authentication.
- **Fog Node:** Acts as an intermediate layer for device management and authentication.
- **IoT-enabled Smart Device (Edge Node):** The physical asset assigned a digital representation through a TokenID.

**RQ2 (System Boundaries & I/O):** The system focuses on secure **data flow** and **real-time response** applications.

- **Inputs:** **Network traffic flow patterns** (captured for ML-based feature selection).
- **Data Flows:** **Transaction volume** (handled by the blockchain layer), **Audit logs** (traceability provided by the immutable ledger), and **Firmware updates** (identified as a critical but often neglected data flow).
- **Heartbeats:** Mentioned implicitly as **block timestamps** ($T$ and $\Delta T$) used to prevent replay attacks.

**RQ3 (Data Modeling & Standards):** The system leverages the **ERC-721** (Non-Fungible Token) standard to represent unique smart devices. It also mentions the **Multi Token Standard (ERC-1155)** and discusses the **Web of Things** model for interoperability. The underlying infrastructure uses **Hyperledger Besu** and **Goerli Testnet**.

**RQ4 (Dashboard Architecture):** The source describes a **decentralized application (dApp)** that serves as a client-side interface built with **Solidity** and **Remix IDE**. It does not mention React-specific layouts or grid systems.

**RQ5 (OT Security & Safety):** The paper addresses security through a **"CIA & AAA"** (Confidentiality, Integrity, Availability, Authentication, Authorization, Audit) framework. It implements **Role-Based Access Control (RBAC)** via an **"OnlyOwner" modifier** in the smart contract, ensuring only the admin can execute critical functions. For **remote actuation safety**, it notes that smart contracts allow for faster implementation of actuation mechanisms. It specifically addresses and proposes a software-based alternative to **Physically Unclonable Functions (PUF)**.

**Key Quote:** "The proposed architecture... provides devices and user identification and authentication functionality... ensures robust security features (such as CIA) by introducing new attributes and functions for Owner, User, Fog, and IoT device/s authentication."

---

### Analysis of Source: Model-driven engineering for digital twins: a systematic mapping study

**APA Reference:** Lehner, D., Zhang, J., Pfeiffer, J., Sint, S., Splettstößer, A. K., Wimmer, M., & Wortmann, A. (2025). Model-driven engineering for digital twins: a systematic mapping study. _Software and Systems Modeling, 24_(4), 1339–1377. https://doi.org/10.1007/s10270-025-01264-7

**RQ1 (Actors & Roles):** The source identifies **"domain experts"** and **"software experts"** as the two primary groups that must communicate and cooperate to engineer effective digital twins. Within the technical development process, it mentions roles such as **"software developers"** and **"decision makers"**. Some papers within the study specifically propose roles for "Toolbox Component Developers" (creating individual components) and "Machining Engineers" (integrating components).

**RQ2 (System Boundaries & I/O):** The system's primary functions are identified as **monitoring, processing, and storing data** from the physical twin. **Inputs** often consist of "data models" and "behavior models",. **Data flows** are facilitated by model-to-model transformations to ensure interoperability in toolchains. **Outputs** include the generation of "data processing infrastructures," "data storage," and "graphical user interfaces". The study also notes that simulation models can "read simulation results and send commands".

**RQ3 (Data Modeling & Standards):** The source extensively discusses the **Digital Twin Definition Language (DTDL)**, noting it can be transformed from BPMN or AutomationML,. It identifies **Asset Administration Shell (AAS)** as a key standard for modeling,. Common modeling languages found in the literature include **UML class diagrams**, **SysML BDDs**, and **BPMN** for discrete behavior,.

**RQ4 (Dashboard Architecture):** The text mentions **"visualization (GUIs)"** as a frequent generation target for code generation automation techniques. It refers to the creation of **"visualization dashboards"** and **"DT cockpits"** synthesized from dedicated GUI modeling languages,. While it mentions that these can be generated in languages like **TypeScript** or **Java**, it does not specify React Grid Layout,.

**RQ5 (OT Security & Safety):** The source briefly mentions modeling for **"risk analysis"** using fault trees. It also references "Vulnerability Analysis and Exploitation" components within specific digital twin architectures. Standard security protocols like IEC 62443 are N/A.

**Key Quote:** "As domain experts and software experts both have to contribute to the engineering of effective DTs, several model-driven engineering (MDE) approaches have been recently proposed to ease the design, development, and operation of DTs."

---

### Analysis of Source: Paradigm shift in mechanical system design: toward automated and collaborative design with digital twin web

**APA Reference:** Ala-Laurinaho, R., Autiosalo, J., Laine, S., Hakonen, U., & Viitala, R. (2024). Paradigm shift in mechanical system design: toward automated and collaborative design with digital twin web. _Software and Systems Modeling, 24_(4), 1475–1494. https://doi.org/10.1007/s10270-024-01215-8

**RQ1 (Actors & Roles):** This source distinguishes between the **"system integrator"** and **"Original Equipment Manufacturers (OEMs)"**. The system integrator is responsible for defining the initial system design and component requirements, while OEMs provide the actual components and their digital twins,. It also introduces the **"analysis service provider"** as a trusted third party that conducts well-defined analyses for component assemblies.

**RQ2 (System Boundaries & I/O):** The system boundary involves a web-based discovery process. **Inputs** include the **"Digital Design Template (DDT)"** (system structure and requirements) and **"Component Descriptions (CD)"** (mechanical properties and dimensions),. **Data flows** include "fetching CDs from Digital Twin Web" and sending assembly parameters to analysis services via **REST APIs**,. **Outputs** are "analysis results" (e.g., maximum torsional vibration amplitudes) used to select assembly candidates.

**RQ3 (Data Modeling & Standards):** The framework relies on **"digital twin documents (DTDs)"** and custom ontologies such as **"twinschema"** (DT info), **"ddt"** (design info), and **"tors"** (vibration data),. It acknowledges major standards including **DTDL**, **Asset Administration Shell (AAS)**, and **Web of Things (WoT) Things Description (TD)**. Data is formatted using **JSON-LD**.

**RQ4 (Dashboard Architecture):** The source suggests that future tools could provide a **"graphical user interface that employs a drag-and-drop approach"** to define system structures. It also mentions the use of "immersive visualizations" for design assessment. Specific React widget patterns or grid architectures are N/A.

**RQ5 (OT Security & Safety):** Security concerns center on **"immaterial property rights (IPR)"** protection. It proposes sharing IPR-protected models only with trusted third-party analysis services or using **"black box models"** to preserve functionality without revealing sensitive design details,. Specific standard IEC 62443 is N/A.

**Key Quote:** "The adoption of the proposed framework will lead to a paradigm shift from manual and siloed work relying on the exchange of PDFs to a more automated and collaborative design of mechanical systems."

---

### Analysis of Source: Proposal of Mapping Digital Twins Definition Language to Open Platform Communications Unified Architecture

**APA Reference:** Cavalieri, S., & Gambadoro, S. (2023). Proposal of mapping Digital Twins Definition Language to Open Platform Communications Unified Architecture. _Sensors, 23_(4), 2349. https://doi.org/10.3390/s23042349

**RQ1 (Actors & Roles):** The paper identifies **"model authors"** as those who provide comments for digital twin definitions. It describes a communication architecture involving an **"OPC UA Server"** (acting as the mapping gateway) and **"OPC UA Clients"** (applications that consume the digital replica's data).

**RQ2 (System Boundaries & I/O):** The system boundary is defined by the exchange between the physical world and the digital replica. **Inputs** include "current state" data measured by sensors. The DTDL-to-OPC mapping defines three specific data flows: **"Telemetry"** (sensor readings emitted but not stored), **"Properties"** (stored values that can be read-only or read-write), and **"Commands"** (functions/operations with input "Request" and output "Response" parameters),,.

**RQ3 (Data Modeling & Standards):** This source is dedicated to mapping **Digital Twin Definition Language (DTDL)** to **Open Platform Communications Unified Architecture (OPC UA)**. It maps DTDL's six metamodel classes: Interface, Telemetry, Property, Command, Relationship, and Component. It highlights the use of **JSON-LD** as the base format for DTDL.

**RQ4 (Dashboard Architecture):** The source notes that **OPC UA Nodes** include attributes like `DisplayName` specifically for use in user interfaces. It mentions the **"Azure Digital Twin Explorer"** as the graphical tool used to import models and create twin instances. Specific React architecture is N/A.

**RQ5 (OT Security & Safety):** It mentions that digital twins enable better **"hazard prevention for sensitive processes"**. In the proposed mapping, the DTDL **"writable"** property is mapped to the OPC UA **`WriteMask`** attribute, which controls whether a client can update a value,. Standards like IEC 62443 are N/A.

**Key Quote:** "The proposal allows to represent each DTDL element into a corresponding OPC UA element... information maintained by a DTDL-based Digital Twin can be published by an OPC UA server that makes this information available to any OPC UA-compatible device.",

---

### Analysis of Source: Supporting Digital Twin Integration Using Semantic Modeling and High-Level Architecture

**APA Reference:** Li, H., Lu, J., Zheng, X., Wang, G., & Kiritsis, D. (2021). Supporting digital twin integration using semantic modeling and high-level architecture. _IFIP International Conference on Advances in Production Management Systems (APMS)_, 228-236. https://doi.org/10.1007/978-3-030-85910-7_24

**RQ1 (Actors & Roles):** The text mentions **"DT creators"** and distinguishes between **"engineering experts, software developers, and decision makers"**,. It also notes that **"end users"** expect to arrange different digital twins according to their specific business requirements.

**RQ2 (System Boundaries & I/O):** The architecture centers on a **"Run-Time Infrastructure (RTI)"** which serves as simulation-oriented middleware for information exchange,. **Data flows** follow a **"Publish and Subscribe"** mechanism for interactions between federates. System functions include "real-time monitoring, data collection, simulation, analysis and reasoning".

**RQ3 (Data Modeling & Standards):** The source utilizes a **"GOPPRR"** (Graph-Object-Property-Point-Role-Relationship) semantic modeling approach. It implements this via **Ontology Web Language (OWL)** to realize integrated formalisms for heterogeneous twins,. The architecture is based on the **High-Level Architecture (HLA)** standard for distributed simulations.

**RQ4 (Dashboard Architecture):** N/A. The source mentions a "visualization" component as a future part of a complete tool kit but provides no architecture details.

**RQ5 (OT Security & Safety):** N/A.

**Key Quote:** "The GOPPRR ontology and HLA specification enables to provide a unified formalism of the DTs... and to implement data exchange during the distributed simulation execution.",

---

### Analysis of Source: The development of a digital twin concept system.pdf

**APA Reference:** Duan, H., Gao, S., Yang, X., & Li, Y. (2025). The development of a digital twin concept system. _Digital Twin, 2_(10). https://doi.org/10.12688/digitaltwin.17599.3

**RQ1 (Actors & Roles):** The source defines a "User Entity" that includes **Human**, **Devices/HMI**, **MES, ERP and other Apps**, and **Peer Digital Twins** [57, Fig 2]. It identifies "social entities" as human individuals or groups who create **human-made entities** through physical and intellectual effort.

**RQ2 (System Boundaries & I/O):** The "Digital Twin System" is defined as a broad-sense **cyber-physical system** composed of multiple target entities and digital twins. Critical data flows include **Synchronization mechanisms** (algorithms enabling state alignment), **Telemetry** (data emitted but not stored), and **Commands** (functions with request/response parameters). It mentions "Digital twin entity data" as datasets collected via **sensing, measurement, and simulation**.

**RQ3 (Data Modeling & Standards):** The paper centers on **DTDL** (Digital Twin Definition Language) and its mapping to **OPC UA**. It also incorporates **ISO 10303 (STEP)**, **ISO 15926**, and the **Asset Administration Shell (AAS)** for industrial data integration. It proposes the concept of a **"Digital Asset"** as the superordinate concept for a digital twin entity.

**RQ4 (Dashboard Architecture):** The system identifies **HMI (Human-Machine Interface)** and **visualization elements** as key components of the "User Entity" [57, Fig 2]. It references **ISO/TR 24464:2020** specifically regarding the visualization elements of digital twins.

**RQ5 (OT Security & Safety):** Security is handled through a **"Cyber-security subsystem"**. The source identifies **Trustworthiness** and **Credibility** (degree to which a model is regarded as true by users) as essential characteristics of digital twin systems. It suggests the application of **blockchain technology** within the security subsystem.

**Key Quote:** "A digital twin entity is a kind of digital asset rather than digital representation... encapsulating the digital representation and execution of target entity and its synchronization mechanism in one business object."

---

### Analysis of Source: Towards a Product Line Architecture for Digital Twins.pdf

**APA Reference:** Pfeiffer, J., Lehner, D., Wortmann, A., & Wimmer, M. (2022). Towards a product line architecture for digital twins. _Institute for Control Engineering of Machine Tools and Manufacturing Units (ISW)_.

**RQ1 (Actors & Roles):** The architecture identifies **domain experts** (who configure platforms via models) and **software engineering experts** as primary stakeholders. It utilizes the **MAPE-K loop** (Monitor, Analyzer, Planner, Executor) roles to manage self-adaptive systems.

**RQ2 (System Boundaries & I/O):** Data flow follows the MAPE-K pattern: the **Monitor** receives data from the physical system and converts it to **"Digital Shadows"**; the **Analyzer** identifies anomalies; the **Planner** creates plans; and the **Executor** sends **control commands** processable by the physical system. It enables **bi-directional synchronization** to physical systems.

**RQ3 (Data Modeling & Standards):** The source focuses heavily on **DTDL** (Digital Twin Definition Language) for describing structural aspects and **DSLs** (Domain-Specific Languages) like **MontiArc** for behavior. It mentions integration with cloud platforms such as **Microsoft Azure Digital Twins**, **AWS IoT TwinMaker**, and **Eclipse Vorto**.

**RQ4 (Dashboard Architecture):** N/A. While the paper discusses **"User Interfaces"** and **"HMI"** as part of the software components, it focuses on the **language-level and technology-level alignment** of models rather than specific React grid layouts or widget patterns.

**RQ5 (OT Security & Safety):** Safety is addressed through the **Planner** component, which reacts to **erroneous behavior** recognizable through telemetry data. Specific industry security standards like IEC 62443 are not mentioned.

**Key Quote:** "Creating a comprehensive digital twin for a given system requires the combination of several architectures and DSLs... our vision of a product line architecture explicitly specifies the different concerns of digital twins."

---

**Analogy for the Fleet Management System (Synthesis of Final Sources):** The Fleet Management System is like a **Standardized Modular Hospital**. The **Research Plan** provides the architectural blueprint; the **Concept System** (Duan et al.) provides the universal medical dictionary (DTDL/ISO standards) so every doctor and machine speaks the same language; and the **Product Line Architecture** (Pfeiffer et al.) acts as the modular equipment system, allowing you to swap a "Heart Monitor" module for a "Ventilator" module without needing to rebuild the entire ward's electrical wiring.