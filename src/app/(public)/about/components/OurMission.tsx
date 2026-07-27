// component imports
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/Heading';
import styles from '../ourmission.module.css';
import { UsersRound } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function OurMission() {
  return (
    <section className={styles.container}>
      <div className="bg-purple-100 rounded-full p-5">
        <Image src="/about/hand-holding-globe-icon.svg" alt="" width={75} height={75}></Image>
      </div>

      <Heading headingTag="h2"> Shaping a More Responsible and Inclusive Future</Heading>

      <div className="flex flex-col gap-2 md:gap-6 pt-0 pb-1 lg:pt-3 lg:pb-4">
        <p className={styles.description}>
          Our mission is to change the conversation around AI and emerging technologies, focusing on their social,
          ethical, and environmental impact rather than just the technical side.
        </p>
        <p className={styles.description}>
          In order to make RCC relevant to all majors (and minors) and to hone their collective strengths, we&apos;ve
          created dedicated teams focused on areas like workshops, consulting, marketing, web dev, and so much more!
        </p>
      </div>

      <Link
        href="/ambassadors"
        className={cn(
          buttonVariants({ variant: 'default', size: 'default' }),
          'group h-auto px-6 md:px-10 py-2 md:py-3 w-[90%] sm:w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
        )}
      >
        Meet Our Ambassadors
        <UsersRound size="1em" className="transition-[stroke-width] duration-200 ease-out group-hover:stroke-3" />
      </Link>
    </section>
  );
}
