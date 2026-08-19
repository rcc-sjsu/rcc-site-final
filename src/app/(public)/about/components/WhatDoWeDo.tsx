import Heading from '@/components/Heading';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useId } from 'react';
import styles from '../whatdowedo.module.css';

export default function WhatDoWeDo() {
  const g1 = useId();
  const g2 = useId();
  const foo = 70;

  return (
    <section className={styles.container}>
      <div className={cn(styles.bgBox, styles.glow, 'bg-[#FBF4FF] place-self-stretch rounded-3xl')} />
      <div className={cn(styles.circle, styles.glow, 'rounded-full')} aria-hidden>
        <Image className="rounded-full" src="/about/about-us-wdwd-photocircle.png" alt="" fill sizes="250px" />
        <div className="bg-[white] absolute w-17/25 aspect-square rounded-full"></div>
        <Image src="/about/hand-holding-globe-icon.svg" alt="" fill className="p-[26%]" />
      </div>
      <div className={styles.content}>
        <Heading headingTag="h2">What Do We Do?</Heading>
        <p>
          Our mission is to change the conversation around AI and emerging technologies, focusing on their social,
          ethical, and environmental impact rather than just the technical side.
        </p>
        <p>
          In order to make RCC relevant to all majors (and minors) and to hone their collective strengths, we&apos;ve
          created dedicated teams focused on areas like workshops, consulting, marketing, web dev, and so much more!
        </p>
        <Link href="/ambassadors" className={cn(styles.ctaButton, 'relative overflow-hidden')}>
          <svg className="absolute w-full h-full bg-[var(--color-brand-pink)] inset-0">
            <defs>
              <linearGradient id={g1} y1="0%" y2="10%">
                <stop offset="0%" stopColor="var(--blurple)" />
                <stop offset="100%" stopColor="rgb(from var(--color-brand-pink) r g b / 0)" />
              </linearGradient>
              <linearGradient id={g2} y1="90%" y2="100%">
                <stop offset="0%" stopColor="var(--color-brand-pink)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--yellow)" />
              </linearGradient>
            </defs>
            <rect className={styles.g1} fill={`url(#${g1})`} x="-100%" y="0%" width="100%" height="100%" />
            <rect className={styles.g2} fill={`url(#${g2})`} x="100%" y="0%" width="100%" height="100%" />
          </svg>
          <div className="relative">Meet Our Ambassadors</div>
        </Link>
      </div>
    </section>
  );
}
