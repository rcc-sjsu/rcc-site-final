// Fall 2026 events, from the "FY27 RCC Upcoming Events" sheet. Dates are YYYY-MM-DD; leave a field out when it isn't
// known yet (the site shows "TBA"). `imageURL` is only for real flyers; events without one get a generated date cover.

export type EventKind =
  | 'Meeting'
  | 'Social'
  | 'Workshop'
  | 'Talk'
  | 'Panel'
  | 'Networking'
  | 'Hackathon'
  | 'Tour'
  | 'Tabling';

type EventData = {
  id: string;
  title: string;
  kind: EventKind;
  team: string;
  start: string;
  end?: string;
  time?: string;
  location?: string;
  partners?: string;
  description?: string[];
  highlights?: string[];
  rsvpURL?: string;
  zoomURL?: string;
  tentative?: boolean;
  imageURL?: string;
};

const data: EventData[] = [
  {
    id: 'tabling-cs-club-fair',
    title: 'RCC Tabling: CS Club Fair',
    kind: 'Tabling',
    team: 'Membership Outreach',
    start: '2026-09-02',
    time: '2:00–5:00 PM',
    location: 'MQH 226/227',
    tentative: true,
  },
  {
    id: 'tabling-7th-street',
    title: 'RCC Tabling',
    kind: 'Tabling',
    team: 'Membership Outreach',
    start: '2026-09-03',
    time: '10:00 AM–2:00 PM',
    location: '7th Street',
  },
  {
    id: 'tabling-student-org-fair',
    title: 'RCC Tabling: Student Organization Fair',
    kind: 'Tabling',
    team: 'Membership Outreach',
    start: '2026-09-08',
    time: '10:00–11:45 AM',
    location: '7th Street',
  },
  {
    id: 'september-general-meeting',
    title: 'RCC General Meeting & FY27 Recruitment Info Session',
    kind: 'Meeting',
    team: 'E-Board',
    start: '2026-09-08',
    time: '5:00–6:00 PM',
    location: 'DHC',
    description: [
      "RCC's first general meeting of the year, where students learn what the club does, meet the team, and hear about the roles we're recruiting for across all teams.",
    ],
    rsvpURL: 'https://forms.gle/bwCfn7CvZrPGz5QX7',
    zoomURL: 'https://sjsu.zoom.us/j/87083504688?pwd=hCekgtuccIquopgx1ccoqIwmYgPasf.1',
  },
  {
    id: 'september-social',
    title: 'RCC Social',
    kind: 'Social',
    team: 'Membership Outreach',
    start: '2026-09-09',
    time: '5:00–6:00 PM',
    location: 'MLK 225',
    description: [
      'An RCC social featuring a Brooklyn Nine-Nine watch party, cyber ethics trivia, and data privacy discussions over snacks.',
    ],
    rsvpURL: 'https://forms.gle/J5vso54nn5ukpnwq6',
    zoomURL: 'https://sjsu.zoom.us/j/4104203104',
  },
  {
    id: 'resume-workshop',
    title: 'RCC Resume Workshop',
    kind: 'Workshop',
    team: 'Workshops',
    start: '2026-09-10',
    time: '5:00–6:00 PM',
    location: 'Clark Hall, 1st Floor',
    description: ['Learn how to build a resume with AI and how applicant tracking systems (ATS) work.'],
    rsvpURL: 'https://forms.gle/RNn61UqmPgEQxEMs9',
    zoomURL: 'https://sjsu.zoom.us/j/84107419730',
  },
  {
    id: 'tabling-engineering-club-fair',
    title: 'RCC Tabling: College of Engineering Club Fair',
    kind: 'Tabling',
    team: 'Membership Outreach',
    start: '2026-09-14',
    time: '12:00–2:00 PM',
    location: '7th Street',
  },
  {
    id: 'servicenow-tour',
    title: 'ServiceNow Event Tour',
    kind: 'Tour',
    team: 'E-Board',
    start: '2026-09-15',
    time: '3:00–5:00 PM',
    location: 'ServiceNow HQ',
    partners: 'ServiceNow',
  },
  {
    id: 'discord-game-night',
    title: 'Discord Game Night',
    kind: 'Social',
    team: 'E-Board',
    start: '2026-09-17',
    time: '7:00–8:00 PM',
    location: 'Discord (online)',
  },
  {
    id: 'digital-career-edge',
    title: 'Digital Career Edge Networking Event',
    kind: 'Networking',
    team: 'E-Board',
    start: '2026-09-21',
    time: '5:30–7:00 PM',
    location: 'Clark Hall Career Hub',
    partners: 'Career Center and other clubs',
    rsvpURL: 'https://docs.google.com/forms/d/e/1FAIpQLSc0dH80duGPaKObg3K6hBV1BoVPpNxXOc9L-B4T9Dm-k4PpBA/viewform',
  },
  {
    id: 'nets-industry-talk',
    title: 'NETS x RCC Industry Talk',
    kind: 'Talk',
    team: 'E-Board',
    start: '2026-09-25',
    time: '12:00–1:30 PM',
    location: 'SU 3B',
    partners: 'NETS',
  },
  {
    id: 'data-bias-workshop',
    title: 'Data Analysis & Bias Workshop',
    kind: 'Workshop',
    team: 'Workshops',
    start: '2026-09-30',
    time: '5:00–6:30 PM',
    location: 'DHC, MLK Library',
    partners: 'NSDC Club',
    description: [
      'A beginner-friendly data analysis workshop using Python tools such as Pandas and NumPy to explore datasets and spot potential bias.',
      "Through guided exercises you'll analyze datasets, identify patterns and disparities, and discuss how data quality and representation shape technology, and what responsible, equitable data-driven decisions look like.",
    ],
    rsvpURL: 'https://docs.google.com/forms/d/e/1FAIpQLSeGcyxiCG7ZEVPR_lo3wxKVKKvHom_wRVl0iwnQMrcBMe0tLg/viewform',
    zoomURL: 'https://sjsu.zoom.us/j/84265597361',
  },
  {
    id: 'october-general-meeting',
    title: 'RCC October General Meeting',
    kind: 'Meeting',
    team: 'E-Board',
    start: '2026-10-06',
  },
  {
    id: 'public-interest-technology',
    title: 'Public Interest Technology: Designing a Meaningful Career',
    kind: 'Workshop',
    team: 'E-Board',
    start: '2026-10-14',
    time: '1:00–3:00 PM',
    location: 'ISB 874, SJSU',
    partners: 'College of Humanities and the Arts, Career Center',
    description: [
      'What does it look like to build a career in technology that is both meaningful and sustainable? Join the College of Humanities and the Arts, the Career Center, and RCC for an interactive Public Interest Technology (PIT) program exploring how students can use technology and their careers to serve the public good.',
      'No prior knowledge of public interest technology is required. Come ready to explore, connect, and think differently about what your future career could look like!',
    ],
    highlights: [
      'Lunch and informal networking with faculty, staff, and students',
      'PIT-UN broadcast and discussion',
      'Interactive “Design Your Career” activity',
      'Careers that combine technology, community impact, and your personal interests',
    ],
    rsvpURL: 'https://docs.google.com/forms/d/e/1FAIpQLSentbjN7_23aQ_lvS3Wf5EnvmoMS3U3T7Z928WQrTKu3KdUAQ/viewform',
  },
  {
    id: 'open-source-ai',
    title: 'Open Source AI: Building Reliable AI Systems',
    kind: 'Talk',
    team: 'E-Board',
    start: '2026-10-19',
    time: '5:00–7:30 PM',
    location: 'Clark Hall 102 (Elevate Career Hub), SJSU',
    partners: 'Career Center, IBM',
    description: [
      "For developers and students interested in building reliable AI applications. Bring your laptop for hands-on time, or just listen in, network, and learn from IBM's experts.",
    ],
    highlights: [
      '5:00 PM · Networking',
      'Mellea: a Python library for interacting reliably with LLMs (Basel Shbita)',
      'AI Safety: building responsible, safe AI apps with TrustyAI (Muneeza Azmat)',
      'Bob: an agentic AI development partner (James Busche & team)',
      'Docling: getting your documents ready for gen AI (Ming Zhao, Eduardo Monich Fronza)',
      '7:00 PM · Networking',
    ],
    rsvpURL: 'https://luma.com/i3mb5jw6',
  },
  {
    id: 'sparthill-hacks',
    title: 'SpartHill Hacks 2026: AI for Sustainable Impact',
    kind: 'Hackathon',
    team: 'E-Board',
    start: '2026-10-23',
    end: '2026-10-24',
    time: '8:00 AM–5:00 PM',
    location: 'Spartan Complex (SPX)',
    partners: 'Career Center, Foothill College',
    description: [
      'Join SJSU × Foothill for a 30+ hour, cross-disciplinary hackathon where students from every major team up to build AI solutions that help the planet. No experience required, just curiosity, creativity, and a drive to make an impact.',
      'Open to all college students: coders, designers, storytellers, policy thinkers, and anyone excited about AI and sustainability. Free to attend.',
    ],
    highlights: [
      'Build projects across five sustainability impact tracks',
      'Collaborate with students across disciplines',
      'Learn from educators and industry partners',
      'Leave with portfolio-ready, real-world work',
    ],
    rsvpURL: 'https://docs.google.com/forms/d/e/1FAIpQLSdedLJKQasLvAPpdRpQzqng6gl7GHxl-nRemhwxUrZvNKkGMQ/viewform',
  },
  {
    id: 'spartan-fright-night',
    title: 'Spartan Fright Night',
    kind: 'Social',
    team: 'E-Board',
    start: '2026-10-26',
    time: '6:00–9:00 PM',
    location: '7th Street Plaza, Event Center, Student Wellness Center, and SRAC',
    partners: 'Student Involvement',
    description: [
      "Join RCC at Spartan Fright Night, SJSU's campus-wide Halloween celebration! Stop by our interactive Halloween-themed activity exploring AI, technology, and responsible computing.",
      'Enjoy free food, a haunted house, live performances, costume contests, prizes, and more across campus. No RSVP needed.',
    ],
  },
  {
    id: 'november-general-meeting',
    title: 'RCC November General Meeting + Friendsgiving',
    kind: 'Meeting',
    team: 'E-Board',
    start: '2026-11-03',
    time: '5:00–7:00 PM',
    location: 'CV2 MPR',
  },
  {
    id: 'careers-in-responsible-computing',
    title: 'Careers in Responsible Computing Panel',
    kind: 'Panel',
    team: 'Industry',
    start: '2026-11-10',
    time: '5:00–7:00 PM',
    location: 'Clark Hall Career Hub',
    description: [
      'An in-person panel on careers in responsible computing: learn how to break into the field, get your questions answered, and enjoy free pizza and networking.',
    ],
    rsvpURL: 'https://docs.google.com/forms/d/e/1FAIpQLSep5Kg9GxKiEMqJspnAXa3Q11pnVD0zHD6c2kGhVsJQFuZqNQ/viewform',
  },
  {
    id: 'city-of-san-jose-ai-panel',
    title: 'City of San José AI Panel',
    kind: 'Panel',
    team: 'E-Board',
    start: '2026-11-17',
    time: '12:00–2:00 PM',
    location: 'City of San José (venue TBA)',
    partners: 'City of San José',
  },
];

