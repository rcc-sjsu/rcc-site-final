// css style imports
import aboutStyles from './(public)/home/about.module.css';
import socialMediaStyles from './(public)/home/socialmedia.module.css';
import recentEventsStyles from './(public)/home/recentevents.module.css';
import recentProjectStyles from './(public)/home/recentprojects.module.css';

// component imports
import BackgroundGradient from '@/components/BackgroundGradient';
import CompaniesSection from '@/components/CompaniesSection/CompaniesSection';
import Heading from '@/components/Heading';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        {/* <BackgroundGradient className={aboutStyles.gradient2} color="purple" /> */}

        <p className={aboutStyles.description}>
          The Responsible Computing Club (RCC) at SJSU empowers students to shape the future of tech. We unite students
          to explore the ethics of tech through hands-on, cross-disciplinary projects.
        </p>

        {/* Call to Action (CTA) buttons */}
        <div className="flex flex-col items-center justify-center md:flex-row gap-7 md:gap-4 w-[80%] lg:w-auto">
          {/* new: more modular linked buttons. can apply to all buttons to reduce clutter */}
          <Link
            href="/about#get-involved"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'w-[75%] md:w-auto text-xl md:text-2xl px-8 md:px-12 py-8 transition-colors duration-200'
            )}
          >
            Get Involved
            <MoveRightIcon size="1.5em" />
          </Link>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'w-[75%] md:w-auto text-xl md:text-2xl px-8 md:px-12 py-8 transition-colors duration-200'
            )}
          >
            Get to Know Us
          </Link>
        </div>

        {/* Data Analytics */}
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-cols-max gap-9 md:gap-10 xl:gap-5 place-items-center justify-between w-full md:w-[75%] xl:w-full h-auto md:h-full lg:h-auto mt-10 sm:mt-5 md:mt-7 xl:mt-10 text-brand-indigo">
          <li className="stat-card h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">364</p>
            <p className="text-xl md:text-2xl">Total Members</p>
          </li>
          <li className="stat-card h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-5 lg:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">66</p>
            <p className="text-xl md:text-2xl">Active Members</p>
          </li>
          <li className="stat-card h-auto md:h-full lg:h-auto flex flex-col justify-center md:col-span-2 lg:col-span-1 text-xl border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] not-placeholder-shown:rounded-2xl px-10 lg:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">18%</p>
            <p className="text-xl md:text-2xl">Non-Tech Majors</p>
          </li>
        </ul>
      </section>

      {/* Recent Events section */}
      <section className={recentEventsStyles.container}>
        <Heading headingTag="h2"> Recent Events </Heading>
        <BackgroundGradient className={recentEventsStyles.gradient} color="purple" />
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
          <Card className="h-auto xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-dark-violet)] md:shadow-[-12px_12px_0_var(--color-brand-dark-violet)]">
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
                  Join us for a night of food, awards, activities, and great company as we celebrate everything we’ve
                  accomplished this year and wrap up the semester together.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-indigo)] md:shadow-[-12px_12px_0_var(--color-brand-indigo)]">
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

          <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-dark-violet)] md:shadow-[-12px_12px_0_var(--color-brand-dark-violet)]">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image src="/about/pastProjects/rcc-logo.png" alt="" width={150} height={150} />
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h3 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">Amazon Youth Tech</h3>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  Join us for Amazon Youth Tech, an interactive workshop where you’ll dive into AI/ML, Cloud
                  Fundamentals, & Agentic AI on AWS — plus get the chance to connect and network with industry
                  professionals!
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Link
          href="/events"
          className="flex gap-2 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
        >
          See More Events
        </Link>
      </section>

      {/* Recent Projects Section */}
      <section className={recentProjectStyles.container}>
        <Heading headingTag="h2"> Recent Projects </Heading>
        <BackgroundGradient className={recentProjectStyles.gradient} color="purple" />

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
          <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-indigo)] md:shadow-[-12px_12px_0_var(--color-brand-indigo)]">
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

          <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-dark-violet)] md:shadow-[-12px_12px_0_var(--color-brand-dark-violet)]">
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

          <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-indigo)] md:shadow-[-12px_12px_0_var(--color-brand-indigo)]">
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

        <Link
          href="/projects"
          className="flex gap-2 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
        >
          See More Projects
        </Link>
      </section>

      {/* Companies Section */}
      <CompaniesSection />

      {/* Social Media Section */}
      <section className={socialMediaStyles.container}>
        <Heading headingTag="h2">Social Media</Heading>
        {/* list of links to social media pages */}
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 auto-cols-max gap-4 md:gap-7 2xl:gap-10 lg:w-full">
          {/* Instagram link */}
          <li>
            <Link
              href="https://www.instagram.com/rcc.sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-1"
              className="flex justify-center h-auto lg:h-full xl:h-auto px-5 py-3 md:px-7 md:py-4 bg-brand-lavender text-brand-indigo rounded-lg border-2 border-brand-indigo hover:bg-brand-indigo hover:**:p-0 hover:text-white focus:outline-3 focus:outline-offset-4  focus:outline-brand-light-steel-blue focus:bg-brand-indigo focus:**:p-0 focus:text-white focus:font-semibold active:outline-offset-4 active:bg-brand-indigo active:**:p-0 active:text-white active:font-semibold"
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiInstagram
                  role="presentation"
                  className="text-4xl md:text-5xl bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl"
                ></SiInstagram>
                <div className="text-left">
                  {' '}
                  <p className="text-xs md:text-sm hidden md:block">Follow Us</p>
                  <p id="social-media-button-1" className="text-lg md:text-xl">
                    Instagram
                  </p>
                </div>
              </div>
            </Link>
          </li>

          {/* Discord link */}
          <li>
            <Link
              href="https://discord.com/invite/RGG9dMw4Rc"
              target="_blank"
              aria-labelledby="social-media-button-2"
              className="flex justify-center h-auto lg:h-full xl:h-auto px-5 py-3 md:px-4 lg:px-7 xl:px-4 md:py-4 lg:py-3 xl:py-4 bg-brand-lavender text-brand-indigo rounded-lg border-2 border-brand-indigo hover:bg-brand-indigo hover:**:p-0 hover:text-white focus:outline-3 focus:outline-offset-4  focus:outline-brand-light-steel-blue focus:bg-brand-indigo focus:**:p-0 focus:text-white focus:font-semibold active:outline-offset-4 active:bg-brand-indigo active:**:p-0 active:text-white active:font-semibold"
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <SiDiscord
                  role="presentation"
                  className="text-4xl md:text-5xl bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl"
                ></SiDiscord>
                <div className="text-left">
                  {' '}
                  <p className="text-xs md:text-sm lg:text-xs xl:text-sm hidden md:block">Join Our Community</p>
                  <p id="social-media-button-2" className="text-lg md:text-xl">
                    Discord
                  </p>
                </div>
              </div>
            </Link>
          </li>

          {/* LinkedIn link */}
          <li>
            <Link
              href="https://www.linkedin.com/company/rcc-sjsu/"
              target="_blank"
              aria-labelledby="social-media-button-3"
              className="flex justify-items-center h-auto lg:h-full xl:h-auto py-3 px-8 md:py-4 bg-brand-lavender text-brand-indigo rounded-lg border-2 border-brand-indigo hover:bg-brand-indigo hover:**:p-0 hover:text-white focus:outline-3 focus:outline-offset-4  focus:outline-brand-light-steel-blue focus:bg-brand-indigo focus:**:p-0 focus:text-white focus:font-semibold active:outline-offset-4 active:bg-brand-indigo active:**:p-0 active:text-white active:font-semibold"
            >
              <div className="flex gap-2 md:gap-5 lg:gap-4 place-items-center justify-start lg:justify-center">
                <FaLinkedin
                  role="presentation"
                  className="text-4xl md:text-5xl bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl"
                ></FaLinkedin>
                <div className="text-left">
                  {' '}
                  <p className="text-xs md:text-sm hidden md:block">See Our Work</p>
                  <p id="social-media-button-3" className="text-lg md:text-xl">
                    LinkedIn
                  </p>
                </div>
              </div>
            </Link>
          </li>

          {/* Email link */}
          <li>
            <Link
              href="mailto:rcc.sjsu@gmail.com"
              target="_blank"
              aria-labelledby="social-media-button-4"
              className="flex justify-items-center h-auto lg:h-full xl:h-auto px-8 py-3 md:py-4 bg-brand-lavender text-brand-indigo rounded-lg border-2 border-brand-indigo hover:bg-brand-indigo hover:**:p-0 hover:text-white focus:outline-3 focus:outline-offset-4  focus:outline-brand-light-steel-blue focus:bg-brand-indigo focus:**:p-0 focus:text-white focus:font-semibold active:outline-offset-4 active:bg-brand-indigo active:**:p-0 active:text-white active:font-semibold"
            >
              <div className="flex gap-2 md:gap-4 place-items-center justify-start lg:justify-center">
                <CiMail
                  role="presentation"
                  strokeWidth={1}
                  className="text-4xl md:text-5xl bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl"
                ></CiMail>
                <div className="text-left">
                  {' '}
                  <p className="text-xs md:text-sm hidden md:block">Reach Out to Us</p>
                  <p id="social-media-button-4" className="text-lg md:text-xl">
                    Email
                  </p>
                </div>
              </div>
            </Link>
          </li>

          {/* <Link
            href="#"
            className="bg-brand-indigo px-14 py-2 text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
          >
            Reach Out to Us <br /> Email
            <MailIcon></MailIcon>
          </Link> */}
        </ul>
      </section>
    </div>
  );
}
