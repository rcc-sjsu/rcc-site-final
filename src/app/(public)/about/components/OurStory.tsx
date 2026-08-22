// component imports
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/Heading';
import styles from '../ourstory.module.css';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function OurStory() {
  return (
    <section className={styles.container}>
      <div className={styles.imageFrame}>
        <Image
          src="/about/where-did-we-start-rcc-comp.png"
          alt="Students gathered around laptops at an RCC event"
          width={350}
          height={350}
          className={styles.collageImage}
        />
      </div>
      <div className={styles.allText}>
        <Heading headingTag="h2" customStyle={{ justifyContent: 'flex-end', textAlign: 'right' }}>
          Where Did We Start?
        </Heading>
        <p className={styles.description}>
          After participating in{' '}
          <Link
            href="https://www.mozillafoundation.org/en/blog/responsible-computing-challenge-holds-trustworthy-ai-and-career-development-events-with-student-groups-at-san-jose-state-university/"
            target="_blank"
          >
            Mozilla’s Responsible Computing Challenge
          </Link>
          , our club’s founder was inspired to provide a space for San Jose State University students to explore
          technologies’ ethical implications on society.
        </p>

        <Link
          href="https://www.mozillafoundation.org/en/blog/announcing-the-responsible-computing-club-at-san-jos%C3%A9-state-university/"
          target="_blank"
          className={cn(
            buttonVariants({ variant: 'default', size: 'default' }),
            'h-auto self-end rounded-[25px] px-6 md:px-8 py-2 text-base md:text-lg transition-colors duration-200'
          )}
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
