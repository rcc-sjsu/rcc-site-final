'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './auth-error.module.css';
import { useRouter } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();

  return (
    <div className={styles.authErrorContainer}>
      <div className={styles.textAndImageContainer}>
        <Image
          src="/images/alert-symbol.svg"
          alt=""
          width={250}
          height={250}
          className={styles.confirmEmailImage}
        ></Image>
        <Heading headingTag={'h1'} children={'Authentication Error'} className={styles.heading} />
        <p>There was a problem when trying to authenticate. Please try again later.</p>
        <button className={styles.backToHomeButton} onClick={() => router.push(`/`)}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
