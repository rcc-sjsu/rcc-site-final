import { NextResponse } from 'next/server';

const CALENDAR_ID = 'cfded6dda19dfd3d689afd5790274ba9d55ac426e796e0d86b13e2c587cc321f@group.calendar.google.com';

function getCalendarFeedUrl(): string {
  const id = CALENDAR_ID;
  const encoded = encodeURIComponent(id);
  return `https://calendar.google.com/calendar/ical/${encoded}/public/basic.ics`;
}

/** Parse an ICS date string (DATE or DATE-TIME) to ISO string */
function parseICSDate(value: string): string {
  if (!value) return new Date().toISOString();
  const raw = value.replace(/\s/g, '').trim();
  if (raw.length === 8) return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}T00:00:00.000Z`;
  if (raw.includes('T')) return raw.endsWith('Z') ? raw : `${raw}Z`;
  return new Date().toISOString();
}

function unescapeICSValue(value: string): string {
  return value.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\').trim();
}

/** Minimal ICS parser: extract VEVENTs and return events for FullCalendar */
function parseICSEvents(icsText: string): {
  id: string;
  title: string;
  start: string;
  end: string;
  url?: string;
  location?: string;
  description?: string;
}[] {
  const events: {
    id: string;
    title: string;
    start: string;
    end: string;
    url?: string;
    location?: string;
    description?: string;
  }[] = [];
  const unfolded = icsText.replace(/\r\n[\s\t]/g, '').replace(/\r\n/g, '\n');
  const veventBlocks = unfolded.split(/BEGIN:VEVENT/).slice(1);

  for (const block of veventBlocks) {
    const part = block.split(/END:VEVENT/)[0] ?? '';
    const uidMatch = part.match(/\bUID:(.+?)(?:\n|$)/);
    const summaryMatch = part.match(/\bSUMMARY(?:;[^:]*)?:(.+?)(?:\n|$)/);
    const dtstartMatch = part.match(/\bDTSTART(?:;[^:]*)?:(.+?)(?:\n|$)/);
    const dtendMatch = part.match(/\bDTEND(?:;[^:]*)?:(.+?)(?:\n|$)/);
    const urlMatch = part.match(/\bURL:(.+?)(?:\n|$)/);
    const locationMatch = part.match(/\bLOCATION(?:;[^:]*)?:(.+?)(?:\n|$)/);
    const descriptionMatch = part.match(/\bDESCRIPTION(?:;[^:]*)?:(.+?)(?:\n|$)/);

    const uid = uidMatch?.[1]?.trim() ?? `event-${events.length}`;
    const title = summaryMatch?.[1] ? unescapeICSValue(summaryMatch[1]).replace(/\n/g, ' ') : 'Event';
    const startRaw = dtstartMatch?.[1]?.trim();
    const endRaw = dtendMatch?.[1]?.trim();
    const url = urlMatch?.[1]?.trim();
    const location = locationMatch?.[1] ? unescapeICSValue(locationMatch[1]) : undefined;
    const description = descriptionMatch?.[1] ? unescapeICSValue(descriptionMatch[1]) : undefined;

    if (!startRaw) continue;

    const start = parseICSDate(startRaw);
    const end = endRaw ? parseICSDate(endRaw) : start;

    events.push({
      id: uid,
      title,
      start,
      end,
      url: url || undefined,
      location,
      description,
    });
  }

  events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  return events;
}

export async function GET() {
  try {
    const url = getCalendarFeedUrl();
    const res = await fetch(url, {
      next: { revalidate: 600 },
      headers: { 'User-Agent': 'RCC-Site-Calendar/1.0' },
    });

    if (res.status === 404) {
      console.warn(
        'Calendar API: Feed returned 404. Check that GOOGLE_CALENDAR_ID is correct and the calendar is set to "Make available to public" in Google Calendar sharing.'
      );
      return NextResponse.json([], {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
      });
    }

    if (res.status === 429 || res.status === 403) {
      console.warn(
        `Calendar API: Feed returned ${res.status} (rate limit or access denied). Returning cached/empty events.`
      );
      return NextResponse.json([], {
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
      });
    }

    if (!res.ok) throw new Error(`Calendar feed returned ${res.status}`);
    const icsText = await res.text();
    const events = parseICSEvents(icsText);

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=900',
      },
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}
