import Image from 'next/image';
import { ArrowRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getEventStartDay, type RccEvent } from '../data/Events';
import { AddToCalendarLink, EventDetail } from './EventDetail';

/** Full event details shown inline (used in the calendar's day panel instead of a popup). */
export default function EventInlineDetails({ event, past = false }: { event: RccEvent; past?: boolean }) {
  const start = getEventStartDay(event);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300">
      {event.imageURL && (
        <div className="relative aspect-[16/6] w-full bg-muted">
          <Image src={event.imageURL} alt="" fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" />
          {past && (
            <Badge variant="outline" className="absolute top-3 left-3 border-transparent shadow-sm">
              Ended
            </Badge>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-widest text-highlight uppercase">
            {start.toLocaleDateString('en-US', { weekday: 'short' })} · {event.date}
          </span>
          <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em] text-foreground">{event.title}</h3>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
          <EventDetail icon={CalendarDaysIcon}>
            {event.days.length > 1 ? `${event.days.length}-day event` : 'Single-day event'}
          </EventDetail>
          <EventDetail icon={ClockIcon}>{event.time}</EventDetail>
          <EventDetail icon={MapPinIcon}>{event.location}</EventDetail>
        </div>

        {!past && (
          <div className="flex flex-wrap items-center gap-3">
            {event.formURL ? (
              <a
                href={event.formURL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: 'sm' }), 'h-9 px-4 text-sm text-primary-foreground')}
              >
                Sign up
                <ArrowRightIcon aria-hidden />
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">Sign-up link coming soon</span>
            )}
            <AddToCalendarLink event={event} className="h-9 px-4" />
          </div>
        )}
      </div>
    </article>
  );
}
