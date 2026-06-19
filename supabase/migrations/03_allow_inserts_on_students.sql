create policy "Allow public inserts on students table"
on public.students for insert
to anon with check (True);
