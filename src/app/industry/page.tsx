'use client';
import Image from 'next/image';
import Link from 'next/link';
// import BackgroundGradient from '@/components/BackgroundGradient';
// import Heading from '@/components/Heading';
import styles from './industry.module.css';

export default function IndustryPage() {
  return (
    <div>
      <div className={styles.industryAndPastEventsContainer}>
        {/* Industry Section */}
        <section className={styles.sectionContainer}>
          {/* <BackgroundGradient color="purple" className="size-72 inline"></BackgroundGradient> */}
          {/* <Heading
            headingTag={'h1'}
            children={'Industry'}
            logoPath="/images/handshake-logo.svg"
            logoAlign="right"
            logoSize={7}
          /> */}
          <div>
            <h1 className={styles.heading}>Industry</h1>
            <div className={styles.industryTextAndImageContainer}>
              <p className={styles.industryText}>
                The Industry Committee actively partners with professionals and companies to bring you inspiring speaker
                events and vibrant networking opportunities—all focused on responsible computing in action.
                <br />
                <br className={styles.hiddenBR} />
                We&apos;re here to help you build the skills and connections you need to grow, thrive, and succeed!
                <br />
                <br />
                <b>
                  Interested in hosting an event with us? Reach out to us at{' '}
                  <span className={styles.indigoText}>rcc.sjsu@gmail.com</span> or fill out{' '}
                  <span className={styles.indigoText}>
                    <Link href="#interest-form" className={styles.interestFormLink}>
                      this interest form
                    </Link>
                  </span>{' '}
                  to get in contact!
                </b>
              </p>
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

        <hr className={styles.industryAndPastEventDivider} />

        {/* Past Events Section */}
        <section className={styles.sectionContainer}>
          {/* <BackgroundGradient color="purple" className="size-72 inline"></BackgroundGradient> */}
          {/* <Heading headingTag={'h2'} children={'Past Events'} /> */}
          <h2 className={`${styles.indigoText} ${styles.heading}`}>
            <b>Past Events</b>
          </h2>
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

        <hr className="my-4 md:my-8 xl:my-10"></hr>
      </div>

      {/* Interest Form Section */}
      <section id="interest-form" className={styles.interestFormSectionContainer}>
        {/* <Heading
          headingTag={'h2'}
          children={'Interest Form'}
          logoPath="/images/shapes-logo.svg"
          align="left"
          logoAlign="left"
          logoSize={7}
        /> */}
        <h2 className={`${styles.indigoText} ${styles.heading} ${styles.interestFormHeading}`}>Interest Form</h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfLu2YuHYDi6YdLcCEPCO2ue3o8FeCTnzrB7gadmeeSJ_0wVw/viewform?embedded=true"
          width="100%"
          height="548"
          className={styles.googleFormsBackground}
        >
          Loading…
        </iframe>
      </section>
    </div>
  );
}
