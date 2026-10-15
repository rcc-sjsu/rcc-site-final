import { ArrowUpRightIcon, CalendarPlusIcon, type ClockIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getGoogleCalendarLink, isEventPast, type RccEvent } from '../data/Events';

// (kept free of 'use client' so both server and client components can render these)

export function EventDetail({ icon: Icon, children }: { icon: typeof ClockIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <Icon className="mt-0.5 size-4 shrink-0 text-rcc-navy" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

export function AddToCalendarLink({ event, className }: { event: RccEvent; className?: string }) {
  return (
    <a
      href={getGoogleCalendarLink(event)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-sm', className)}
    >
      <CalendarPlusIcon aria-hidden />
      Add to calendar
    </a>
  );
}

/**
 * Small "add to calendar" + "RSVP" pair for event cards. Cards ignore pointer events so clicks fall through to the
 * details button underneath; these opt back in. Renders nothing for past events.
 */
export function EventQuickActions({ event, className }: { event: RccEvent; className?: string }) {
  if (isEventPast(event)) return null;
  return (
    <span className={cn('pointer-events-auto flex shrink-0 items-center gap-1.5', className)}>
      <a
        href={getGoogleCalendarLink(event)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Add ${event.title} to Google Calendar`}
        title="Add to calendar"
        className="flex size-8 items-center justify-center rounded-full text-primary ring-1 ring-foreground/10 transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <CalendarPlusIcon aria-hidden className="size-4" />
      </a>
      {event.rsvpURL && (
        <a
          href={event.rsvpURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`RSVP for ${event.title}`}
          className="flex h-8 items-center gap-1 rounded-full bg-primary pr-2.5 pl-3 text-xs font-semibold text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          RSVP
          <ArrowUpRightIcon aria-hidden className="size-3.5" />
        </a>
      )}
    </span>
  );
}
