import PageHero from '@/components/PageHero';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import TeamJumpBar from './components/TeamJumpBar';
import TeamSection from './components/TeamSection';
import { createClient } from '@/lib/supabase/server';
import { QueryData } from '@supabase/supabase-js';

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
  type Ambassadors = QueryData<typeof ambassadorsQuery>;

  const { data, error } = await ambassadorsQuery;

  if (error) {
    console.error(`Error fetching team members: [${error.code}] ${error.message}`);
    return (
      <div style={{ overflow: 'clip' }}>
        <AmbassadorsHero />
        <section className="bg-muted px-6 py-20 text-center">
          <span className="text-base text-muted-foreground">
            We couldn&apos;t load our ambassadors right now. Please try again later.
          </span>
        </section>
      </div>
    );
  }

  const rows: Ambassadors = data;

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
    <div style={{ overflow: 'clip' }}>
      <AmbassadorsHero />
      <TeamJumpBar
        teams={teams.map((team) => ({ id: teamId(team.name), name: team.name, count: team.members.length }))}
      />

      {teams.map((team, index) => (
        <TeamSection
          key={team.name}
          id={teamId(team.name)}
          title={team.name}
          description={team.description || ''}
          members={team.members}
          muted={index % 2 === 0}
        />
      ))}
    </div>
  );
}

const teamId = (name: string) => `team-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

function AmbassadorsHero() {
  return (
    <PageHero
      badge="Mozilla Student Ambassadors"
      title="Meet our"
      accent="ambassadors."
      description="The Mozilla Student Ambassadorship Program at RCC empowers students to take the lead in shaping the future of ethical technology, sparking campus-wide conversations on responsible computing."
      image="/images/picnic-social.jpg"
    >
      <PixelCta href="mailto:rcc.sjsu@gmail.com" className="font-mono text-sm tracking-wide uppercase">
        Email us
      </PixelCta>
      <TickButton href="https://instagram.com/rcc.sjsu" target="_blank" rel="noopener noreferrer">
        @rcc.sjsu
      </TickButton>
    </PageHero>
  );
}
