import Image from 'next/image';
import Link from 'next/link';
// import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from './industry.module.css';

export default function IndustryComponent() {
  return (
    <section className={styles.sectionContainer}>
      {/* <BackgroundGradient color="purple" className="size-72 inline"></BackgroundGradient> */}
      <Heading
        headingTag={'h1'}
        children={'Industry'}
        logoPath="/images/handshake-logo.svg"
        logoAlign="right"
        logoSize={7}
      />
      <div>
        {/* <h1 className={styles.heading}>Industry</h1> */}
        <div className={styles.industryTextAndImageContainer}>
          <div>
            <p className={styles.industryText}>
              The Industry Committee actively partners with professionals and companies to bring you inspiring speaker
              events and vibrant networking opportunities—all focused on responsible computing in action.
            </p>
            <p className={`${styles.industryText} ${styles.middleIndustryText}`}>
              We&apos;re here to help you build the skills and connections you need to grow, thrive, and succeed!
            </p>
            <p className={styles.industryText}>
              <b>
                Interested in hosting an event with us? Reach out to us at{' '}
                <span className={styles.indigoText}>
                  <Link href="mailto:rcc.sjsu@gmail.com" className={styles.interestFormLink}>
                    rcc.sjsu@gmail.com
                  </Link>
                </span>{' '}
                or fill out{' '}
                <span className={styles.indigoText}>
                  <Link href="#interest-form" className={styles.interestFormLink}>
                    this interest form
                  </Link>
                </span>{' '}
                to get in contact!
              </b>
            </p>
          </div>

          <Image
            src="/images/industry-lauren-klein.svg"
            alt=""
            width={250}
            height={250}
            className={styles.industryImage}
          />
        </div>
      </div>
    </section>
  );
}
