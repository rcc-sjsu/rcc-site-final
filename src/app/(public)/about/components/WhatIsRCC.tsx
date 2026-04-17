import Image from 'next/image';
import Link from 'next/link';
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../whatisrcc.module.css';
import { MoveRightIcon } from 'lucide-react';

export default function WhatIsRCC() {
  return (
    <section className={styles.container}>
      <div className={styles.allText}>
        <Heading headingTag="h1"> What is the Responsible Computing Club? </Heading>
        <p className={styles.description}>
          The Responsible Computing Club, known as RCC, is all about exploring ethical design, sustainability, and
          accessibility in tech through engaging workshops, speaker events, and social meetups.
        </p>
        <p className={styles.description}>
          We believe everyone, whether you're in arts, humanities, or sciences, plays a key role in shaping tech that
          truly serves people first!
        </p>
        <Link
          href="/events"
          className="flex gap-3 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 w-auto md:w-xs lg:w-[50%] xl:w-[40%] text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
        >
          See Our Work
          <MoveRightIcon size="1.5em"></MoveRightIcon>
        </Link>
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
