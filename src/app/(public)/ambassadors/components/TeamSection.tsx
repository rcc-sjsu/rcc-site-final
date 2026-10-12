import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { cn } from '@/lib/utils';
import MemberCard from './MemberCard';

interface TeamSectionProps {
  title: string;
  description: string;
  members: Array<{ full_name: string; role: string; headshot_url?: string }>;
  muted?: boolean;
}

export default function TeamSection({ title, description, members, muted = false }: TeamSectionProps) {
  return (
    <section className={cn('py-16 sm:py-24', muted ? 'bg-muted' : 'bg-background')}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <SectionHeading
          eyebrow={`${members.length} ${members.length === 1 ? 'member' : 'members'}`}
          title={title}
          description={description || undefined}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <Reveal key={member.full_name} delay={(index % 4) * 70} className="h-full">
              <MemberCard full_name={member.full_name} role={member.role} image_url={member.headshot_url} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
