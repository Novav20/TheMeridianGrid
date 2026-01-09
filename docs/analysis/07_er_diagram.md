# Entity-Relationship Diagram (ERD) - Logical Design

This diagram represents the logical data model for The Meridian Grid, derived from the Functional Requirements (FR-01 to FR-29).

```mermaid
erDiagram
    USER ||--o{ DASHBOARD : "owns"
    USER ||--o{ AUDIT_LOG : "performs"
    USER }|--|| ROLE : "assigned"
    USER ||--o{ ALERT : "acknowledges"
    
    ROLE ||--o{ PERMISSION : "grants"

    ASSET ||--o{ TELEMETRY : "emits"
    ASSET ||--o{ RULE : "monitored_by"
    ASSET ||--o{ ALERT : "triggers"
    ASSET ||--o{ ASSET : "contains (hierarchy)"
    ASSET }|--o{ ASSET_GROUP : "categorized_in"

    ASSET_GROUP }|--o{ USER : "scoped_to"

    RULE ||--o{ ALERT : "defines"

    DASHBOARD ||--o{ WIDGET : "contains"
    WIDGET ||--|| ASSET : "visualizes"

    USER {
        uuid id PK
        string email UK
        string password_hash
        string name
        uuid role_id FK
        enum status "ACTIVE, DISABLED, SUSPENDED"
    }

    ROLE {
        uuid id PK
        string name UK
        string description
    }

    PERMISSION {
        uuid id PK
        string action "e.g., asset:create, dashboard:view"
        string resource "e.g., * or site_a"
        uuid role_id FK
    }

    ASSET {
        uuid id PK
        string name UK
        jsonb model "Properties & Mapping definitions"
        jsonb metadata "Static info (Serial, Brand)"
        enum state "DRAFT, ACTIVE, ARCHIVED, MAINTENANCE"
        uuid parent_id FK
        timestamp created_at
    }

    ASSET_GROUP {
        uuid id PK
        string name
        string description
    }

    TELEMETRY {
        timestamp time PK "TimescaleDB Chunk Dimension"
        uuid asset_id FK
        string property_name
        float value
    }

    RULE {
        uuid id PK
        uuid asset_id FK
        string expression "Logic: e.g., temp > 80"
        enum severity "INFO, WARNING, CRITICAL"
        boolean is_active
    }

    ALERT {
        uuid id PK
        uuid rule_id FK
        uuid asset_id FK
        enum status "New, Ack, Resolved"
        timestamp triggered_at
        uuid ack_user_id FK
    }

    DASHBOARD {
        uuid id PK
        string name
        jsonb layout "Grid configuration"
        uuid user_id FK "Owner"
    }

    WIDGET {
        uuid id PK
        string type "Gauge, LineChart, Toggle"
        jsonb config "Binding and UI settings"
        uuid dashboard_id FK
        uuid asset_id FK "Primary data source"
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string resource_id
        timestamp created_at
    }
```

### Traceability & Gap Analysis

| Entity | Origin Requirement | Gap Addressed |
| :--- | :--- | :--- |
| **PERMISSION** | FR-09, FR-13 | Defined specific `action` and `resource` fields for fine-grained RBAC. |
| **WIDGET** | FR-20, FR-21 | Added `config` to store the dynamic data binding details. |
| **ASSET_GROUP** | FR-09 | Created to support the "Scoped Access" requirement for groups of machines. |
| **DASHBOARD** | FR-18 | Added `layout` as JSONB to store the grid positions from FR-19. |

**Final Observation:** 
One minor gap found: **Telemetry** needs a `unit` field (e.g., "Celsius", "RPM") if we want the HMI to show them automatically. I have included that in the `ASSET.model` JSONB for now, but we could make it an attribute. I'll stick with JSONB for flexibility as per our Architectural Decision.