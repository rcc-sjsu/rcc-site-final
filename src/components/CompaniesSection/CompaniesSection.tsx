import { Marquee, type Partner } from '../Marquee';
import SectionHeading from '../SectionHeading';
import styles from './CompaniesSection.module.css';

const companyIconsPath = '/home_images/new_company_icons';

const companies: Partner[] = [
  {
    name: 'Credo AI',
    src: `${companyIconsPath}/credo_ai.svg`,
    width: 174,
    height: 30,
  },
  {
    name: 'EPA',
    src: `${companyIconsPath}/EPA.svg`,
    width: 99,
    height: 30,
  },
  {
    name: 'Creative Destination',
    src: `${companyIconsPath}/creative_destination.svg`,
    width: 43,
    height: 50,
  },
  {
    name: 'OpenGuard',
    src: `${companyIconsPath}/openguard.svg`,
    width: 185,
    height: 24,
  },
];

const marqueeCompanies: Partner[] = [...companies, ...companies, ...companies];

export default function CompaniesSection() {
  return (
    <section className={styles.container} aria-labelledby="partners-heading" data-name="Companies Section">
      <SectionHeading
        id="partners-heading"
        eyebrow="Our partners"
        title="Who we work with"
        align="center"
        className="mx-auto mb-12 max-w-7xl px-6 sm:px-10"
      />

      <div className={styles.carouselWrapper}>
        <Marquee partners={marqueeCompanies} duration={30} pxPerItem={120} minWidth={320} maxWidth={1440} reverse />
        <Marquee partners={marqueeCompanies} duration={30} pxPerItem={120} minWidth={320} maxWidth={1440} />
      </div>
    </section>
  );
}
