'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import events from '../data/Events';

const eventDates = events.flatMap((event) => event.days.map((day) => new Date(2026, 9, day)));

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 9, 7));
  const selectedEvents = selectedDate
    ? events.filter((event) => event.days.includes(selectedDate.getDate()) && selectedDate.getMonth() === 9)
    : [];

  return (
    <section className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-[var(--color-brand-lavender)] bg-white p-5 shadow-sm md:grid-cols-[auto_1fr] md:p-8">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        defaultMonth={new Date(2026, 9, 1)}
        startMonth={new Date(2026, 9, 1)}
        endMonth={new Date(2026, 9, 31)}
        fixedWeeks
        modifiers={{ event: eventDates }}
        modifiersClassNames={{
          event:
            '[&_button]:font-bold [&_button]:text-[var(--color-brand-indigo)] [&_button]:ring-2 [&_button]:ring-[var(--color-brand-lavender)]',
        }}
        className="mx-auto [--cell-size:2.75rem] sm:[--cell-size:3.25rem]"
        aria-label="October 2026 event calendar"
      />

      <div className="rounded-xl bg-[var(--color-brand-pale-blue)] p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand-dull-periwinkle)]">
          {selectedDate
            ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'Select a date'}
        </p>

        {selectedEvents.length > 0 ? (
          <div className="mt-4 space-y-4">
            {selectedEvents.map((event) => (
              <article key={event.id}>
                <h4 className="text-xl font-bold text-[var(--color-brand-indigo)]">{event.title}</h4>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Time:</span> {event.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No RCC events scheduled for this date.</p>
        )}

        <p className="mt-6 text-sm text-gray-500">
          Dates outlined in purple have scheduled events. Select a date to see its details.
        </p>
      </div>
    </section>
  );
}
