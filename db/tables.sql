CREATE TABLE core.persons(
  id serial,
  name text,
  change_name boolean,
  old_name text,
  graduated int,
  profession text,
  universe text,
  childern boolean,
  children_study text, -- true, false, other
  cheldern_other text,
  contacts text, -- true, false, teachers_only
  phone text,
  email text,
  photo text,
  profile_type text, -- profile, text, video
  profile_text text,
  profile_email text,
  profile_id int,
  status text, -- pending, approved
  capture_time timestamp,
  approved_time timestamp,
  search tsvector
);

CREATE TABLE core.profiles(
  person_id int,
  --SCHOOL FOR ME
    --conditions
    conditions_laws  boolean,
    conditions_humanity  boolean,
    conditions_moral  boolean,
    conditions_freedom  boolean,
    conditions_choise  boolean,
    conditions_initiative  boolean,
    conditions_other text,

    --conmpetitions
    conmpetitions_responsibility boolean,
    conmpetitions_perseverance boolean,
    conmpetitions_creativity boolean,
    conmpetitions_openness boolean,
    conmpetitions_independence boolean,
    conmpetitions_prioritization boolean,
    conmpetitions_communicativeness boolean,
    conmpetitions_analitial boolean,
    conmpetitions_teamwork boolean,
    conmpetitions_leadership boolean,
    conmpetitions_design boolean,
    conmpetitions_reflexivity boolean,
    conmpetitions_responsiveness boolean,
    conmpetitions_other text,

    most_needed_quality text,

    --spaces
    spaces_masters boolean,
    spaces_clubs boolean,
    spaces_constitution boolean,
    spaces_charity boolean,
    spaces_self_assessment boolean,
    spaces_atmosphere boolean,
    spaces_projects boolean,
    spaces_planning boolean,
    spaces_expeditions boolean,
    spaces_deepenig boolean,
    spaces_historic_games boolean,
    spaces_museems boolean,
    spaces_sports boolean,
    spaces_mass_media boolean,
    spaces_internships boolean,
    spaces_lyceum boolean,
    spaces_celebration boolean,
    spaces_theater boolean,
    spaces_summer_school boolean,
    spaces_hike boolean,
    spaces_capms boolean,
    spaces_trips boolean,
    spaces_business_game boolean,
    spaces_other text,

    deficiencies text,
    teachers text,
    professtion text,

  --ME FOR SCHOOL
    study_after_school text,
    university_for_admission text,
    change_profession text,
    change_university text,
    profession_quality text,
    profession_interests text,
    profession_education_points text,
    high_school_graduate text,
    schoolmates text,
    school_alteatives text,

    --students_help
    students_help_conference boolean,
    students_help_internship boolean,
    students_help_master_class text,
    students_help_lyceum text,
    students_help_lecture boolean,
    students_help_other text,

  search tsvector
);

