alter table public.students
add column auth_user_id uuid unique references auth.users (id) on delete cascade;

create policy "Allow users to insert their own student profile"
on public.students for insert
to authenticated
with check (auth.uid() = auth_user_id);

create policy "Allow users to read their own student profile"
on public.students for select
to authenticated
using (auth.uid() = auth_user_id);

create policy "Allow users to update their own student profile"
on public.students for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

create or replace function public.create_student_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.students (
    auth_user_id,
    full_name,
    preferred_name,
    family_name,
    preferred_email,
    school_email,
    phone,
    pronouns,
    major,
    expected_graduation
  ) values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'preferred_name',
    new.raw_user_meta_data ->> 'family_name',
    new.email,
    new.raw_user_meta_data ->> 'school_email',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'pronouns',
    new.raw_user_meta_data ->> 'major',
    (new.raw_user_meta_data ->> 'expected_graduation')::date
  );

  return new;
end;
$$;

create trigger create_student_profile_after_auth_signup
after insert on auth.users
for each row execute function public.create_student_profile_for_new_user();
