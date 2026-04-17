// component imports
import WhatIsRCC from './components/WhatIsRCC';
import OurMission from './components/OurMission';
import OurStory from './components/OurStory';

export default function About() {
  return (
    <div style={{ overflow: 'clip' }}>
      {/* What is RCC Section */}
      <WhatIsRCC />

      {/* Our Mission Section */}
      <OurMission />

      {/* Our Story */}
      <OurStory />
    </div>
  );
}
