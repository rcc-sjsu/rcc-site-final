'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './check-email.module.css';
import { useRouter } from 'next/navigation';
import { checkEmailProps } from './type';

export default function CheckEmailPageComponent({ img, checkEmailTitle, checkEmailDescription }: checkEmailProps) {
  const router = useRouter();

  return (
    <div className={styles.checkEmailContainer}>
      <div className={styles.textAndImageContainer}>
        <Image src={img} alt="" width={250} height={250} className={styles.confirmEmailImage}></Image>
        <Heading headingTag={'h1'} children={checkEmailTitle} className={styles.heading} />
        <p>{checkEmailDescription}</p>
      </div>
    </div>
  );
}
