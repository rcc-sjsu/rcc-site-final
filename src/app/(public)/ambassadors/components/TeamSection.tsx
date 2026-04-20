import MemberCard from "./MemberCard";

interface TeamSectionProps {
  title: string;
  description: string;
  members: Array<{ full_name: string; role: string; headshot_url?: string }>;
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
            full_name={member.full_name}
            key={member.full_name}
            role={member.role}
            imageUrl={member.headshot_url}
          />
        ))}
      </div>
    </section>
  );
};
