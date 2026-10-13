import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import EventsSchedule from './components/EventsSchedule';
import events, { getEventStartDay, isEventPast } from './data/Events';

// re-render hourly so countdowns stay current and finished events move to "Past events"
export const revalidate = 3600;

export default function Events() {
  const now = new Date();
  const byDate = [...events].sort((a, b) => getEventStartDay(a).getTime() - getEventStartDay(b).getTime());
  const upcoming = byDate.filter((event) => !isEventPast(event, now));
  const past = byDate.filter((event) => isEventPast(event, now)).reverse();

  return (
    <div style={{ overflow: 'clip' }}>
      <PageHero
        badge="Events"
        title="Learn, build, and"
        accent="connect."
        description="RCC's committees regularly hold events to promote community involvement in ethical technology and cross-disciplinary initiative!"
        image="/projects-heroimg.png"
      />

      <section id="schedule" className="scroll-mt-20 bg-muted py-20 sm:py-28" aria-labelledby="schedule-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-10">
          <SectionHeading
            id="schedule-heading"
            eyebrow="What's next"
            title="Schedule"
            description={
              upcoming.length > 0
                ? `${upcoming.length} ${upcoming.length === 1 ? 'event' : 'events'} coming up, open to every major.`
                : undefined
            }
          />
          <EventsSchedule upcoming={upcoming} past={past} today={now.getTime()} />
        </div>
      </section>
    </div>
  );
}
