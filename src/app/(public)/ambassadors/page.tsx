import TeamSection from './components/TeamSection';
import { createClient } from '@/lib/supabase/server';
import type { Tables } from '@/types/database.types';

type AmbassadorRow = Tables<'public_ambassadors_view'>;

type AmbassadorMember = {
  full_name: string;
  role: string;
  headshot_url?: string;
};

type AmbassadorTeam = {
  name: string;
  description: string | null;
  members: AmbassadorMember[];
};

export default async function AmbassadorsPage() {
  const supabase = await createClient();

  const ambassadorsQuery = supabase.from('public_ambassadors_view').select('*');

  const { data, error } = await ambassadorsQuery;

  if (error) {
    console.error('Error fetching team members:', error);
    return <div>Failed to load ambassadors.</div>;
  }

  const rows = (data ?? []) as AmbassadorRow[];

  // 2. Group the flat rows by Team Name
  const teamsMap = new Map<string, AmbassadorTeam>();

  rows?.forEach((row) => {
    if (!row.team_name) {
      return;
    }

    // If the team doesn't exist in our map yet, add it
    if (!teamsMap.has(row.team_name)) {
      teamsMap.set(row.team_name, {
        name: row.team_name,
        description: row.team_description,
        members: [],
      });
    }

    // If this row contains a student (i.e., the team isn't completely empty)
    if (row.full_name) {
      let imageUrl = undefined;

      // Generate the public URL for the headshot
      if (row.headshot_url) {
        const { data: imgData } = supabase.storage.from('headshots').getPublicUrl(row.headshot_url);
        imageUrl = imgData.publicUrl;
      }

      // Push the formatted member into the team's array
      const team = teamsMap.get(row.team_name);

      team?.members.push({
        full_name: row.full_name,
        role: row.role || '',
        headshot_url: imageUrl,
      });
    }
  });

  const teams = Array.from(teamsMap.values());

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 font-sans text-zinc-900">
      {/* Ambassadors Description Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Mozilla Student Ambassadors</h2>
        <p className="mt-4 text-zinc-700 leading-relaxed">
          The Mozilla Student Ambassadorship Program at RCC empowers students to take the lead in shaping the future of
          ethical technology. Ambassadors work closely with Mozilla and RCC to spark campus-wide conversations on
          responsible computing!
        </p>
        <p className="mt-4 text-zinc-700 leading-relaxed">
          Want to get involved? Reach out to us at{' '}
          <a href="mailto:rcc.sjsu@gmail.com" className="text-blue-600 hover:underline">
            rcc.sjsu@gmail.com
          </a>{' '}
          or follow us{' '}
          <a href="https://instagram.com/rcc.sjsu" className="text-blue-600 hover:underline">
            @rcc.sjsu
          </a>{' '}
          on Instagram to learn more!
        </p>
      </section>

      {teams.map((team) => (
        <TeamSection key={team.name} title={team.name} description={team.description || ''} members={team.members} />
      ))}
    </div>
  );
}
