import Image from 'next/image';
import Link from 'next/link';
// import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../industry.module.css';

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
            src="/images/case-competition-ai-fraud.jpg"
            alt=""
            width={350}
            height={350}
            className={styles.pastEventImage}
          />
          <p className={styles.pastEventText}>
            <b>Case Competition: AI & Fraud</b>
            <br></br>
            September 19, 2025
          </p>
        </div>
        <div className={styles.pastEvent}>
          <Image
            src="/images/exploring-responsible-computing-careers.jpg"
            alt=""
            width={350}
            height={350}
            className={styles.pastEventImage}
          />
          <p className={styles.pastEventText}>
            <b>Exploring Responsible Computing Careers</b>
            <br></br>
            September 9, 2025
          </p>
        </div>
        <div className={styles.pastEvent}>
          <Image
            src="/images/picnic-social.jpg"
            alt=""
            width={350}
            height={350}
            className={styles.pastEventImage}
          />
          <p className={styles.pastEventText}>
            <b>Picnic Social</b>
            <br></br>
            August 2025
          </p>
        </div>
      </div>
      <div className={styles.pastEventsContainer}>
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
            April 23, 2025
          </p>
        </div>
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
            October 17, 2024
          </p>
        </div>
      </div>
    </section>
  );
}
