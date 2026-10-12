import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MemberCardProps {
  full_name: string;
  role: string;
  image_url?: string;
  team: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const isLeadRole = (role: string) => /\blead\b/i.test(role);

// "Workshops Ambassador" on the Workshops team just reads "Ambassador"
function shortRole(role: string, team: string) {
  const trimmed = role.replace(new RegExp(`^${team.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+`, 'i'), '');
  return trimmed || role;
}

export default function MemberCard({ full_name, role, image_url, team }: MemberCardProps) {
  const lead = isLeadRole(role);

  return (
    <figure className="group flex flex-col gap-3">
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-shadow duration-300 ease-hover group-hover:shadow-xl group-hover:shadow-rcc-violet/15',
          image_url ? 'bg-muted' : 'bg-linear-to-br from-rcc-violet to-[#9b6cf2]'
        )}
      >
        {image_url ? (
          <Image
            src={image_url}
            alt={`Headshot of ${full_name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover object-top transition-transform duration-500 ease-cta group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex size-full items-center justify-center" aria-hidden>
            <span className="font-mono text-4xl font-bold tracking-wider text-white/95 sm:text-5xl">
              {getInitials(full_name)}
            </span>
            <span className="absolute right-4 bottom-4 size-2.5 bg-[#f0479a]" />
            <span className="absolute right-7 bottom-4 size-2.5 bg-white/40" />
          </div>
        )}
        {lead && (
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-rcc-ink/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-white uppercase backdrop-blur-sm">
            <span aria-hidden className="size-1.5 bg-[#f0479a]" />
            Lead
          </span>
        )}
      </div>
      <figcaption className="flex flex-col gap-0.5 px-1">
        <span className="text-base leading-snug font-semibold text-foreground">{full_name}</span>
        <span className="text-sm text-muted-foreground">{shortRole(role, team)}</span>
      </figcaption>
    </figure>
  );
}
