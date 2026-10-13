import PageHero from '@/components/PageHero';
import CoolQuote from '@/components/CoolQuote/CoolQuote';
import WhatIsRCC from './components/WhatIsRCC';
import OurStory from './components/OurStory';
import GetInvolved from './components/GetInvolved';
import WhatDoWeDo from './components/WhatDoWeDo';

export default function About() {
  return (
    <div style={{ overflow: 'clip' }}>
      <PageHero
        badge="About RCC"
        title="Technology that serves"
        accent="people first."
        description="The Responsible Computing Club at SJSU explores ethical design, sustainability, and accessibility in tech through workshops, speaker events, and social meetups."
        image="/about/who-are-we-tabling.jpeg"
      />

      <CoolQuote />
      <WhatIsRCC />
      <OurStory />
      <WhatDoWeDo />
      <GetInvolved />
    </div>
  );
}
