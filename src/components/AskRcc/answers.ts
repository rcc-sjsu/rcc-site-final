import events, {
  describeDaysUntil,
  daysUntilEvent,
  getEventStartDay,
  isEventPast,
} from '@/app/(public)/events/data/Events';

export type AskLink = { label: string; href: string };
export type AskAnswer = { text: string[]; links?: AskLink[] };

export const SUGGESTIONS = [
  'When is the next RCC event?',
  'How do I join an ambassador team?',
  'What does RCC actually do?',
];

// questions the collapsed box types out as its placeholder
export const PLACEHOLDER_QUESTIONS = [
  'When is the next RCC event?',
  'How do I become an ambassador?',
  'Do I need to be a CS major to join?',
  'How can my company partner with RCC?',
];

const TEAMS =
  'Executive Board, Workshops, Case, Consulting, Industry, Web Development, Marketing, Finance, Growth Analytics, Journalism, and Membership Outreach';

const matches = (question: string, words: string[]) => words.some((word) => question.includes(word));

function nextEventAnswer(): AskAnswer {
  const now = new Date();
  const upcoming = events
    .filter((event) => !isEventPast(event, now))
    .sort((a, b) => getEventStartDay(a).getTime() - getEventStartDay(b).getTime());
  const [next, ...rest] = upcoming;
  if (!next) {
    return {
      text: [
        "There aren't any upcoming events on the calendar right now. Follow us on Instagram to hear about the next one.",
      ],
      links: [{ label: 'Instagram', href: 'https://www.instagram.com/rcc.sjsu/' }],
    };
  }
  const when = describeDaysUntil(daysUntilEvent(next, now)).toLowerCase();
  const details = [next.time, next.location].filter((part) => part !== 'Not listed').join(' at ');
  return {
    text: [
      `The next event is ${next.title} on ${next.date} (${when})${details ? `, ${details}` : ''}.`,
      rest.length > 0
        ? `After that: ${rest
            .slice(0, 2)
            .map((event) => `${event.title} (${event.date})`)
            .join(' and ')}.`
        : '',
    ].filter(Boolean),
    links: [{ label: 'See all events', href: '/events' }],
  };
}

/**
 * Answers common questions from what the site already knows (events, teams, contact info). This stands in for the
 * future AI backend; anything it can't match gets a friendly pointer to the right page.
 */
export function answerQuestion(rawQuestion: string): AskAnswer {
  const question = rawQuestion.toLowerCase();

  if (matches(question, ['event', 'meeting', 'hackathon', 'workshop', 'when', 'calendar', 'next'])) {
    return nextEventAnswer();
  }
  if (matches(question, ['ambassador', 'team', 'committee'])) {
    return {
      text: [
        `RCC's Mozilla Student Ambassadors work on teams including ${TEAMS}.`,
        'To get involved, sign up as a member and reach out to the team. We share openings in our Discord.',
      ],
      links: [
        { label: 'Meet the ambassadors', href: '/ambassadors' },
        { label: 'Get involved', href: '/about#get-involved' },
      ],
    };
  }
  if (matches(question, ['join', 'member', 'sign up', 'signup', 'major', 'cs ', 'non-tech', 'free'])) {
    return {
      text: [
        "Anyone can join, whether you're in arts, humanities, or sciences. Membership is free!",
        'Sign up through the Students card on the About page, then hop into our Discord to meet everyone.',
      ],
      links: [
        { label: 'Join RCC', href: '/about#get-involved' },
        { label: 'Discord', href: 'https://discord.com/invite/RGG9dMw4Rc' },
      ],
    };
  }
  if (matches(question, ['company', 'partner', 'sponsor', 'industry', 'collaborat'])) {
    return {
      text: [
        'We love working with industry partners on events, case competitions, and projects.',
        "Send us a note through the contact form and we'll get back to you.",
      ],
      links: [{ label: 'Contact us', href: '/contact' }],
    };
  }
  if (matches(question, ['contact', 'email', 'reach', 'instagram', 'discord', 'linkedin'])) {
    return {
      text: ['You can email us at rcc.sjsu@gmail.com, or find us on Discord, Instagram, and LinkedIn.'],
      links: [
        { label: 'Contact form', href: '/contact' },
        { label: 'Email', href: 'mailto:rcc.sjsu@gmail.com' },
      ],
    };
  }
  if (matches(question, ['what', 'who', 'rcc', 'responsible', 'mission', 'about', 'do'])) {
    return {
      text: [
        'The Responsible Computing Club at SJSU explores ethical design, sustainability, and accessibility in tech through workshops, speaker events, case competitions, and projects.',
        'Our mission is to change the conversation around AI and emerging tech, focusing on its social, ethical, and environmental impact.',
      ],
      links: [{ label: 'About RCC', href: '/about' }],
    };
  }
  return {
    text: [
      "I can't answer that one yet. Full AI answers are coming soon!",
      'In the meantime, the RCC team is happy to help directly.',
    ],
    links: [{ label: 'Contact us', href: '/contact' }],
  };
}
