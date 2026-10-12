import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';
import MemberCard, { isLeadRole } from './MemberCard';

interface TeamSectionProps {
  id: string;
  title: string;
  description: string;
  members: Array<{ full_name: string; role: string; headshot_url?: string }>;
  muted?: boolean;
}

export default function TeamSection({ id, title, description, members, muted = false }: TeamSectionProps) {
  // leads first, otherwise keep the original order
  const sorted = [...members].sort((a, b) => Number(isLeadRole(b.role)) - Number(isLeadRole(a.role)));

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-32 py-16 sm:py-20', muted ? 'bg-muted' : 'bg-background')}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <Reveal className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end md:gap-12">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 font-pixel text-sm tracking-widest text-highlight uppercase">
              <span aria-hidden className="size-2 bg-highlight" />
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </span>
            <h2
              id={`${id}-heading`}
              className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-5xl"
            >
              {title}
            </h2>
          </div>
          {description && (
            <span className="text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</span>
          )}
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
          {sorted.map((member, index) => (
            <Reveal key={member.full_name} delay={(index % 5) * 60}>
              <MemberCard
                full_name={member.full_name}
                role={member.role}
                image_url={member.headshot_url}
                team={title}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
