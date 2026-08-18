import Heading from '@/components/Heading';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from '../whatdowedo.module.css';

export default function WhatDoWeDo() {
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
        <Link href="/ambassadors" className={cn(styles.smolbutton)}>
          Meet Our Ambassadors
        </Link>
      </div>
    </section>
  );
}
