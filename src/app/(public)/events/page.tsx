'use client';

import Divider from '@/components/Divider';
import Heading from '@/components/Heading';
import EventImages from './components/EventImages';
import EventsCalendar from './components/EventsCalendar';
import EventCard from './components/EventCard';
import events from './data/Events';

export default function Events() {
  return (
    <div className="px-4 sm:px-6 lg:px-20">

      {/* Page heading */}
      <div className="flex flex-col lg:flex-row items-center justify-center mb-8 sm:mb-16">
        <Heading
          headingTag="h1"
          align="center"
          logoPath="/icons/shape-icon.svg"
          logoAlign="right"
          logoSize={12}
          aria-labelledby="events-heading"
        >
          Events
        </Heading>
      </div>

      {/* Images + Description */}
      <EventImages />

      <Divider />

      {/* Upcoming Events */}
      <div className="mt-10 mb-8 sm:mb-16">
        <div className="flex items-center justify-center mb-8">
          <Heading headingTag="h2" align="center">
            Upcoming Events
          </Heading>
        </div>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-brand-dark-lavender)]">
            No upcoming events. Check back soon!
          </p>
        )}
      </div>

      <Divider />

      {/* Calendar */}
      <div className="mt-10 mb-8 sm:mb-16">
        <div className="flex items-center justify-center mb-8">
          <Heading headingTag="h2" align="center">
            Calendar
          </Heading>
        </div>
        <EventsCalendar />
      </div>

    </div>
  );
}