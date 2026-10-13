'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ClockIcon, MapPinIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { daysUntilEvent, describeDaysUntil, getEventStartDay, isEventPast, type RccEvent } from '../data/Events';
import EventDetailsDialog from './EventDetailsDialog';

type Tab = 'upcoming' | 'past';

const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

/**
 * Events as a dated timeline (Luma-style) with a small sticky month calendar beside it for jumping around. The list is
 * the page; the calendar is only navigation, so it stays compact and hides on phones.
 */
export default function EventsSchedule({
  upcoming,
  past,
  today,
}: {
  upcoming: RccEvent[];
  past: RccEvent[];
  today: number;
}) {
  const now = new Date(today);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [tab, setTab] = useState<Tab>(upcoming.length > 0 || past.length === 0 ? 'upcoming' : 'past');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const shown = tab === 'upcoming' ? upcoming : past;
  const all = [...upcoming, ...past];
  const eventDates = all.flatMap((event) => {
    const start = getEventStartDay(event);
    return event.days.map((day) => new Date(start.getFullYear(), start.getMonth(), day));
  });

  // group by start day, keeping the tab's order (soonest first for upcoming, most recent first for past)
  const groups: { date: Date; events: RccEvent[] }[] = [];
  for (const event of shown) {
    const date = getEventStartDay(event);
    const group = groups.find((g) => g.date.getTime() === date.getTime());
    if (group) group.events.push(event);
    else groups.push({ date, events: [event] });
  }

  const jumpTo = (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) return;
    const match = all.find((event) => {
      const start = getEventStartDay(event);
      return (
        start.getFullYear() === date.getFullYear() &&
        start.getMonth() === date.getMonth() &&
        event.days.includes(date.getDate())
      );
    });
    if (!match) return;
    setTab(isEventPast(match, now) ? 'past' : 'upcoming');
    // wait a frame so a tab switch has rendered before scrolling
    requestAnimationFrame(() =>
      document
        .querySelector(`[data-timeline-day="${dayKey(getEventStartDay(match))}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const selectedKey = selectedDate && dayKey(selectedDate);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
      <div className="flex min-w-0 flex-col gap-8">
        {/* two equal-width tabs, so the sliding pill only has to move by its own width */}
        <div
          role="tablist"
          aria-label="Which events"
          className="relative grid w-fit grid-cols-2 rounded-full bg-card p-1 ring-1 ring-foreground/10"
        >
          <span
            aria-hidden
            className={cn(
              'absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-rcc-violet shadow-md shadow-rcc-violet/25 transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none',
              tab === 'past' && 'translate-x-full'
            )}
          />
          {(
            [
              ['upcoming', 'Upcoming', upcoming.length],
              ['past', 'Past', past.length],
            ] as const
          ).map(([value, label, count]) => {
            const active = tab === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(value)}
                className={cn(
                  'relative z-10 flex h-9 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
                <span
                  className={cn(
                    'min-w-5 rounded-full px-1.5 font-mono text-[11px] leading-5 transition-colors duration-300',
                    active ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {groups.length > 0 ? (
          <ol key={tab} className="flex flex-col">
            {groups.map(({ date, events: dayEvents }, index) => {
              const key = dayKey(date);
              const isToday = date.getTime() === startOfToday.getTime();
              return (
                <li
                  key={key}
                  data-timeline-day={key}
                  style={{ animationDelay: `${index * 70}ms`, animationFillMode: 'both' }}
                  className={cn(
                    'relative scroll-mt-24 pb-10 pl-7 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-safe:ease-out sm:pl-9',
                    tab === 'past' ? 'motion-safe:slide-in-from-right-6' : 'motion-safe:slide-in-from-left-6',
                    // dashed rail connecting the days
                    index < groups.length - 1 &&
                      'before:absolute before:top-3 before:bottom-0 before:left-[5px] before:border-l before:border-dashed before:border-foreground/20'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-1.5 left-0 size-[11px] rounded-full ring-4 ring-muted',
                      tab === 'upcoming' && index === 0 ? 'bg-highlight' : 'bg-foreground/25'
                    )}
                  />
                  <h3 className="mb-4 flex items-baseline gap-2 text-base">
                    <span className="font-semibold text-foreground">
                      {isToday ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-muted-foreground">
                      {date.toLocaleDateString('en-US', { weekday: 'long' })}
                    </span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {dayEvents.map((event) => (
                      <TimelineCard
                        key={event.id}
                        event={event}
                        past={tab === 'past'}
                        selected={event.days.some(
                          (day) => selectedKey === dayKey(new Date(date.getFullYear(), date.getMonth(), day))
                        )}
                        badge={tab === 'upcoming' ? describeDaysUntil(daysUntilEvent(event, now)) : 'Ended'}
                      />
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <span className="rounded-xl border border-dashed bg-card p-8 text-center text-base text-muted-foreground">
            {tab === 'upcoming' ? 'No upcoming events right now. Check back soon!' : 'No past events yet.'}
          </span>
        )}
      </div>

      <aside className="hidden flex-col gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 lg:sticky lg:top-24 lg:flex">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={jumpTo}
          defaultMonth={upcoming[0] ? getEventStartDay(upcoming[0]) : startOfToday}
          today={now}
          fixedWeeks
          modifiers={{ event: eventDates, past: { before: startOfToday } }}
          modifiersClassNames={{
            event:
              '[&_button]:font-semibold [&_button]:text-primary after:pointer-events-none after:absolute after:bottom-1 after:left-1/2 after:z-20 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-highlight',
            past: 'opacity-45',
          }}
          className="w-full bg-transparent p-0 [--cell-size:2.25rem]"
          classNames={{ caption_label: 'text-sm font-semibold text-foreground' }}
          aria-label="Event calendar"
        />
        <p className="border-t pt-3 text-xs leading-relaxed text-muted-foreground">
          Days with a <span aria-hidden className="inline-block size-1.5 rounded-full bg-highlight align-middle" /> pink
          dot have events. Pick one to jump to it.
        </p>
      </aside>
    </div>
  );
}

/** One event on the timeline: time, title and place beside its artwork; opens the details popup. */
function TimelineCard({
  event,
  past,
  selected,
  badge,
}: {
  event: RccEvent;
  past: boolean;
  selected: boolean;
  badge: string;
}) {
  const time = event.time !== 'Not listed' ? event.time : 'Time TBA';
  const location = event.location !== 'Not listed' ? event.location : 'Location TBA';

  return (
    <EventDetailsDialog
      event={event}
      trigger={
        <button
          type="button"
          className={cn(
            'group flex w-full items-start gap-4 rounded-2xl bg-card p-4 text-left ring-1 ring-foreground/10 transition-shadow duration-200 ease-hover outline-none hover:shadow-lg hover:shadow-rcc-violet/10 hover:ring-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-5',
            selected && 'ring-2 ring-primary',
            past && 'opacity-75 hover:opacity-100'
          )}
        />
      }
    >
      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span
            className={cn(
              'rounded-full px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase',
              past ? 'bg-muted' : 'bg-accent text-primary'
            )}
          >
            {badge}
          </span>
          {event.days.length > 1 && <span>{event.date}</span>}
        </span>
        <span className="text-lg leading-snug font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
          {event.title}
        </span>
        <span className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <ClockIcon aria-hidden className="size-4 shrink-0" />
            {time}
          </span>
          <span className="flex items-center gap-2">
            <MapPinIcon aria-hidden className="size-4 shrink-0" />
            <span className="truncate">{location}</span>
          </span>
        </span>
      </span>
      {event.imageURL && (
        <span className="relative hidden aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-muted min-[480px]:block sm:w-32">
          <Image
            src={event.imageURL}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </span>
      )}
    </EventDetailsDialog>
  );
}
