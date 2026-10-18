import events, { getEventEndDate } from '../../../events/data/Events';
import HeroStage from './HeroStage';

/**
 * Homepage hero: headline, CTAs and stats over the pixel photo. Server wrapper so the next event is picked at
 * render time.
 */
export default function HeroWords() {
  const nextEvent = events.find((event) => getEventEndDate(event) >= new Date());

  return <HeroStage nextEvent={nextEvent ? { title: nextEvent.title, date: nextEvent.shortDate } : null} />;
}
