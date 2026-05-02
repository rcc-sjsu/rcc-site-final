import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import PastEvents from './PastEvents';
import PastProjects from './PastProjects';
import styles from '../ourwork.module.css';

export default function OurWork() {
  return (
    <section id="our-work-about-page" className={styles.container}>
      <Heading headingTag="h2">Our Work</Heading>

      <p className={styles.description}>
        Curious about what RCC has actually done? Explore some of our exciting previous events and projects!
      </p>
      <PastEvents />
      <BackgroundGradient className={styles.gradient} color="purple" />
      <PastProjects />
      <BackgroundGradient className={styles.gradient2} color="purple" />
    </section>
  );
}
