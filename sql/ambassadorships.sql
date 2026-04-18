CREATE TABLE public.students (
  student_id varchar(8) PRIMARY KEY,
  first_name varchar,
  last_name varchar,
  preferred_name varchar,
  preferred_email varchar,
  school_email varchar NOT NULL,
  phone varchar,
  major varchar,
  discord_name varchar UNIQUE,
  expected_graduation date,
  is_member boolean DEFAULT FALSE
);

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name varchar UNIQUE NOT NULL,
  description text
);

CREATE TABLE public.ambassadors (
  student_id varchar(8) REFERENCES public.students (student_id) ON DELETE CASCADE,
  team_id integer REFERENCES public.teams (team_id) ON DELETE CASCADE,
  role varchar NOT NULL,
  PRIMARY KEY (student_id)
);
