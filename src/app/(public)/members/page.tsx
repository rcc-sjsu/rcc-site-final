import React from 'react';
import TeamSection from './components/TeamSection';
import { createClient } from '../../../../utils/supabase/server';

// Define the exact shape of the data expected from Supabase query
type Teams = {
  id: number;
  name: string;
  description: string | null;
  ambassadors: {
    role: string;
    headshot_url: string | null;
    students: {
      full_name: string;
    } | null;
  }[];
};

export default async function AmbassadorsPage() {
  const supabase = await createClient();

  // TODO: Sort by role so leads come first. Perhaps can define an ordering of roles in DB?
  // Append .returns<Teams[]>() to the query to cast the result from never[] to Teams[]
  const { data: teams, error } = await supabase
    .from('teams')
    .select(`
      id,
      name,
      description,
      ambassadors (
        role,
        headshot_url,
        students (
          full_name
        )
      )
    `)
    .returns<Teams[]>(); // <-- This completely bypasses the never[] LSP error

  if (error) {
    console.error("Error fetching teams:", error);
    return <div>Failed to load ambassadors.</div>;
  }

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

      {teams?.map(({ name, description, ambassadors }) => {

        const members = (ambassadors || []).map((ambassador) => ({
          full_name: ambassador.students?.full_name ?? "Unknown Student",
          role: ambassador.role,
          headshot_url: ambassador.headshot_url ?? undefined, // Maps null to undefined for the MemberCard prop
        }));

        return (
          <TeamSection
            key={name}
            title={name}
            description={description || ''}
            members={members}
          />
        );
      })}
    </div>
  );
}
