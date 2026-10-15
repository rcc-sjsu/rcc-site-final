// home page sections
import HeroWords from './(public)/home/components/HeroWords/HeroWords';
import ResourcesSection from './(public)/home/components/ResourcesSection';
import UpcomingEventsSection from './(public)/home/components/UpcomingEventsSection';
import ProjectsEventsSection from './(public)/home/components/ProjectsEventsSection';

// component imports
import CompaniesSection from '@/components/CompaniesSection/CompaniesSection';

// re-render hourly so past events drop out of the upcoming list
export const revalidate = 3600;

export default function Home() {
  return (
    <div style={{ overflow: 'clip' }}>
      <HeroWords />
      <UpcomingEventsSection />
      <ResourcesSection />
      <ProjectsEventsSection />

      {/* Companies Section */}
      <CompaniesSection />
    </div>
  );
}
