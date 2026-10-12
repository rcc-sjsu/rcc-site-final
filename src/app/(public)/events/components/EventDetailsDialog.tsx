'use client';

import Image from 'next/image';
import { ArrowRightIcon, ClockIcon, MapPinIcon } from 'lucide-react';
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
import type { RccEvent } from '../data/Events';
import { AddToCalendarLink, EventDetail } from './EventDetail';

/** Event details popup; `trigger` is the element that opens it (rendered with `children` inside). */
export default function EventDetailsDialog({
  event,
  trigger,
  children,
}: {
  event: RccEvent;
  trigger: React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger render={trigger}>{children}</DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        {event.imageURL && (
          <div className="relative aspect-[16/9] w-full bg-muted">
            <Image src={event.imageURL} alt="" fill sizes="448px" className="object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-4 p-5">
          <DialogHeader>
            <Badge variant="accent">{event.date}</Badge>
            <DialogTitle className="text-xl">{event.title}</DialogTitle>
            <DialogDescription>Responsible Computing Club event</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
            <EventDetail icon={ClockIcon}>{event.time}</EventDetail>
            <EventDetail icon={MapPinIcon}>{event.location}</EventDetail>
          </div>
        </div>

        <DialogFooter className="m-0 sm:items-center">
          {!event.formURL && (
            <span className="text-center text-xs text-muted-foreground sm:mr-auto">Sign-up link coming soon</span>
          )}
          <DialogClose className={buttonVariants({ variant: 'ghost', size: 'sm' })}>Close</DialogClose>
          <AddToCalendarLink event={event} />
          {event.formURL && (
            <a
              href={event.formURL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }), 'text-sm text-primary-foreground')}
            >
              Sign up
              <ArrowRightIcon aria-hidden />
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
