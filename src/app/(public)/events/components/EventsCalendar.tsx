'use client';

import { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import type { EventInput } from '@fullcalendar/core';

type CalendarApiEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  url?: string;
  location?: string;
  description?: string;
};

type SelectedEvent = {
  title: string;
  start: Date | null;
  end: Date | null;
  location?: string;
  description?: string;
};

const DEFAULT_CALENDAR_ID =
  '082bf7213754a85a4451e8c6e15be5b45d333021ef2d12f57fc257bfcd8c34fb@group.calendar.google.com';

export default function EventsCalendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedEvent | null>(null);

  const googleCalendarLink = useMemo(() => {
    const id = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID ?? DEFAULT_CALENDAR_ID;
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(id)}`;
  }, []);

  const dateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    []
  );

  const sanitizedDescriptionHtml = useMemo(() => {
    if (!selected?.description) return null;
    return DOMPurify.sanitize(selected.description, {
      USE_PROFILES: { html: true },
    });
  }, [selected?.description]);

  useEffect(() => {
    fetch('/api/calendar/events')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load events');
        return res.json();
      })
      .then((data: CalendarApiEvent[]) => {
        setEvents(
          data.map((e) => ({
            id: e.id,
            title: e.title,
            start: e.start,
            end: e.end,
            url: e.url,
            extendedProps: {
              location: e.location,
              description: e.description,
            },
          }))
        );
      })
      .catch(() => setError('Unable to load calendar events.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className="w-full rounded-lg border border-[var(--color-brand-pale-violet)] bg-[var(--color-brand-pale-blue)]/20 flex items-center justify-center min-h-[500px]"
        data-cy="calendar-loading"
      >
        <p className="text-[var(--color-brand-dark-violet)] font-medium">Loading calendar…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full rounded-lg border border-red-200 bg-red-50 flex items-center justify-center min-h-[500px]"
        data-cy="calendar-error"
      >
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="rcc-calendar w-full overflow-hidden rounded-lg mb-16 [&_.fc]:font-sans"
      data-cy="calendar-embed-iframe"
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        events={events}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          setSelected({
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            location: (info.event.extendedProps as { location?: string }).location,
            description: (info.event.extendedProps as { description?: string }).description,
          });
        }}
        height="auto"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        nowIndicator
        locale="en"
        firstDay={0}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          list: 'List',
        }}
      />

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Event details"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white border border-[var(--color-brand-pale-violet)] shadow-xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-[var(--color-brand-dark-violet)]">{selected.title}</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[var(--color-brand-ironside-grey)] hover:text-[var(--color-brand-dark-grey)]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <p className="text-sm text-[var(--color-brand-dark-grey)]">
                <span className="font-semibold">When:</span>{' '}
                {selected.start ? dateTimeFormatter.format(selected.start) : 'TBD'}
                {selected.end ? ` – ${dateTimeFormatter.format(selected.end)}` : ''}
              </p>

              {selected.location && (
                <p className="text-sm text-[var(--color-brand-dark-grey)]">
                  <span className="font-semibold">Where:</span> {selected.location}
                </p>
              )}

              {sanitizedDescriptionHtml && (
                <div
                  className="text-sm text-[var(--color-brand-dark-grey)] space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-[var(--color-brand-indigo)] [&_a]:underline [&_b]:font-semibold [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHtml }}
                />
              )}

              <a
                className="inline-block text-sm font-semibold text-[var(--color-brand-indigo)] hover:underline"
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open RCC calendar in Google Calendar
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
