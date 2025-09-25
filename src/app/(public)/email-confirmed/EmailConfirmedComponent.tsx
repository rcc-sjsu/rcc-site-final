'use client';
import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from './email-confirmed.module.css';
import { useRouter } from 'next/navigation';
import { emailConfirmedProps } from './type';

export default function EmailConfirmedPageComponent({
  img,
  emailConfirmedTitle,
  emailConfirmedDescription,
}: emailConfirmedProps) {
  const router = useRouter();
  return (
    <div className={styles.emailConfirmedContainer}>
      <div className={styles.textAndImageContainer}>
        <Image src={img} alt="" width={250} height={250} className={styles.confirmEmailImage}></Image>
        <Heading headingTag={'h1'} children={emailConfirmedTitle} className={styles.heading} />
        <p>{emailConfirmedDescription}</p>
      </div>
    </div>
  );
}