const parseDay = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// "October 14", "October 23–24", or "October 31–November 1"
function formatDateRange(start: Date, end: Date, month: 'long' | 'short') {
  const startText = start.toLocaleDateString('en-US', { month, day: 'numeric' });
  if (start.getTime() === end.getTime()) return startText;
  if (start.getMonth() === end.getMonth()) return `${startText}–${end.getDate()}`;
  return `${startText}–${end.toLocaleDateString('en-US', { month, day: 'numeric' })}`;
}

const events = data
  .map((event) => {
    const start = parseDay(event.start);
    const end = parseDay(event.end ?? event.start);
    return {
      ...event,
      // display dates, e.g. "October 23–24" and "Oct 23–24"
      date: formatDateRange(start, end, 'long'),
      shortDate: formatDateRange(start, end, 'short'),
    };
  })
  .sort((a, b) => a.start.localeCompare(b.start));

export type RccEvent = (typeof events)[number];

// the event's first day, at midnight
export function getEventStartDay(event: RccEvent) {
  return parseDay(event.start);
}

// the end of the event's last day
export function getEventEndDate(event: RccEvent) {
  const end = parseDay(event.end ?? event.start);
  end.setHours(23, 59, 59);
  return end;
}

// every day the event runs, at midnight
export function getEventDays(event: RccEvent) {
  const days: Date[] = [];
  for (let day = getEventStartDay(event); day <= getEventEndDate(event); day.setDate(day.getDate() + 1)) {
    days.push(new Date(day));
  }
  return days;
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
function parseTimeRange(time?: string): [[number, number], [number, number]] | null {
  const match = time?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
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
const calendarDate = (date: Date) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;

// "Add to Google Calendar" link; timed when the time is listed, otherwise all-day
export function getGoogleCalendarLink(event: RccEvent) {
  const first = getEventStartDay(event);
  const last = parseDay(event.end ?? event.start);
  const range = parseTimeRange(event.time);
  const dayAfterLast = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1);
  const dates = range
    ? `${calendarDate(first)}T${pad(range[0][0])}${pad(range[0][1])}00/${calendarDate(last)}T${pad(range[1][0])}${pad(range[1][1])}00`
    : `${calendarDate(first)}/${calendarDate(dayAfterLast)}`;
  const details = [
    event.description?.[0] ?? 'Responsible Computing Club event at San José State University.',
    event.rsvpURL && `RSVP: ${event.rsvpURL}`,
    event.zoomURL && `Zoom: ${event.zoomURL}`,
  ]
    .filter(Boolean)
    .join('\n\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates,
    ctz: 'America/Los_Angeles',
    details,
  });
  if (event.location) params.set('location', event.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default events;
