'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './error.module.css';
import { useRouter } from 'next/navigation';
import { errorProps } from './type';

export default function ErrorPageComponent({ img, errorTitle, errorDescription }: errorProps) {
  const router = useRouter();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.textAndImageContainer}>
        <Image src={img} alt="" width={250} height={250} className={styles.confirmEmailImage}></Image>
        <Heading headingTag={'h1'} children={errorTitle} className={styles.heading} />
        <p>{errorDescription}</p>
        <button className={styles.backToHomeButton} onClick={() => router.push(`/`)}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
