'use client';

import Image from 'next/image';
import { ArrowRightIcon, CalendarDaysIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { RccEvent } from '../data/Events';
import EventDetailsDialog from './EventDetailsDialog';
import { EventDetail } from './EventDetail';

export default function EventCard({ event }: { event: RccEvent }) {
  return (
    <EventDetailsDialog
      event={event}
      trigger={
        <button
          type="button"
          className="group h-full w-full rounded-xl text-left transition-transform duration-[120ms] ease-cta outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.99]"
        />
      }
    >
      <Card className="h-full gap-0 py-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-rcc-violet/10 group-hover:ring-primary/30 motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          {event.imageURL ? (
            <Image
              src={event.imageURL}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <CalendarDaysIcon className="size-10 text-muted-foreground" aria-hidden />
            </div>
          )}
          <Badge variant="outline" className="absolute top-3 left-3 border-transparent text-rcc-navy shadow-sm">
            {event.date}
          </Badge>
        </div>

        <CardHeader className="pt-4">
          <CardTitle className="line-clamp-2 text-base font-semibold text-foreground">{event.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-1.5 pt-3 pb-4">
          <EventDetail icon={ClockIcon}>{event.time}</EventDetail>
          <EventDetail icon={MapPinIcon}>{event.location}</EventDetail>
        </CardContent>

        <CardFooter className="justify-between border-t bg-transparent py-3 text-sm font-medium text-primary">
          View details
          <ArrowRightIcon
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            aria-hidden
          />
        </CardFooter>
      </Card>
    </EventDetailsDialog>
  );
}
