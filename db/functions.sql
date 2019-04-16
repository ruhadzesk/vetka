CREATE OR REPLACE function core.profile_list(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN
  SELECT json_agg(data) FROM (
    SELECT *
      FROM core.profiles
      WHERE status = i_params->>'status'
  ) data INTO o_result;
END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;

CREATE OR REPLACE function core.profile_get(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN
    SELECT row_to_json(p)
      FROM core.profiles as p
      WHERE id = (i_params->>'id')::int
    INTO o_result;
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
  INSERT INTO core.profiles (
    name,
    name_changed,
    name_old,
    graduated,
    profession,
    university,
    children,
    children_study,
    children_other,
    contacts,
    phone,
    email,
    confirm,
    type,
    --video
    confirm_email,
    --text
    text_name,
    profile_text,
    --profile
    --step1
    conditions,
    competitions ,
    most_needed_quality,
    spaces,
    deficiencies,
    teachers,
    profession_choose,
    --step2
    study_after_school,
    university_for_admission,
    change_profession,
    change_university,
    profession_quality,
    university_quality,
    profession_interests,
    profession_education_points,
    high_school_graduate,
    schoolmates,
    school_alteatives,
    students_help,
    --system
    status,
    capture_time,
    approved_time
    -- search tsvector
  ) VALUES (
    i_params->>'name',
    (i_params->>'name_changed')::boolean,
    i_params->>'name_old',
    (i_params->>'graduated')::int,
    i_params->>'profession',
    i_params->>'university',
    (i_params->>'children')::boolean,
    i_params->>'children_study',
    i_params->>'children_other',
    i_params->>'contacts',
    i_params->>'phone',
    i_params->>'email',
    (i_params->>'confirm')::boolean,
    i_params->>'type',
    --video
    i_params->>'confirm_email',
    --text
    i_params->>'text_name',
    i_params->>'profile_text',
    --profile
    --step1
    i_params->'conditions',
    i_params->'competitions' ,
    i_params->>'most_needed_quality',
    i_params->'spaces',
    i_params->>'deficiencies',
    i_params->>'teachers',
    i_params->>'profession_choose',
    --step2
    i_params->>'study_after_school',
    i_params->>'university_for_admission',
    i_params->>'change_profession',
    i_params->>'change_university',
    i_params->>'profession_quality',
    i_params->>'university_quality',
    i_params->>'profession_interests',
    i_params->>'profession_education_points',
    i_params->>'high_school_graduate',
    i_params->>'schoolmates',
    i_params->>'school_alteatives',
    i_params->'students_help',
    --system
    'approved',--i_params->'status',
    now(),--i_params->'capture_time',
    now()--i_params->'approved_time'
    --search
  );

END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;
