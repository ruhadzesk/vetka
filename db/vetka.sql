CREATE SCHEMA IF NOT EXISTS core;

CREATE OR REPLACE function core.login(
  IN i_params json,
  OUT o_result int
)
AS $$
BEGIN
  SELECT i_params->>'id' INTO o_result;
END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;
