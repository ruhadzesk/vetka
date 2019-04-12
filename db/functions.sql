CREATE OR REPLACE function core.person_list(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN
  SELECT json_agg(data) FROM (
    SELECT *
      FROM core.persons as prs
      LEFT JOIN core.profiles as pfl
      ON pfl.person_id = prs.id
      WHERE prs.status = i_params->>'status'
  ) data INTO o_result;
END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;

CREATE OR REPLACE function core.person_add(
  IN i_params jsonb,
  OUT o_result int
)
AS $$
DECLARE _id int;
BEGIN
  o_result = nextval(pg_get_serial_sequence('core.persons', 'id'));
  i_params = (i_params::jsonb || jsonb_build_object(
    'id',
    o_result,
    'person_id',
    o_result,
    'status',
    'approved'
  ));
  INSERT INTO core.persons
    SELECT * FROM
    jsonb_populate_record(NULL::core.persons, i_params);

  INSERT INTO core.profiles
    SELECT * FROM
    jsonb_populate_record(NULL::core.profiles, i_params);

END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;
