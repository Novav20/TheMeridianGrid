# Research Plan: Fleet Management System (TMG)

## 1. Initial Hypothesis (The "Guess")
The system is envisioned as an **Industry 4.0 IoT Platform** designed to manage a heterogeneous fleet of connected machines (Physical & Virtual). It serves as a "Digital Twin" enabler, allowing devices—ranging from industrial PLCs and power plants to hobbyist ESP32s and virtual Blender simulations—to be monitored and controlled remotely.

The core philosophy is **Flexibility and Abstraction**: providing a tool where engineers, students, and integrators can rapidly build custom dashboards without needing to build the underlying infrastructure. It abstracts the complexity of connectivity (MQTT/HTTP) so users can focus on their hardware and data analysis.

### 1.1 Actors & Roles
*   **System Administrator (The Host):** Manages the platform infrastructure, security, user accounts, and system-wide configurations.
*   **Device Integrator (The Builder):** The primary user who "onboards" a new device. They define the data model (what sensors exist), configure thresholds, and design the dashboard layout.
*   **Operator (The User):** The end-user who monitors the live dashboard, receives alerts, and issues control commands (e.g., Start/Stop) based on permissions.
*   **The Device (The Actor):** The physical or virtual machine itself, acting as an autonomous agent that publishes telemetry and subscribes to commands.

### 1.2 System Boundary & I/O
*   **Inputs:**
    *   **Telemetry:** High-frequency time-series data from sensors (Temperature, RPM, Vibration).
    *   **External Data:** Public APIs (e.g., Weather data) to correlate with machine performance.
    *   **Commands:** User-initiated actions (Setpoints, Actuation).
    *   **Configuration:** Dashboard layout definitions (JSON) and Alert Rules.
*   **Outputs:**
    *   **Visualization:** Real-time gauges, historical time-series plots, status indicators.
    *   **Notifications:** Critical alerts via Email/Webhooks when thresholds are breached.
    *   **Control Signals:** MQTT commands sent back to the device.

### 1.3 Key Processes (Initial View)
1.  **Device Onboarding:** The process of registering a new "Thing," defining its capabilities (Sensors/Actuators), and generating security credentials.
2.  **Real-Time Monitoring:** Ingesting, validating, and broadcasting live telemetry to the correct user dashboard.
3.  **Command & Control:** Authenticating a user's request to actuate a machine and ensuring delivery to the device.
4.  **Rule Engine Evaluation:** Continuously checking incoming data against user-defined thresholds to trigger automation or alerts.

---

## 2. Gap Analysis & Assumptions
*   **Assumption:** There is a standardized way to define a "Device Schema" that works for both a simple thermometer and a complex robotic arm.
*   **Gap (Data Model):** How do we store "dynamic" sensor data in a relational database (PostgreSQL)? Do we need JSONB or a separate Time-Series DB?
*   **Gap (Frontend Architecture):** How do we implement a "Drag-and-Drop" dashboard system? Is there a standard pattern for "Widgets" in React?
*   **Assumption:** We can effectively simulate "Industry 4.0" devices using software (Blender/Python) to test the platform without expensive hardware.

---

## 3. Research Questions
*Targeted questions to investigate using external sources.*

1.  **Validation of Actors & Roles:** Does the industry standard (e.g., ISA-95, IEC 62443) support our hypothesis of separating the "Integrator" (Builder) from the "Operator" (User)? Are there missing critical stakeholders (e.g., Maintenance Engineer, Data Analyst) that we should include in our BPA?
    *   *Search Hints:* "IIoT stakeholder roles", "ISA-95 personnel model", "User roles in SCADA systems".
    *   *Sources:* ISA.org, Industrial automation whitepapers.
2.  **Validation of System Boundaries & I/O:** Does our proposed I/O list (Telemetry, External API, Commands) align with the standard functional hierarchy of a Fleet Management System? What critical data flows (e.g., Audit Logs, Firmware Updates, Heartbeats) are we missing?
    *   *Search Hints:* "Fleet management system functional architecture", "IIoT data flow diagram", "Essential SCADA system functions".
    *   *Sources:* IEEE Xplore, ResearchGate (System Architecture papers).
3.  **Data Modeling & Standardization:** How should we model heterogeneous devices to ensure interoperability? Does the *MQTT Sparkplug B* or *DTDL* standard offer a naming convention that validates or contradicts our "Device Schema" assumption?
    *   *Search Hints:* "MQTT Sparkplug B specification", "Digital Twin Definition Language (DTDL) examples", "Modeling heterogeneous IoT assets".
    *   *Sources:* Eclipse Foundation, Microsoft Azure IoT Hub docs.
4.  **Dashboard Architecture:** What are the best practices for building user-configurable, grid-based dashboards in React? (Keywords: *React Grid Layout, Widget Pattern, persisted state*).
    *   *Search Hints:* "React customizable dashboard architecture", "Persisting react-grid-layout to database", "Component serialization React".
    *   *Sources:* GitHub repositories (awesome-react), Medium/Dev.to architectural case studies.
5.  **OT Security & Safety:** How does industry handle "Remote Actuation" safely? What are the standard security protocols (RBAC) to prevent unauthorized control of physical machinery?
    *   *Search Hints:* "IEC 62443 remote access", "NIST 800-82 OT security", "Remote actuation safety interlocks", "IIoT command authentication".
    *   *Sources:* NIST Special Publications, IEC Standards, CISA.gov (ICS-CERT).

---

## 4. Research Log (APA 7th Edition)
*Record your findings here. If NotebookLM provides no relevant info, mark as N/A.*

| Source (APA 7th Citation) | Key Findings / Relevant Text | Research Question # | Reference Link |
| :--- | :--- | :--- | :--- |
| (Author, Year) | "Quote or summary..." | #1 | [URL] |

---

## 5. Synthesis & Conclusions
*How has your mental model changed after the research?*
