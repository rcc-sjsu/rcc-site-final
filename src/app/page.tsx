// css style imports
import aboutStyles from './(public)/home/about.module.css';
import industryStyles from './(public)/home/industrypartners.module.css';
import socialMediaStyles from './(public)/home/socialmedia.module.css';
import recentEventsStyles from './(public)/home/recentevents.module.css';
import recentProjectStyles from './(public)/home/recentprojects.module.css';

// component imports
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Marquee, type Partner } from '@/components/Marquee/index';

// utilities
import { cn } from '@/lib/utils';

/* array of partner names */
const industryPartners: Partner[] = [
  { name: 'Credo AI', src: '/home_images/credo_AI_logo.png', width: 190, height: 190 },
  { name: 'EPA/ESA', src: '/home_images/EPA_ESA_logo.png', width: 120, height: 120 },
  { name: 'The Creative Destination', src: '/home_images/the_creative_destination_logo.png', width: 110, height: 120 },
];

// icon imports
import { MoveRightIcon } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { SiInstagram, SiDiscord } from 'react-icons/si';
import { CiMail } from 'react-icons/ci';

export default function Home() {
  return (
    <div style={{ overflow: 'clip' }}>
      {/* About Section */}
      <section className={aboutStyles.container}>
        <Heading headingTag="h1"> Responsible Computing Club </Heading>
        <BackgroundGradient className={aboutStyles.gradient} color="purple" />

        <p className={aboutStyles.description}>
          The Responsible Computing Club (RCC) at SJSU empowers students to shape the future of tech. We unite students
          to explore the ethics of tech through hands-on, cross-disciplinary projects.
        </p>

        {/* Call to Action (CTA) buttons */}
        <div className="flex flex-col items-center justify-center md:flex-row gap-7 md:gap-4 w-[80%] lg:w-auto">
          <Link
            href="/about#get-involved"
            className={cn(
              buttonVariants({ variant: 'default', size: 'xlg' }),
              'group w-[75%] md:w-auto text-xl md:text-2xl px-8 md:px-12 py-8 transition-colors duration-200'
            )}
          >
            Get Involved
            <MoveRightIcon size="1.5em" className="transition-[stroke-width] duration-200 ease-out group-hover:stroke-3" />
          </Link>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'xlg' }),
              'w-[75%] md:w-auto text-xl md:text-2xl px-8 md:px-12 py-8 transition-colors duration-200'
            )}
          >
            Get to Know Us
          </Link>
        </div>

        {/* Data Analytics (aka stat cards)*/}
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-cols-max gap-9 md:gap-10 xl:gap-5 place-items-center justify-between w-full md:w-[75%] xl:w-full h-auto md:h-full lg:h-auto mt-10 sm:mt-5 md:mt-7 xl:mt-10 text-brand-indigo">
          <li className="relative" style={{ '--pop-distance': '4px' } as React.CSSProperties}>
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--br rounded-2xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <div className="pop-hover pop-hover--br h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-7 xl:px-10 py-3">
              <p className="text-xl md:text-2xl">364</p>
              <p className="text-xl md:text-2xl">Total Members</p>
            </div>
          </li>
          <li className="relative" style={{ '--pop-distance': '4px' } as React.CSSProperties}>
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--br rounded-2xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <div className="pop-hover pop-hover--br h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-7 xl:px-10 py-3">
              <p className="text-xl md:text-2xl">66</p>
              <p className="text-xl md:text-2xl">Active Members</p>
            </div>
          </li>
          <li className="relative" style={{ '--pop-distance': '4px' } as React.CSSProperties}>
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--br rounded-2xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <div className="pop-hover pop-hover--br h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-7 xl:px-10 py-3">
              <p className="text-xl md:text-2xl">18%</p>
              <p className="text-xl md:text-2xl">Non-Tech Majors</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Industry Partners Section */}
      <section className={industryStyles.container}>
        <Heading headingTag="h2">Industry Partners</Heading>
        <BackgroundGradient className={industryStyles.gradient} color="purple" />
        <Marquee partners={industryPartners} />
      </section>

      {/* Recent Events section */}
      <section className={recentEventsStyles.container}>
        <Heading headingTag="h2"> Recent Events </Heading>
        <BackgroundGradient className={recentEventsStyles.gradient} color="purple" />
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
          {/* End of the Year Banquet — dark-violet shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-dark-violet)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/about/pastProjects/rcc-logo.png" alt="" width={150} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">
                    End of the Year Banquet
                  </h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Join us for a night of food, awards, activities, and great company as we celebrate everything we've
                    accomplished this year and wrap up the semester together.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Game Development Workshop — indigo shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/about/pastProjects/rcc-logo.png" alt="" width={150} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">
                    Game Development Workshop
                  </h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Learn the fundamentals of game development in an interactive workshop with GoDot Engine. Enjoy some
                    free food and a laid-back activity to help unwind before finals!
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Amazon Youth Tech — dark-violet shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-dark-violet)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/about/pastProjects/rcc-logo.png" alt="" width={150} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">Amazon Youth Tech</h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Join us for Amazon Youth Tech, an interactive workshop where you'll dive into AI/ML, Cloud
                    Fundamentals, & Agentic AI on AWS — plus get the chance to connect and network with industry
                    professionals!
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Link
          href="/events"
          className={cn(
            buttonVariants({ variant: 'default', size: 'default' }),
            'h-auto px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
          )}
        >
          See More Events
        </Link>
      </section>

      {/* Recent Projects Section */}
      <section className={recentProjectStyles.container}>
        <Heading headingTag="h2"> Recent Projects </Heading>
        <BackgroundGradient className={recentProjectStyles.gradient} color="purple" />

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
          {/* EPA ESA Website — indigo shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/home_images/EPA_ESA_logo.png" alt="" width={150} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">EPA ESA Website</h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Developing an application that simplifies pesticide application data for pesticide applicators and
                    farmers.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* SPARTANS OCLS — dark-violet shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-dark-violet)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/home_images/SPARTANS_OCLS.png" alt="" width={150} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">SPARTANS OCLS</h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Building a structured virtual community, improving user experience, creating newsletters, and
                    supporting engagement for neurodiverse students.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Creative Destination — indigo shadow, bottom-left */}
          <div className="relative self-start">
            <div
              aria-hidden="true"
              className="pop-shadow pop-shadow--bl rounded-xl"
              style={{ background: 'var(--color-brand-indigo)' }}
            />
            <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
              <div className="px-3 pt-3 pb-2 flex justify-center">
                <Image src="/home_images/the_creative_destination_logo.png" alt="" width={120} height={150} />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="pb-1">
                  <h3 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">Creative Destination</h3>
                </CardTitle>
                <CardDescription>
                  <p className="text-sm md:text-base xl:text-lg text-black">
                    Enhancing website and social media presence to support donor engagement for literacy-focused
                    laundromat community spaces.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: 'default', size: 'default' }),
            'h-auto px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
          )}
        >
          See More Projects
        </Link>
      </section>

      {/* Social Media Section — unchanged from before */}
      <section className={socialMediaStyles.container}>
        <Heading headingTag="h2">Social Media</Heading>
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 auto-cols-max gap-4 md:gap-7 2xl:gap-10 lg:w-full items-stretch">
          <li>
            <Link
              href="https://www.instagram.com/rcc.sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-1"
              className={cn(buttonVariants({ variant: 'social', size: 'lg' }), 'group w-full transition-colors duration-200')}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiInstagram
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">Follow Us</p>
                  <p id="social-media-button-1" className="text-lg md:text-xl">Instagram</p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="https://discord.com/invite/RGG9dMw4Rc"
              target="_blank"
              aria-labelledby="social-media-button-2"
              className={cn(buttonVariants({ variant: 'social', size: 'lg' }), 'group w-full transition-colors duration-200')}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiDiscord
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm lg:text-xs xl:text-sm hidden md:block">Join Our Community</p>
                  <p id="social-media-button-2" className="text-lg md:text-xl">Discord</p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="https://www.linkedin.com/company/rcc-sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-3"
              className={cn(buttonVariants({ variant: 'social', size: 'lg' }), 'group w-full transition-colors duration-200')}
            >
              <div className="flex gap-2 md:gap-5 lg:gap-4 place-items-center justify-start lg:justify-center">
                <FaLinkedin
                  role="presentation"
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">See Our Work</p>
                  <p id="social-media-button-3" className="text-lg md:text-xl">LinkedIn</p>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="mailto:rcc.sjsu@gmail.com"
              target="_blank"
              aria-labelledby="social-media-button-4"
              className={cn(buttonVariants({ variant: 'social', size: 'lg' }), 'group w-full transition-colors duration-200')}
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <CiMail
                  role="presentation"
                  strokeWidth={1}
                  className="size-10 md:size-12 bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl transition-all duration-200 group-hover:bg-hover-accent group-hover:p-0"
                />
                <div className="text-left">
                  <p className="text-xs md:text-sm hidden md:block">Reach Out to Us</p>
                  <p id="social-media-button-4" className="text-lg md:text-xl">Email</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}