// component imports
import Image from 'next/image';
import Link from 'next/link';
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../whatisrcc.module.css';
import { MoveRightIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function WhatIsRCC() {
  return (
    <section className={styles.container}>
      <div className={styles.allText}>
        <Heading headingTag="h1"> What is the Responsible Computing Club? </Heading>
        <div className="flex flex-col gap-2 md:gap-3 xl:gap-5">
          <p className={styles.description}>
            The Responsible Computing Club, known as RCC, is all about exploring ethical design, sustainability, and
            accessibility in tech through engaging workshops, speaker events, and social meetups.
          </p>
          <p className={styles.description}>
            We believe everyone, whether you&apos;re in arts, humanities, or sciences, plays a key role in shaping tech
            that truly serves people first!
          </p>
        </div>
        {/* Call to Action (CTA) buttons */}
        <div className="flex flex-col md:flex-row gap-7 md:gap-4 w-[80%] lg:w-auto">
          <Link
            href="#get-involved"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'group h-auto gap-3 px-6 md:px-10 py-2.5 w-auto md:w-1/2 lg:w-auto text-lg md:text-xl transition-colors duration-200'
            )}
          >
            Get Involved
            <MoveRightIcon
              size="1.5em"
              className="transition-[stroke-width] duration-200 ease-out group-hover:stroke-3"
            ></MoveRightIcon>
          </Link>
          <Link
            href="#our-work-about-page"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'h-auto px-6 md:px-10 lg:px-15 py-2.5 w-auto md:w-1/2 lg:w-auto text-lg md:text-xl transition-colors duration-200'
            )}
          >
            See Our Work
          </Link>
        </div>
      </div>

      <div>
        <BackgroundGradient className={styles.gradient} color="purple" />
        <Image
          src="/about/collection-of-rcc-images.png"
          alt="Photo collage of people participating in various RCC events"
          width={400}
          height={400}
          className={styles.collageImage}
        ></Image>
      </div>
    </section>
  );
}
