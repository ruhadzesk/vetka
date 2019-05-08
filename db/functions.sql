CREATE OR REPLACE function core.login(
  IN i_params json,
  OUT o_result json
)
AS $$
DECLARE _token text;
BEGIN
  IF i_params->>'user' = 'admin' AND md5(i_params->>'password') = '4a7d1ed414474e4033ac29ccb8653d9b' THEN
    INSERT INTO core.tokens VALUES(
        md5(random()::text))
    RETURNING token INTO _token;
    SELECT json_build_object('token', _token)
    INTO o_result;
  ELSE SELECT json_build_object('error', 'login failed') INTO o_result;
  END IF;

END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;

CREATE OR REPLACE function core.profile_list(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN
  IF i_params->>'status' = 'new' THEN
    PERFORM 1 FROM core.tokens
        WHERE token = i_params->>'token';
    IF NOT FOUND THEN
      RAISE EXCEPTION USING
        ERRCODE = 401,
        MESSAGE = 'unautorized',
        DETAIL = '';
    END IF;
  END IF;
  SELECT json_agg(data) FROM (
    SELECT *
      FROM core.profiles
      WHERE status = i_params->>'status'
      AND (i_params->>'search' = '' OR search @@ to_tsquery(i_params->>'search'))
      ORDER BY capture_time DESC
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

CREATE OR REPLACE function core.profile_delete(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN

    PERFORM 1 FROM core.tokens
        WHERE token = i_params->>'token';
    IF NOT FOUND THEN
      RAISE EXCEPTION USING
        ERRCODE = 401,
        MESSAGE = 'unautorized',
        DETAIL = '';
    ELSE
        DELETE FROM core.profiles
          WHERE id = (i_params->>'id')::int;
    END IF;
END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;

CREATE OR REPLACE function core.profile_publish(
  IN i_params json,
  OUT o_result json
)
AS $$
BEGIN
  PERFORM 1 FROM core.tokens
    WHERE token = i_params->>'token';
  IF NOT FOUND THEN
    RAISE EXCEPTION USING
      ERRCODE = 401,
      MESSAGE = 'unautorized',
      DETAIL = '';
  END IF;

  UPDATE core.profiles SET
    name = i_params->>'name',
    name_changed =     (i_params->>'name_changed')::boolean,
    name_old =     i_params->>'name_old',
    graduated =     (i_params->>'graduated')::int,
    profession =     i_params->>'profession',
    university =     i_params->>'university',
    children =     (i_params->>'children')::boolean,
    children_study =     i_params->>'children_study',
    children_other =     i_params->>'children_other',
    contacts =     i_params->>'contacts',
    phone =     i_params->>'phone',
    email =     i_params->>'email',
    photo =     i_params->>'photo',
    confirm =     (i_params->>'confirm')::boolean,
    type =     i_params->>'type',
    --vide =     --video
    video =     i_params->>'video',
    --tex =     --text
    text_name =     i_params->>'text_name',
    profile_text =     i_params->>'profile_text',
    --profil =     --profile
    --step =     --step1
    conditions =     i_params->'conditions',
    competitions  =     i_params->'competitions' ,
    most_needed_quality =     i_params->>'most_needed_quality',
    spaces =     i_params->'spaces',
    deficiencies =     i_params->>'deficiencies',
    teachers =     i_params->>'teachers',
    profession_choose =     i_params->>'profession_choose',
    --step =     --step2
    study_after_school =     i_params->>'study_after_school',
    university_for_admission =     i_params->>'university_for_admission',
    change_profession =     i_params->>'change_profession',
    change_university =     i_params->>'change_university',
    profession_quality =     i_params->>'profession_quality',
    university_quality =     i_params->>'university_quality',
    profession_interests =     i_params->>'profession_interests',
    profession_education_points =     i_params->>'profession_education_points',
    high_school_graduate =     i_params->>'high_school_graduate',
    schoolmates =     i_params->>'schoolmates',
    school_alteatives =     i_params->>'school_alteatives',
    students_help =     i_params->'students_help',
    --syste =     --system
    status =     'published',--i_params->'status',
    approved_time =     now(),--i_params->'approved_time'
    search = to_tsvector(concat_ws(' ',
        i_params->>'name',
        i_params->>'name_old',
        (i_params->>'graduated'),
        i_params->>'profession',
        i_params->>'university',
        i_params->>'children_study',
        i_params->>'children_other',
        i_params->>'contacts',
        i_params->>'phone',
        i_params->>'email',
        --video
        --text
        i_params->>'text_name',
        i_params->>'profile_text',
        --profile
        --step1
        i_params->>'most_needed_quality',
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
        i_params->>'school_alteatives'
    ))
  WHERE id = (i_params->>'id')::int;
END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;


CREATE OR REPLACE function core.profile_add(
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
    photo,
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
    approved_time,
    search
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
    i_params->>'photo',
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
    'new',--i_params->'status',
    now(),--i_params->'capture_time',
    now(),--i_params->'approved_time'
    to_tsvector(concat_ws(' ',
        i_params->>'name',
        i_params->>'name_old',
        (i_params->>'graduated'),
        i_params->>'profession',
        i_params->>'university',
        i_params->>'children_study',
        i_params->>'children_other',
        i_params->>'contacts',
        i_params->>'phone',
        i_params->>'email',
        --video
        --text
        i_params->>'text_name',
        i_params->>'profile_text',
        --profile
        --step1
        i_params->>'most_needed_quality',
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
        i_params->>'school_alteatives'
    ))
  );

END;
$$
LANGUAGE 'plpgsql' VOLATILE SECURITY DEFINER;
