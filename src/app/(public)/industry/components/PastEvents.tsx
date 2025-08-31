import Image from 'next/image';
import Link from 'next/link';
// import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from './industry.module.css';

export default function PastEventsComponent() {
  return (
    <section className={styles.sectionContainer}>
      {/* <BackgroundGradient color="purple" className="size-72 inline"></BackgroundGradient> */}
      <Heading headingTag={'h2'} children={'Past Events'} />
      {/* <h2 className={`${styles.indigoText} ${styles.heading}`}>
            <b>Past Events</b>
          </h2> */}
      <div className={styles.pastEventsContainer}>
        <div className={styles.pastEvent}>
          <Image
            src="/images/women-in-tech-panel-katherine-d-harris.svg"
            alt=""
            width={350}
            height={350}
            className={`${styles.indigoText} ${styles.pastEventImage}`}
          />
          <p className={styles.pastEventText}>
            <b>Women In Tech Panel</b>
            <br></br>
            April 16, 2025
          </p>
        </div>
        <div className={styles.pastEvent}>
          <Image
            src="/images/exploring-responsible-computing-paths-panelists.svg"
            alt=""
            width={350}
            height={350}
            className={styles.pastEventImage}
          />
          <p className={styles.pastEventText}>
            <b>Exploring Responsible Computing Paths</b>
            <br></br>
            April 23rd, 2025
          </p>
        </div>

        <div className={styles.thirdPastEvent}>
          <Image
            src="/images/data-feminism-with-lauren-klein.svg"
            alt=""
            width={350}
            height={350}
            className={`${styles.pastEventImage} ${styles.dataFeminismPastEventImage}`}
          />
          <p className={styles.pastEventText}>
            <b>Data Feminism with Lauren Klein</b>
            <br></br>
            October 17th, 2025
          </p>
        </div>
      </div>
    </section>
  );
}
