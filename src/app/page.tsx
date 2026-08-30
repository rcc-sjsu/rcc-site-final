// home page sections
import Hero from './(public)/home/components/HeroSection';
import About from './(public)/home/components/About';
import DataSection from './(public)/home/components/DataSection';
import ResourcesSection from './(public)/home/components/ResourcesSection';
import ProjectsEventsSection from './(public)/home/components/ProjectsEventsSection';
import SocialsSection from './(public)/home/components/SocialsSection';

// component imports
import CompaniesSection from '@/components/CompaniesSection/CompaniesSection';

export default function Home() {
  return (
    <div style={{ overflow: 'clip' }}>
      <Hero />
      <About />
      <DataSection />
      <ResourcesSection />
      <ProjectsEventsSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Social Media Section */}
      <SocialsSection />
    </div>
  );
}
