'use client';

import { useState } from 'react';
import { CalendarSearchIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import events from '../data/Events';
import EventInlineDetails from './EventInlineDetails';

const eventDates = events.flatMap((event) => event.days.map((day) => new Date(2026, 9, day)));

/** Month view with event days marked; picking a day shows that day's events in full beside it. */
export default function EventsCalendar({ initialDay, today }: { initialDay: number; today: number }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 9, initialDay));
  const todayDate = new Date(today);
  const isOctober = selectedDate?.getFullYear() === 2026 && selectedDate.getMonth() === 9;
  const selectedEvents = selectedDate
    ? events.filter((event) => isOctober && event.days.includes(selectedDate.getDate()))
    : [];
  const startOfToday = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  return (
    <Card className="mx-auto w-full max-w-5xl gap-0 p-0 md:grid md:grid-cols-[auto_1fr]">
      <CardContent className="flex flex-col items-center gap-4 p-4 md:border-r md:p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={new Date(2026, 9, 1)}
          today={todayDate}
          fixedWeeks
          modifiers={{ event: eventDates, past: { before: startOfToday } }}
          modifiersClassNames={{
            event:
              '[&_button]:font-semibold [&_button]:text-primary after:pointer-events-none after:absolute after:bottom-1.5 after:left-1/2 after:z-20 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-highlight',
            past: 'opacity-45',
          }}
          className="bg-transparent p-0 [--cell-size:2.5rem] sm:[--cell-size:3rem]"
          classNames={{ caption_label: 'text-base font-semibold text-foreground' }}
          aria-label="October 2026 event calendar"
        />
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-highlight" /> Event
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-3 rounded-sm bg-muted ring-1 ring-foreground/10" /> Today
          </span>
          <span className="flex items-center gap-1.5 opacity-60">Past days dimmed</span>
        </div>
      </CardContent>

      <CardContent className="flex flex-col gap-4 bg-muted/60 p-5 md:p-6">
        <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {selectedDate
            ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
            : 'Select a date'}
        </span>

        {selectedEvents.length > 0 ? (
          <div className="flex flex-col gap-3">
            {selectedEvents.map((event) => (
              <EventInlineDetails
                key={event.id}
                event={event}
                past={new Date(2026, 9, Math.max(...event.days)) < startOfToday}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card/60 p-8 text-center">
            <CalendarSearchIcon className="size-6 text-muted-foreground" aria-hidden />
            <span className="text-sm text-muted-foreground">
              Nothing on this day. Pick a date with a pink dot to see what&apos;s happening.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
