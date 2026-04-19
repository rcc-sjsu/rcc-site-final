import React from 'react';
import TeamSection from './components/TeamSection';
import { createClient } from '../../../../utils/supabase/server';

type AmbassadorRow = {
  team_id: number;
  team_name: string;
  team_description: string | null;
  role: string | null;
  headshot_url: string | null;
  full_name: string | null;
};

export default async function AmbassadorsPage() {
  const supabase = await createClient();

  const { data: rows, error } = await supabase
    .from('public_ambassadors_view')
    .select('*')
    .returns<AmbassadorRow[]>();

  if (error) {
    console.error("Error fetching team members:", error);
    return <div>Failed to load ambassadors.</div>;
  }

  // 2. Group the flat rows by Team Name
  const teamsMap = new Map<string, any>();

  rows?.forEach((row) => {
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
        const { data: imgData } = supabase.storage
          .from('headshots')
          .getPublicUrl(row.headshot_url);
        imageUrl = imgData.publicUrl;
      }

      // Push the formatted member into the team's array
      teamsMap.get(row.team_name).members.push({
        full_name: row.full_name,
        role: row.role,
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
          The Mozilla Student Ambassadorship Program at RCC empowers students to take the lead in shaping the future of ethical technology.
          Ambassadors work closely with Mozilla and RCC to spark campus-wide conversations on responsible computing!
        </p>
        <p className="mt-4 text-zinc-700 leading-relaxed">
          Want to get involved? Reach out to us at{" "}
          <a href="mailto:rcc.sjsu@gmail.com" className="text-blue-600 hover:underline">rcc.sjsu@gmail.com</a>
          {" "}or follow us{" "}
          <a href="https://instagram.com/rcc.sjsu" className="text-blue-600 hover:underline">@rcc.sjsu</a>
          {" "}on Instagram to learn more!
        </p>
      </section>

      {teams.map((team) => (
        <TeamSection
          key={team.name}
          title={team.name}
          description={team.description || ''}
          members={team.members}
        />
      ))}
    </div>
  );
}
