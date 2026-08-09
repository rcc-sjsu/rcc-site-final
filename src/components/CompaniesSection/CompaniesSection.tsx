import { Marquee, type Partner } from '../Marquee';
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
    <div className={styles.container} data-node-id="351:1483" data-name="Companies Section">
      <div className={styles.heading} data-node-id="I351:1483;351:1434">
        <h2>Who We Work With</h2>
      </div>

      <div className={styles.carouselWrapper}>
        <Marquee
          partners={marqueeCompanies}
          duration={30}
          pxPerItem={120}
          minWidth={320}
          maxWidth={1440}
          reverse
        />
        <Marquee
          partners={marqueeCompanies}
          duration={30}
          pxPerItem={120}
          minWidth={320}
          maxWidth={1440}
        />
      </div>
    </div>
  );
}
