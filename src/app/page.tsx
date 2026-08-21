// home page sections
import Hero from './(public)/home/components/HeroSection';
import About from './(public)/home/components/About';
import DataSection from './(public)/home/components/DataSection';
import ResourcesSection from './(public)/home/components/ResourcesSection';
import ProjectsEventsSection from './(public)/home/components/ProjectsEventsSection';

// css style imports
import socialMediaStyles from './(public)/home/socialmedia.module.css';

// component imports
import CompaniesSection from '@/components/CompaniesSection/CompaniesSection';
import Link from 'next/link';
import Heading from '@/components/Heading';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

// icon imports
import { FaLinkedin } from 'react-icons/fa';
import { SiInstagram, SiDiscord } from 'react-icons/si';
import { CiMail } from 'react-icons/ci';

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
      {/* Social Media Section — unchanged from before */}
      <section className={socialMediaStyles.container}>
        <Heading headingTag="h2">Social Media</Heading>
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 auto-cols-max gap-4 md:gap-7 2xl:gap-10 lg:w-full items-stretch">
          <li>
            <Link
              href="https://www.instagram.com/rcc.sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-1"
              className={cn(
                buttonVariants({ variant: 'social', size: 'lg' }),
                'group w-full transition-colors duration-200'
              )}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiInstagram
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">Follow Us</p>
                  <p id="social-media-button-1" className="text-lg md:text-xl">
                    Instagram
                  </p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="https://discord.com/invite/RGG9dMw4Rc"
              target="_blank"
              aria-labelledby="social-media-button-2"
              className={cn(
                buttonVariants({ variant: 'social', size: 'lg' }),
                'group w-full transition-colors duration-200'
              )}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiDiscord
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm lg:text-xs xl:text-sm hidden md:block">Join Our Community</p>
                  <p id="social-media-button-2" className="text-lg md:text-xl">
                    Discord
                  </p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="https://www.linkedin.com/company/rcc-sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-3"
              className={cn(
                buttonVariants({ variant: 'social', size: 'lg' }),
                'group w-full transition-colors duration-200'
              )}
            >
              <div className="flex gap-2 md:gap-5 lg:gap-4 place-items-center justify-start lg:justify-center">
                <FaLinkedin
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">See Our Work</p>
                  <p id="social-media-button-3" className="text-lg md:text-xl">
                    LinkedIn
                  </p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="mailto:rcc.sjsu@gmail.com"
              target="_blank"
              aria-labelledby="social-media-button-4"
              className={cn(
                buttonVariants({ variant: 'social', size: 'lg' }),
                'group w-full transition-colors duration-200'
              )}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <CiMail
                  role="presentation"
                  strokeWidth={1}
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">Reach Out to Us</p>
                  <p id="social-media-button-4" className="text-lg md:text-xl">
                    Email
                  </p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
