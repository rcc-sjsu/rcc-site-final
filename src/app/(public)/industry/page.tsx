'use client';
// import BackgroundGradient from '@/components/BackgroundGradient';
import styles from './industry.module.css';
import IndustryComponent from './IndustryComponent';
import PastEventsComponent from './PastEvents';
import InterestFormComponent from './InterestForm';

export default function IndustryPage() {
  return (
    <div>
      <div className={styles.industryAndPastEventsContainer}>
        <IndustryComponent />
        <hr className={styles.industryAndPastEventDivider} aria-hidden="true" />
        <PastEventsComponent />
        <hr className={styles.pastEventsAndInterestFormDivider} aria-hidden="true"></hr>
      </div>
      <InterestFormComponent />
    </div>
  );
}
