-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Convert 'telemetry' table to a hypertable
-- Partition by 'time' column
SELECT create_hypertable('telemetry', 'time', if_not_exists => TRUE);
