// component imports
import CoolQuote from '@/components/CoolQuote/CoolQuote';
import WhatIsRCC from './components/WhatIsRCC';
import OurStory from './components/OurStory';
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

      {/* Our Story Section */}
      <OurStory />

      {/* What Do We Do Section */}
      <WhatDoWeDo />

      {/* Get Involved Section */}
      <GetInvolved />
    </div>
  );
}
