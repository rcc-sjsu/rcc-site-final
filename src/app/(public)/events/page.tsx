import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import EventsCalendar from './components/EventsCalendar';
import EventRow from './components/EventRow';
import FeaturedEvent from './components/FeaturedEvent';
import events, { daysUntilEvent, getEventStartDay, isEventPast } from './data/Events';

// re-render hourly so countdowns stay current and finished events move to "Past events"
export const revalidate = 3600;

export default function Events() {
  const now = new Date();
  const byDate = [...events].sort((a, b) => getEventStartDay(a).getTime() - getEventStartDay(b).getTime());
  const upcoming = byDate.filter((event) => !isEventPast(event, now));
  const past = byDate.filter((event) => isEventPast(event, now)).reverse();
  const [featured, ...later] = upcoming;

  return (
    <div style={{ overflow: 'clip' }}>
      <PageHero
        badge="Events"
        title="Learn, build, and"
        accent="connect."
        description="RCC's committees regularly hold events to promote community involvement in ethical technology and cross-disciplinary initiative!"
        image="/projects-heroimg.png"
      >
        <PixelCta href="#upcoming" className="font-mono text-sm tracking-wide uppercase">
          Upcoming events
        </PixelCta>
        <TickButton href="#calendar">Open calendar</TickButton>
      </PageHero>

      <section id="upcoming" className="scroll-mt-20 bg-muted py-20 sm:py-28" aria-labelledby="upcoming-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-10">
          <SectionHeading
            id="upcoming-heading"
            eyebrow="What's next"
            title="Upcoming events"
            description={
              upcoming.length > 0
                ? `${upcoming.length} ${upcoming.length === 1 ? 'event' : 'events'} coming up, open to every major.`
                : undefined
            }
          />

          {featured ? (
            <>
              <Reveal>
                <FeaturedEvent event={featured} daysUntil={daysUntilEvent(featured, now)} />
              </Reveal>

              {later.length > 0 && (
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    Later this month
                  </span>
                  <ul className="flex flex-col gap-3">
                    {later.map((event, index) => (
                      <li key={event.id}>
                        <Reveal delay={index * 70}>
                          <EventRow event={event} daysUntil={daysUntilEvent(event, now)} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <span className="rounded-xl border border-dashed bg-card p-8 text-center text-base text-muted-foreground">
              No upcoming events right now. Check back soon!
            </span>
          )}
        </div>
      </section>

      <section id="calendar" className="scroll-mt-20 bg-background py-20 sm:py-28" aria-labelledby="calendar-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-10">
          <SectionHeading
            id="calendar-heading"
            eyebrow="Plan ahead"
            title="Calendar"
            description="Pick a day to see what's happening."
            align="center"
          />
          <Reveal>
            <EventsCalendar
              initialDay={featured ? getEventStartDay(featured).getDate() : now.getDate()}
              today={now.getTime()}
            />
          </Reveal>
        </div>
      </section>

      {past.length > 0 && (
        <section className="bg-muted py-20 sm:py-24" aria-labelledby="past-heading">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:px-10">
            <SectionHeading id="past-heading" eyebrow="Recap" title="Past events" />
            <ul className="grid gap-3 md:grid-cols-2">
              {past.map((event) => (
                <li key={event.id}>
                  <EventRow event={event} past />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
