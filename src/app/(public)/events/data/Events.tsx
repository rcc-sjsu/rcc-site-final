const events = [
  {
    id: 1,
    title: 'RCC October General Meeting',
    date: 'October 7',
    days: [7],
    time: 'Not listed',
    location: 'Not listed',
    formURL: '',
    imageURL: '/images/events/generated/october-general-meeting.webp',
  },
  {
    id: 2,
    title: 'Public Interest Technology: Designing a Meaningful Career',
    date: 'October 14',
    days: [14],
    time: '1:00–3:00 PM',
    location: 'ISB 874, SJSU',
    formURL: '',
    imageURL: '/images/events/generated/public-interest-technology.webp',
  },
  {
    id: 3,
    title: 'Open Source AI: Building Reliable AI Systems',
    date: 'October 19',
    days: [19],
    time: '5:00–7:30 PM',
    location: 'Clark Hall 102',
    formURL: '',
    imageURL: '/images/events/generated/open-source-ai.webp',
  },
  {
    id: 4,
    title: 'SpartHill Hacks 2026: AI for Sustainable Impact',
    date: 'October 23–24',
    days: [23, 24],
    time: '8:00 AM–5:00 PM',
    location: 'Spartan Complex',
    formURL: '',
    imageURL: '/images/events/generated/sparthill-hacks.webp',
  },
  {
    id: 5,
    title: 'Spartan Fright Night [Tentative]',
    date: 'October 26',
    days: [26],
    time: '6:00–9:00 PM',
    location: '7th Street Plaza and nearby campus facilities',
    formURL: '',
    imageURL: '/images/events/generated/spartan-fright-night.webp',
  },
];

export type RccEvent = (typeof events)[number];

// all current events are in October 2026
const YEAR = 2026;
const MONTH = 9;

// returns the end of the event's last day
export function getEventEndDate(event: RccEvent) {
  return new Date(YEAR, MONTH, Math.max(...event.days), 23, 59, 59);
}

// the event's first day, at midnight
export function getEventStartDay(event: RccEvent) {
  return new Date(YEAR, MONTH, Math.min(...event.days));
}

export function isEventPast(event: RccEvent, now = new Date()) {
  return getEventEndDate(event) < now;
}

// whole days from today until the event starts (0 = today, negative = already started)
export function daysUntilEvent(event: RccEvent, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((getEventStartDay(event).getTime() - today.getTime()) / 86_400_000);
}

export function describeDaysUntil(days: number) {
  if (days < 0) return 'Happening now';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days} days`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? 'In a week' : `In ${weeks} weeks`;
}

// parses times like "1:00–3:00 PM" or "8:00 AM–5:00 PM" into 24h [hours, minutes] pairs; null if not listed
function parseTimeRange(time: string): [[number, number], [number, number]] | null {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const to24 = (hours: number, meridiem: string) => (hours % 12) + (meridiem.toUpperCase() === 'PM' ? 12 : 0);
  const endMeridiem = match[6];
  const startMeridiem = match[3] ?? endMeridiem;
  return [
    [to24(Number(match[1]), startMeridiem), Number(match[2])],
    [to24(Number(match[4]), endMeridiem), Number(match[5])],
  ];
}

const pad = (value: number) => String(value).padStart(2, '0');
const calendarDate = (day: number) => `${YEAR}${pad(MONTH + 1)}${pad(day)}`;

// "Add to Google Calendar" link; timed when the time is listed, otherwise all-day
export function getGoogleCalendarLink(event: RccEvent) {
  const first = Math.min(...event.days);
  const last = Math.max(...event.days);
  const range = parseTimeRange(event.time);
  const dates = range
    ? `${calendarDate(first)}T${pad(range[0][0])}${pad(range[0][1])}00/${calendarDate(last)}T${pad(range[1][0])}${pad(range[1][1])}00`
    : `${calendarDate(first)}/${calendarDate(last + 1)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates,
    ctz: 'America/Los_Angeles',
    details: 'Responsible Computing Club event at San José State University.',
  });
  if (event.location !== 'Not listed') params.set('location', event.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default events;
