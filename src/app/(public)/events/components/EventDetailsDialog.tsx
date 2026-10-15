'use client';

import { ArrowRightIcon, ClockIcon, MapPinIcon, UsersIcon, VideoIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { isEventPast, type RccEvent } from '../data/Events';
import EventCover from './EventCover';
import { AddToCalendarLink, EventDetail } from './EventDetail';

/** Event details popup; `trigger` is the element that opens it (rendered with any `children` inside). */
export default function EventDetailsDialog({
  event,
  trigger,
  children,
}: {
  event: RccEvent;
  trigger: React.ReactElement;
  children?: React.ReactNode;
}) {
  const past = isEventPast(event);

  return (
    <Dialog>
      <DialogTrigger render={trigger}>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
      >
        <DialogClose
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors outline-none hover:bg-white/25 focus-visible:ring-3 focus-visible:ring-white/60"
        >
          <XIcon aria-hidden className="size-4" />
        </DialogClose>
        <EventCover event={event} sizes="512px" compact className="aspect-[16/6] w-full shrink-0" />

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5">
          <DialogHeader>
            <span className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{event.date}</Badge>
              {event.tentative && <Badge variant="outline">Tentative</Badge>}
              {past && <Badge variant="outline">Ended</Badge>}
            </span>
            <DialogTitle className="text-xl">{event.title}</DialogTitle>
            <DialogDescription>
              {event.kind} · Hosted by RCC {event.team}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
            <EventDetail icon={ClockIcon}>{event.time ?? 'Time TBA'}</EventDetail>
            <EventDetail icon={MapPinIcon}>{event.location ?? 'Location TBA'}</EventDetail>
            {event.partners && <EventDetail icon={UsersIcon}>With {event.partners}</EventDetail>}
            {event.zoomURL && <EventDetail icon={VideoIcon}>Also streaming on Zoom</EventDetail>}
          </div>

          {event.description?.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-foreground/85">
              {paragraph}
            </p>
          ))}

          {event.highlights && (
            <ul className="flex flex-col gap-2 text-sm leading-snug text-foreground/85">
              {event.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-highlight" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {!event.description && !past && (
            <p className="text-sm text-muted-foreground">More details are on the way. Check back soon!</p>
          )}
        </div>

        <DialogFooter className="m-0 shrink-0 sm:items-center">
          {!event.rsvpURL && !past && (
            <span className="text-center text-xs text-muted-foreground sm:mr-auto">RSVP link coming soon</span>
          )}
          <DialogClose className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Close</DialogClose>
          {!past && <AddToCalendarLink event={event} />}
          {!past && event.zoomURL && (
            <a
              href={event.zoomURL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-sm')}
            >
              <VideoIcon aria-hidden />
              Zoom
            </a>
          )}
          {!past && event.rsvpURL && (
            <a
              href={event.rsvpURL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }), 'text-sm text-primary-foreground')}
            >
              RSVP
              <ArrowRightIcon aria-hidden />
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
