import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { Badge } from '@/components/ui/badge';
import { TickButton } from '@/components/ui/pixel-button';
import SectionHeading from '@/components/SectionHeading';

const teams = [
  'Executive Board',
  'Workshops',
  'Case',
  'Consulting',
  'Industry',
  'Web Development',
  'Marketing',
  'Finance',
  'Growth Analytics',
  'Journalism',
  'Membership Outreach',
];

export default function ResourcesSection() {
  return (
    <section className="bg-background py-20 sm:py-28" aria-labelledby="teams-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="teams-heading"
            eyebrow="What we offer"
            title="Find your place in RCC"
            description="Join one of our ambassador teams to run workshops, take on case competitions, build real projects, and grow a community around ethical tech."
          />

          <ul className="flex flex-wrap gap-2" aria-label="RCC ambassador teams">
            {teams.map((team) => (
              <li key={team}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium transition-colors duration-200 ease-hover hover:bg-primary hover:text-primary-foreground"
                >
                  {team}
                </Badge>
              </li>
            ))}
          </ul>

          <TickButton href="/ambassadors" className="w-fit shrink-0">
            Meet our ambassadors
          </TickButton>
        </div>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/figma/resources-top.png"
              alt="RCC attendees listening during a workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/figma/resources-lauren-klein.png"
              alt="Lauren Klein speaking at an RCC event"
              fill
              sizes="(max-width: 1024px) 50vw, 340px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/figma/resources-ai-fraud.png"
              alt="Students participating in an AI and fraud case competition"
              fill
              sizes="(max-width: 1024px) 50vw, 340px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
