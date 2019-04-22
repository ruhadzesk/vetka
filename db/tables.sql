CREATE TABLE core.profiles(
  id serial,
  name text,
  name_changed boolean,
  name_old text,
  graduated int,
  profession text,
  university text,
  children boolean,
  children_study text,
  children_other text,
  contacts text,
  phone text,
  email text,
  photo text,
  confirm boolean,
  type text,
  --video
  confirm_email text,
  video text,
  --text
  text_name text,
  profile_text text,
  --profile
  --step1
  conditions jsonb,
  competitions  jsonb,
  most_needed_quality text,
  spaces jsonb,
  deficiencies text,
  teachers text,
  profession_choose text,
  --step2
  study_after_school text,
  university_for_admission text,
  change_profession text,
  change_university text,
  profession_quality text,
  university_quality text,
  profession_interests text,
  profession_education_points text,
  high_school_graduate text,
  schoolmates text,
  school_alteatives text,
  students_help jsonb,
  --system
  status text, -- pending, approved
  capture_time timestamp,
  approved_time timestamp,
  search tsvector
);

CREATE TABLE core.tokens(
  token text
);
