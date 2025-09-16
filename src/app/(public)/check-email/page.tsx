'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './check-email.module.css';

export default async function CheckEmail() {
  return (
    <div className={styles.checkEmailContainer}>
      <div className={styles.textAndImageContainer}>
        <Image
          src="/images/confirm-email-graphic.svg"
          alt=""
          width={250}
          height={250}
          className={styles.confirmEmailImage}
        ></Image>
        <Heading headingTag={'h1'} children={'Confirm Your Email'} className={styles.heading} />
        <p>Thanks for signing up! Check your email to confirm your email address.</p>
      </div>
    </div>
  );
}
