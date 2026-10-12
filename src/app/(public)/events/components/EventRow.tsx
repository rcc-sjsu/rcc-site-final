'use client';

import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { describeDaysUntil, getEventStartDay, type RccEvent } from '../data/Events';
import EventDetailsDialog from './EventDetailsDialog';

/** Compact agenda row: date tile, title, time and place; opens the details popup. */
export default function EventRow({
  event,
  daysUntil,
  past = false,
}: {
  event: RccEvent;
  daysUntil?: number;
  past?: boolean;
}) {
  const start = getEventStartDay(event);

  return (
    <EventDetailsDialog
      event={event}
      trigger={
        <button
          type="button"
          className={cn(
            'group flex w-full items-center gap-4 rounded-xl bg-card p-3 text-left ring-1 ring-foreground/10 transition-[box-shadow,translate] duration-200 ease-hover outline-none hover:shadow-lg hover:shadow-rcc-violet/10 hover:ring-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-4',
            past && 'opacity-70 hover:opacity-100'
          )}
        />
      }
    >
      <span
        className={cn(
          'flex size-14 shrink-0 flex-col items-center justify-center rounded-lg sm:size-16',
          past ? 'bg-muted text-muted-foreground' : 'bg-accent text-primary'
        )}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">
          {start.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
        <span className="font-mono text-xl leading-none font-bold sm:text-2xl">{start.getDate()}</span>
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="line-clamp-2 text-base leading-snug font-semibold text-foreground">{event.title}</span>
        <span className="truncate text-sm text-muted-foreground">
          {[event.time, event.location].filter((part) => part !== 'Not listed').join(' · ') || 'Time and place TBA'}
        </span>
      </span>

      {daysUntil !== undefined && !past && (
        <span className="hidden shrink-0 rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground sm:block">
          {describeDaysUntil(daysUntil)}
        </span>
      )}
      {past && (
        <span className="hidden shrink-0 rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground sm:block">
          Ended
        </span>
      )}
      <ChevronRightIcon
        aria-hidden
        className="size-5 shrink-0 text-muted-foreground transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </EventDetailsDialog>
  );
}
