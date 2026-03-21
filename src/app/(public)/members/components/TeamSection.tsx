import MemberCard from "./MemberCard";

interface TeamSectionProps {
    title: string;
    description: string;
    members: Array<{ name: string; role: string; imageUrl?: string }>;
}

export default function TeamSection({ title, description, members }: TeamSectionProps) {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{title}</h2>
            <p className="mt-4 text-zinc-700 leading-relaxed">
                {description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <MemberCard
                        name={member.name}
                        key={member.name}
                        role={member.role}
                        imageUrl={member.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
};
