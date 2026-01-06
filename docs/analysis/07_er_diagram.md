# Entity-Relationship Diagram (ERD)

This diagram visualizes the data structure of The Meridian Grid, designed to fulfill the requirements defined in the SRS.

```mermaid
erDiagram
    USER ||--o{ DASHBOARD : "creates"
    USER ||--o{ AUDIT_LOG : "performs"
    USER }|--|| ROLE : "assigned"
    USER ||--o{ ALERT : "acknowledges"
    
    ROLE ||--o{ PERMISSION : "contains"

    ASSET ||--o{ TELEMETRY : "generates"
    ASSET ||--o{ RULE : "monitored_by"
    ASSET ||--o{ ALERT : "triggers"
    ASSET ||--o{ ASSET : "contains (hierarchy)"
    ASSET }|--o{ ASSET_GROUP : "belongs_to"

    ASSET_GROUP }|--o{ USER : "scoped_to"

    RULE ||--o{ ALERT : "defines"

    DASHBOARD ||--o{ WIDGET : "contains"
    WIDGET ||--|| ASSET : "binds_to"

    %% Entity Details
    USER {
        uuid id PK
        string email UK
        string password_hash
        string name
        uuid role_id FK
        enum status "Active, Disabled"
    }

    ROLE {
        uuid id PK
        string name UK
        jsonb permissions
    }

    ASSET {
        uuid id PK
        string name UK
        jsonb model "AAS/DTDL structure"
        jsonb metadata "Static tags"
        enum state "Draft, Active, Archived"
        uuid parent_id FK
        timestamp created_at
    }

    TELEMETRY {
        timestamp time PK "TimescaleDB Primary Dimension"
        uuid asset_id FK
        string property_name
        float value
    }

    RULE {
        uuid id PK
        uuid asset_id FK
        string expression "Logical logic"
        string severity "Info, Warning, Critical"
        boolean is_active
    }

    ALERT {
        uuid id PK
        uuid rule_id FK
        uuid asset_id FK
        enum status "New, Acknowledged, Resolved"
        timestamp triggered_at
        timestamp ack_at
        uuid ack_user_id FK
    }

    DASHBOARD {
        uuid id PK
        string name
        jsonb layout "Grid coordinates"
        uuid creator_id FK
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string resource_id
        timestamp created_at
    }
```

### Architectural Notes
1.  **TimescaleDB Integration:** The `TELEMETRY` table is designed as a Hypertable, where `time` is the primary partitioning dimension for high-performance time-series ingestion.
2.  **Flexible Schemas:** `ASSET.model` and `DASHBOARD.layout` use `JSONB` to support heterogeneous hardware and dynamic HMI configurations without database migrations.
3.  **Recursive Hierarchy:** `ASSET.parent_id` allows for infinite nesting of machines, stations, and sites.
4.  **Security Scoping:** The `ASSET_GROUP` to `USER` relation enables the "Scoped Access" requirement (IAM-13).
