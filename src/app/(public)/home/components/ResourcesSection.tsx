import Image from 'next/image';
import styles from '../resources-section.module.css';

const offers = [
  'Marketing',
  'Executive Board',
  'Workshops',
  'Case',
  'Consulting',
  'Industry',
  'Web Development',
  'Finance',
  'Growth Analytics',
  'Journalism',
  'Membership Outreach',
];

export default function ResourcesSection() {
  const scrollingOffers = [...offers, ...offers];

  return (
    <section className={styles.container} aria-labelledby="resources-heading">
      <div className={styles.content}>
        <div className={styles.textColumn}>
          <h2 id="resources-heading" className={styles.heading}>
            We Offer:
          </h2>

          <div className={styles.marquee} aria-label="RCC ambassador teams and programs">
            <div className={styles.marqueeTrack}>
              {scrollingOffers.map((offer, index) => (
                <p className={styles.offer} key={`${offer}-${index}`} aria-hidden={index >= offers.length}>
                  {offer}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.images}>
          <div className={styles.topImage}>
            <Image
              src="/figma/resources-top.png"
              alt="RCC attendees listening during a workshop"
              width={1920}
              height={1080}
              className={styles.topPhoto}
              sizes="(max-width: 1024px) 100vw, 746px"
            />
          </div>

          <div className={styles.bottomImages}>
            <div className={styles.laurenImage}>
              <Image
                src="/figma/resources-lauren-klein.png"
                alt="Lauren Klein speaking at an RCC event"
                width={480}
                height={270}
                className={styles.fillPhoto}
                sizes="(max-width: 640px) 100vw, 344px"
              />
            </div>
            <div className={styles.aiFraudImage}>
              <Image
                src="/figma/resources-ai-fraud.png"
                alt="Students participating in an AI and fraud case competition"
                width={4096}
                height={3072}
                className={styles.aiFraudPhoto}
                sizes="(max-width: 640px) 100vw, 362px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
