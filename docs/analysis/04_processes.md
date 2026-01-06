# Business Process Maps (BPMN)

This document visualizes the core business processes to ensure all steps are covered by User Stories.

## Process 1: Asset Onboarding & Configuration
**Actor:** Device Integrator

```mermaid
flowchart TD
    Start([Start]) --> Login["Log in to System"]
    Login --> Dashboard["View Integrator Dashboard"]
    
    Dashboard --> CreateChoice{"Create New or From Template?"}
    
    %% Path A: From Template
    CreateChoice -- From Template --> SelectTemplate["Select Asset Template"]
    SelectTemplate --> Instantiate["Instantiate Asset (State: DRAFT)"]
    
    %% Path B: New Custom
    CreateChoice -- Custom --> DefineModel["Define Semantic Model"]
    DefineModel --> Instantiate
    
    %% Convergence
    Instantiate --> ConfigMQTT["Configure MQTT Mapping"]
    
    ConfigMQTT --> Validation{"Test Connection?"}
    
    Validation -- Yes --> SimulateData["Simulate/Check Live Data"]
    SimulateData --> ConnectionOK{"Success?"}
    ConnectionOK -- No --> Debug["Debug Mapping"]
    Debug --> ConfigMQTT
    
    ConnectionOK -- Yes --> AddMetadata["Add Metadata (Tags)"]
    Validation -- No --> AddMetadata
    
    AddMetadata --> DefineRelations["Define Parent/Child Relations"]
    DefineRelations --> SetRules["Define Health/Status Rules"]
    
    SetRules --> Activate["Activate Asset (State: ACTIVE)"]
    Activate --> End([End])

    classDef userStory fill:#f9f,stroke:#333,stroke-width:2px;
    class DefineModel,ConfigMQTT,DefineRelations,SetRules,SelectTemplate,AddMetadata,SimulateData,Activate userStory;
```

## Gap Analysis: Process 1 (Asset Onboarding)

| Process Step | User Story ID | Status |
| :--- | :--- | :--- |
| Define Semantic Model | CORE-01 | ✅ Covered |
| Configure MQTT Mapping | CORE-02 | ✅ Covered |
| Select Asset Template | CORE-06 | ✅ Covered |
| Define Relations | CORE-03 | ✅ Covered |
| Add Metadata | CORE-04 | ✅ Covered |
| Define Health Rules | CORE-05 | ✅ Covered |
| Test Connection/Simulate | CORE-10 | ✅ Covered |
| Activate (Draft -> Active) | CORE-09 | ✅ Covered |

---

## Process 2: Identity, Access & Role Management
**Actor:** System Administrator

This process defines how users are onboarded and how security boundaries are enforced between "Integrators" (Builders) and "Operators" (Users).

```mermaid
flowchart TD
    Start([Start]) --> AdminLogin["Admin Log in"]
    AdminLogin --> UserMgmt["Access User Management"]
    
    UserMgmt --> Action{"Action?"}
    
    %% Path A: Create User
    Action -- Create User --> InputDetails["Input User Details (Email, Name)"]
    InputDetails --> AssignRole{"Assign Global Role"}
    AssignRole -- Integrator --> SetIntegratorScope["Assign Site/Group Scope"]
    AssignRole -- Operator --> SetOperatorScope["Assign Specific Asset Scope"]
    
    SetIntegratorScope --> SendInvite["Send Invite / Gen Credentials"]
    SetOperatorScope --> SendInvite
    
    %% Path B: Define Roles/Permissions
    Action -- Manage Roles --> CreateRole["Create Custom Role"]
    CreateRole --> DefinePerms["Define Granular Permissions (Read, Write, Execute)"]
    DefinePerms --> SaveRole["Save Role Definition"]
    
    %% Path C: User Login (The User's Perspective)
    SendInvite --> UserLogin["User Logs In"]
    UserLogin --> MFA{"MFA Required?"}
    MFA -- Yes --> VerifyMFA["Verify 2FA Token"]
    MFA -- No --> CheckPerms["Check Role Permissions"]
    VerifyMFA --> CheckPerms
    
    CheckPerms --> AccessGranted["Access Granted (Scoped View)"]
    
    classDef authStory fill:#ccf,stroke:#333,stroke-width:2px;
    class InputDetails,AssignRole,CreateRole,DefinePerms,VerifyMFA,CheckPerms authStory;
```

## Gap Analysis: Process 2 (Identity & Access)

| Process Step | User Story ID | Status |
| :--- | :--- | :--- |
| Admin Log in | IAM-14 | ✅ Covered |
| Input User Details (Create) | IAM-11 | ✅ Covered |
| Assign Global Role | IAM-12 | ✅ Covered |
| Assign Scope (Site/Asset) | IAM-13 | ✅ Covered |
| Create Custom Role | IAM-16 | ✅ Covered |
| Verify MFA | IAM-15 | ✅ Covered |
| Check Permissions (Enforcement) | IAM-14 / IAM-16 | ✅ Covered |
| Audit Activity | IAM-18 | ✅ Covered |
| developer Shortcut | IAM-21 | ✅ Covered |

---

## Process 3: Dashboard Composition & Monitoring
**Actors:** [[Device Integrator]] (to build) and [[Operator]] (to use).

```mermaid
flowchart TD
    Start([Start]) --> Login["User Logs In"]
    Login --> DashboardHome["Access Dashboard Home"]
    
    DashboardHome --> UserAction{"Action?"}
    
    %% Path A: Integrator/Admin composing
    UserAction -- Compose --> CreateDashboard["Create New Dashboard"]
    CreateDashboard --> SelectLayout["Select Grid Layout (GridStack)"]
    SelectLayout --> AddWidget["Add Widget (Chart, Gauge, 3D)"]
    AddWidget --> BindData["Bind Widget to Asset Property"]
    BindData --> SaveDashboard["Save Dashboard Definition"]
    
    %% Path B: Operator monitoring
    UserAction -- Monitor --> SelectView["Select Dashboard View"]
    SelectView --> LoadWidgets["Load Real-time Widgets"]
    LoadWidgets --> LiveData["Stream Live Telemetry (WebSockets)"]
    LiveData --> Interaction{"Interaction?"}
    Interaction -- Filter --> FilterView["Apply Time/Asset Filter"]
    Interaction -- Alert --> Acknowledge["Acknowledge Alert"]
    Interaction -- Control --> RemoteCommand["Send Remote Control Command"]
    
    %% Convergence
    SaveDashboard --> DashboardHome
    RemoteCommand --> LiveData
    FilterView --> LiveData
    
    classDef hmiStory fill:#ffe599,stroke:#333,stroke-width:2px;
    class CreateDashboard,SelectLayout,AddWidget,BindData,SelectView,LiveData,FilterView,RemoteCommand hmiStory;
```

## Gap Analysis: Process 3 (Dashboard & Monitoring)

| Process Step | User Story ID | Status |
| :--- | :--- | :--- |
| Create & Save Dashboard | HMI-22 | ✅ Covered |
| Grid Layout Management | HMI-23 | ✅ Covered |
| Widget Library | HMI-24 | ✅ Covered |
| Data Binding | HMI-25 | ✅ Covered |
| Real-time Streaming (WS) | HMI-26 | ✅ Covered |
| Time-series Filtering | HMI-27 | ✅ Covered |
| Remote Control Interface | HMI-28 | ✅ Covered |
| Share/Publish | HMI-29 | ✅ Covered |
| Kiosk Mode | HMI-30 | ✅ Covered |
| Mobile Adaptive | HMI-31 | ✅ Covered |