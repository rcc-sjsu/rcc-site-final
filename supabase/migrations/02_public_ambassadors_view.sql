CREATE OR REPLACE VIEW public.public_ambassadors_view AS
SELECT 
    t.id AS team_id,
    t.name AS team_name,
    t.description AS team_description,
    a.role,
    a.headshot_url,
    s.full_name
FROM public.teams t
-- Use LEFT JOIN so teams with no ambassadors still show up
LEFT JOIN public.ambassadors a ON a.team = t.id
LEFT JOIN public.students s ON a.student = s.id;

-- 2. Explicitly grant the API roles permission to read this view
GRANT SELECT ON public.public_ambassadors_view TO anon, authenticated;
