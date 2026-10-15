'use client';

import { ArrowRightIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { RccEvent } from '../data/Events';
import EventCover from './EventCover';
import EventDetailsDialog from './EventDetailsDialog';
import { EventDetail, EventQuickActions } from './EventDetail';

export default function EventCard({ event }: { event: RccEvent }) {
  return (
    // the whole card opens the details popup via a transparent button underneath it: the card ignores pointer events
    // so clicks fall through, except on the calendar/RSVP links
    <div className="group relative h-full">
      <EventDetailsDialog
        event={event}
        trigger={
          <button
            type="button"
            data-card-trigger=""
            aria-label={`${event.title}: view details`}
            className="absolute inset-0 rounded-xl outline-none"
          />
        }
      />
      <Card className="pointer-events-none relative h-full gap-0 py-0 group-has-[[data-card-trigger]:focus-visible]:ring-3 group-has-[[data-card-trigger]:focus-visible]:ring-ring/50 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-rcc-violet/10 group-hover:ring-primary/30 motion-reduce:group-hover:translate-y-0">
        <EventCover
          event={event}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[16/10] w-full"
        />

        <CardHeader className="gap-2 pt-4">
          {event.tentative && (
            <span className="w-fit rounded-full bg-muted px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              Tentative
            </span>
          )}
          <CardTitle className="line-clamp-2 text-base font-semibold text-foreground">{event.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-1.5 pt-3 pb-4">
          <EventDetail icon={ClockIcon}>{event.time ?? 'Time TBA'}</EventDetail>
          <EventDetail icon={MapPinIcon}>{event.location ?? 'Location TBA'}</EventDetail>
          {event.partners && <EventDetail icon={UsersIcon}>With {event.partners}</EventDetail>}
        </CardContent>

        <CardFooter className="justify-between gap-3 border-t bg-transparent py-2.5 text-sm font-medium text-primary">
          <span className="flex items-center gap-1.5">
            View details
            <ArrowRightIcon
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              aria-hidden
            />
          </span>
          <EventQuickActions event={event} />
        </CardFooter>
      </Card>
    </div>
  );
}
