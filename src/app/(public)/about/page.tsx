// component imports
import WhatIsRCC from './components/WhatIsRCC';
import OurMission from './components/OurMission';
import OurStory from './components/OurStory';
import FounderQuote from './components/FounderQuote';
import GetInvolved from './components/GetInvolved';

export default function About() {
  return (
    <div style={{ overflow: 'clip' }}>
      {/* What is RCC Section */}
      <WhatIsRCC />

      {/* Our Mission Section */}
      <OurMission />

      {/* Our Story Section */}
      <OurStory />

      {/* Founder Quote Section */}
      <FounderQuote />

      {/* Get Involved Section */}
      <GetInvolved />
    </div>
  );
}
