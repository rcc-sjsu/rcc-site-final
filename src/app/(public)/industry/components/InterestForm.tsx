import Image from 'next/image';
import Link from 'next/link';
// import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from './industry.module.css';

export default function InterestFormComponent() {
  return (
    <section id="interest-form" className={styles.interestFormSectionContainer}>
      <Heading
        headingTag={'h2'}
        children={'Interest Form'}
        logoPath="/images/shapes-logo.svg"
        align="left"
        logoAlign="left"
        logoSize={7}
      />
      {/* <h2 className={`${styles.indigoText} ${styles.heading} ${styles.interestFormHeading}`}>Interest Form</h2> */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeL3ALQOZpwYyBVS2AYsrB7mnLNtOyZ5bg2mzsVQETTz1lrdg/viewform?pli=1"
        width="100%"
        height="548"
        className={styles.googleFormsBackground}
      >
        Loading…
      </iframe>
    </section>
  );
}
