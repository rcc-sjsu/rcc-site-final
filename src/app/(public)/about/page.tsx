// component imports
import CoolQuote from '@/components/CoolQuote/CoolQuote';
import WhatIsRCC from './components/WhatIsRCC';
import OurMission from './components/OurMission';
import OurStory from './components/OurStory';
import OurWork from './components/OurWork';
import GetInvolved from './components/GetInvolved';
import WhatDoWeDo from './components/WhatDoWeDo';
import styles from './aboutpage.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      {/* Founder Quote Section */}
      <CoolQuote />

      {/* What is RCC Section */}
      <WhatIsRCC />

      {/* Our Mission Section */}
      <OurMission />

      {/* Our Story Section */}
      <OurStory />

      {/* Our Work Section */}
      <OurWork />

      {/* What Do We Do Section */}
      <WhatDoWeDo />

      {/* Get Involved Section */}
      <GetInvolved />
    </div>
  );
}
