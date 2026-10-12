import { CalendarPlusIcon, type ClockIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getGoogleCalendarLink, type RccEvent } from '../data/Events';

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
