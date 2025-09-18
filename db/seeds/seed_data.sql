INSERT INTO echo_core.schema_migrations (version)
VALUES ('001_bootstrap')
ON CONFLICT (version) DO NOTHING;
