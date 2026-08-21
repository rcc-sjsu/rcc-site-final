import Image from 'next/image';
import Heading from '@/components/Heading';
import styles from '../whatisrcc.module.css';

export default function WhatIsRCC() {
  return (
    <section className={styles.container}>
      <div className={styles.allText}>
        <Heading headingTag="h1" align="left">
          Who Are We?
        </Heading>
        <div className="flex flex-col gap-2 md:gap-3 xl:gap-5">
          <p className={styles.description}>
            The Responsible Computing Club, known as RCC, is all about exploring{' '}
            <strong className={styles.ethical}>ethical design</strong>,{' '}
            <strong className={styles.sustainability}>sustainability</strong>, and{' '}
            <strong className={styles.accessibility}>accessibility</strong> in tech through engaging workshops, speaker
            events, and social meetups.
          </p>
          <p className={styles.description}>
            We believe everyone, whether you&apos;re in arts, humanities, or sciences, plays a key role in shaping tech
            that truly serves people first!
          </p>
        </div>
      </div>

      <div className={styles.imageFrame}>
        <Image
          src="/about/who-are-we-tabling.jpeg"
          alt="RCC tabling board with notes and stickers"
          width={350}
          height={350}
          className={styles.collageImage}
        />
      </div>
    </section>
  );
}
