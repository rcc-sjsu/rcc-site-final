CREATE TABLE public.teams (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  description text
);

CREATE TABLE public.ambassadors (
  student bigint REFERENCES public.students (id) ON DELETE CASCADE,
  team bigint REFERENCES public.teams (id) ON DELETE CASCADE,
  role varchar NOT NULL,
  linkedin_url varchar,
  headshot_url varchar,
  PRIMARY KEY (student, team)
);
