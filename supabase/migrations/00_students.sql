CREATE TABLE public.students (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name varchar NOT NULL,
  preferred_name varchar,
  family_name varchar,
  preferred_email varchar UNIQUE NOT NULL,
  school_email varchar UNIQUE,
  phone varchar(32),
  pronouns varchar(50),
  major varchar,
  discord_username varchar UNIQUE,
  expected_graduation date,
  is_member boolean DEFAULT FALSE
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
