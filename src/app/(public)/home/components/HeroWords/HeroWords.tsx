import events, { getEventEndDate } from '../../../events/data/Events';
import HeroStage from './HeroStage';

/**
 * Homepage hero: five words from RCC's mission float over the pixel photo; as you scroll they glide into their places in
 * the mission sentence, which then fades in around them. Server wrapper so the next event is picked at render time.
 */
export default function HeroWords() {
  const nextEvent = events.find((event) => getEventEndDate(event) >= new Date());

  return <HeroStage nextEvent={nextEvent ? { title: nextEvent.title, date: nextEvent.shortDate } : null} />;
}
