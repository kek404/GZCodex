-- Echo Phase 1 bootstrap schema
CREATE SCHEMA IF NOT EXISTS echo_core;

CREATE TABLE IF NOT EXISTS echo_core.schema_migrations (
    version TEXT PRIMARY KEY,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
