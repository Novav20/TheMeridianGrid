-- Safely enable TimescaleDB extension
-- Using a DO block avoids conflicts if the library is already preloaded by the engine
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'timescaledb') THEN
        CREATE EXTENSION timescaledb CASCADE;
    END IF;
END $$;

-- Convert 'telemetry' table to a hypertable
-- Partition by 'time' column
SELECT create_hypertable('telemetry', 'time', if_not_exists => TRUE);
