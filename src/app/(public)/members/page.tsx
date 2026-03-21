import React from 'react';
import TeamSection from './components/TeamSection';

import teams from './teams'

export default function AmbassadorsPage() {
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

            {teams.map(({ title, description, members }) => (
                <TeamSection title={title} key={title} description={description} members={members} />
            ))}

        </div>
    );
}
