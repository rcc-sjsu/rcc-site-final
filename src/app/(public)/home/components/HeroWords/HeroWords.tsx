import events, { getEventEndDate } from '../../../events/data/Events';
import HeroStage from './HeroStage';

/**
 * Homepage hero: phrases from RCC's mission float over the pixel photo, breathe in and settle at their own depth as you
 * scroll, light up alongside the word-by-word mission reveal, fly past the camera, and hand off to an Ask RCC preview.
 * Server wrapper so the next event is picked at render time.
 */
export default function HeroWords() {
  const nextEvent = events.find((event) => getEventEndDate(event) >= new Date());

  return <HeroStage nextEvent={nextEvent ? { title: nextEvent.title, date: nextEvent.shortDate } : null} />;
}
