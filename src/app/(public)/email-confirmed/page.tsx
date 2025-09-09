'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './email-confirmed.module.css';

export default async function EmailConfirmed() {
  return (
    <div className={styles.emailConfirmedContainer}>
      <div className={styles.textAndImageContainer}>
        <Image
          src="/images/email-confirmed-graphic.svg"
          alt=""
          width={250}
          height={250}
          className={styles.confirmEmailImage}
        ></Image>
        <Heading headingTag={'h1'} children={'Congratulations!'} className={styles.heading} />
        <p>Your email has been confirmed. You can now log into your RCC account!</p>
      </div>
    </div>
  );
}
