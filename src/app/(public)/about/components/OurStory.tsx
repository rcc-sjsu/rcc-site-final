// component imports
import Image from 'next/image';
import Link from 'next/link';
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../ourstory.module.css';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function OurStory() {
  return (
    <section className={styles.container}>
      <div>
        <BackgroundGradient className={styles.gradient} color="purple" />
        <Image
          src="/about/rcc-poster-board.png"
          alt=""
          width={400}
          height={400}
          className={styles.collageImage}
        ></Image>
      </div>
      <div className={styles.allText}>
        <Heading headingTag="h2" align="left">
          Our Story
        </Heading>
        <p className={styles.description}>
          After participating in{' '}
          <Link
            href="https://www.mozillafoundation.org/en/blog/responsible-computing-challenge-holds-trustworthy-ai-and-career-development-events-with-student-groups-at-san-jose-state-university/"
            target="_blank"
            className="text-[1rem] sm:text-[1.25rem] xl:text-[24px] underline underline-offset-5 decoration-brand-indigo hover:text-brand-dark-violet hover:decoration-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-lavender focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold focus:decoration-brand-dark-purple active:outline-offset-0 active:outline-brand-lavender active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold active:decoration-brand-dark-purple"
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
            'h-auto px-6 md:px-5 py-2 md:py-3 w-auto md:w-[50%] lg:w-[65%] xl:w-sm text-lg md:text-xl transition-colors duration-200'
          )}
        >
          Learn More About RCC’s Origins
        </Link>
      </div>
    </section>
  );
}
