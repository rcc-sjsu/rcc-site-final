'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './404-error.module.css';
import { useRouter } from 'next/navigation';

export default function FourZeroFourErrorPage() {
  const router = useRouter();

  return (
    <div className={styles.fourZeroFourErrorContainer}>
      <div className={styles.textAndImageContainer}>
        <Image
          src="/images/magnifying-glass-with-question-mark-graphic.svg"
          alt=""
          width={250}
          height={250}
          className={styles.confirmEmailImage}
        ></Image>
        <Heading headingTag={'h1'} children={'404 Page Not Found'} className={styles.heading} />
        <p>Sorry, the page you are looking for cannot be found.</p>
        <p>The address may have been typed incorrectly, or it may be a broken link.</p>
        <button className={styles.backToHomeButton} onClick={() => router.push(`/`)}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
