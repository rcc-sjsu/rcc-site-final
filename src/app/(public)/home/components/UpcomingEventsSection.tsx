import Reveal from '@/components/Reveal';
import { TickButton } from '@/components/ui/pixel-button';
import EventCard from '../../events/components/EventCard';
import events, { getEventEndDate } from '../../events/data/Events';
import SectionHeading from '@/components/SectionHeading';

export default function UpcomingEventsSection() {
  const now = new Date();
  const upcoming = events.filter((event) => getEventEndDate(event) >= now).slice(0, 3);

  return (
    <section className="bg-muted py-20 sm:py-28" aria-labelledby="upcoming-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <SectionHeading
          id="upcoming-heading"
          eyebrow="What's next"
          title="Upcoming events"
          description="Talks, workshops, and hackathons open to every major."
        >
          <TickButton href="/events" className="w-fit shrink-0">
            See all events
          </TickButton>
        </SectionHeading>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <Reveal key={event.id} delay={index * 90} className="h-full">
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        ) : (
          <span className="rounded-xl border border-dashed bg-card p-8 text-center text-base text-muted-foreground">
            No upcoming events right now. Follow us on Instagram to hear about the next one.
          </span>
        )}
      </div>
    </section>
  );
}
