import Image from 'next/image';
import { ArrowRightIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { describeDaysUntil, getEventStartDay, type RccEvent } from '../data/Events';
import { AddToCalendarLink, EventDetail } from './EventDetail';

/** Large card for the very next event: artwork, countdown, details, and the actions you'd want right away. */
export default function FeaturedEvent({ event, daysUntil }: { event: RccEvent; daysUntil: number }) {
  const start = getEventStartDay(event);

  return (
    <article className="grid overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative aspect-[16/10] bg-muted md:aspect-auto md:min-h-80">
        <Image src={event.imageURL} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
        <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-rcc-ink/80 px-3 py-1 font-mono text-xs tracking-widest text-white uppercase backdrop-blur-sm">
          <span aria-hidden className="size-2 bg-[#f0479a]" />
          Next up · {describeDaysUntil(daysUntil)}
        </span>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-rcc-violet text-white">
            <span className="font-mono text-[11px] tracking-widest uppercase opacity-80">
              {start.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="font-mono text-2xl leading-none font-bold">{start.getDate()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {start.toLocaleDateString('en-US', { weekday: 'long' })}
            </span>
            <span className="text-sm text-muted-foreground">{event.date}</span>
          </div>
        </div>

        <h3 className="text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-3xl">
          {event.title}
        </h3>

        <div className="flex flex-col gap-2">
          <EventDetail icon={ClockIcon}>{event.time}</EventDetail>
          <EventDetail icon={MapPinIcon}>{event.location}</EventDetail>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3">
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
      </div>
    </article>
  );
}
