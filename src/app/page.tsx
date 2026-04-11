// css style imports
import aboutStyles from './(public)/home/about.module.css';
import industryStyles from './(public)/home/industrypartners.module.css';
import socialMediaStyles from './(public)/home/socialmedia.module.css';

// component imports
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import Link from 'next/link';
import Image from 'next/image';

// icon imports
import { MoveRightIcon } from 'lucide-react';
import { SiLinkedin, SiInstagram, SiDiscord } from 'react-icons/si';
import { CiMail } from 'react-icons/ci';

// import { ButtonRender } from '@/components/LinkStyledAsAButton/buttonRender';
// import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <div style={{ overflow: 'clip' }}>
      {/* About Section */}
      <section className={aboutStyles.container}>
        {/* Image and gradient container */}
        <Heading headingTag="h1"> Responsible Computing Club </Heading>
        <BackgroundGradient className={aboutStyles.gradient} color="purple" />
        {/* <BackgroundGradient className={aboutStyles.gradient2} color="purple" /> */}

        <p className={aboutStyles.description}>
          The Responsible Computing Club (RCC) at SJSU empowers students to shape the future of tech. We unite students
          to explore the ethics of tech through hands-on, cross-disciplinary projects. Together, we're shaping a more
          responsible and inclusive future.
        </p>

        {/* <Button
           variant="link"
           className={'bg-brand-dark-purple px-14 py-6 text-xl text-white cursor-pointer seeOurStoryButton'}
         >
           See Our Story
         </Button> */}

        {/* option 1 for hover, focus, and active: hover:bg-brand-dark-violet focus:outline-2 focus:outline-offset-2 focus:outline-brand-cobalt-blue focus:bg-brand-cobalt-blue active:outline-2 active:outline-offset-2 active:outline-brand-cobalt-blue active:bg-brand-cobalt-blue */}

        <Link
          href="#"
          className="flex gap-3 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 w-[75%] md:w-auto text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
        >
          See Our Story
          <MoveRightIcon size="1.5em"></MoveRightIcon>
        </Link>

        {/* Data Analytics */}
        <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-cols-max gap-9 md:gap-10 xl:gap-5 place-items-center justify-between w-full md:w-[75%] xl:w-full h-auto md:h-full lg:h-auto mt-10 sm:mt-5 md:mt-7 xl:mt-10 text-brand-indigo">
          <li className="h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">364</p>
            <p className="text-xl md:text-2xl">Total Members</p>
          </li>
          <li className="h-auto md:h-full lg:h-auto flex flex-col justify-center border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] rounded-2xl px-10 md:px-5 lg:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">66</p>
            <p className="text-xl md:text-2xl">Active Members</p>
          </li>
          <li className="h-auto md:h-full lg:h-auto flex flex-col justify-center md:col-span-2 lg:col-span-1 text-xl border-2 md:border-4 border-brand-indigo bg-[#F2E4FE] not-placeholder-shown:rounded-2xl px-10 lg:px-7 xl:px-10 py-3 shadow-[5px_5px_0_var(--color-brand-indigo)] md:shadow-[7px_7px_0_var(--color-brand-indigo)]">
            <p className="text-xl md:text-2xl">18%</p>
            <p className="text-xl md:text-2xl">Non-Tech Majors</p>
          </li>
        </ul>

        {/* <ButtonRender>hiii</ButtonRender> */}
      </section>

      {/* Industry Partners Section */}
      <section className={industryStyles.container}>
        <Heading headingTag="h2">Industry Partners</Heading>
        <BackgroundGradient className={industryStyles.gradient} color="purple" />

        {/* list of industry partners */}
        <ul className="flex flex-col h-full justify-items-center items-stretch md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-cols-max gap-2 md:gap-7 xl:gap-4">
          {/* NEED TO ADD A BACKGROUND COLOR OF WHITE TO EACH OF THE FIGURES ONCE THE REBRAND COLORS HAVE BEEN CHOSEN */}
          <li>
            <figure className="h-full w-full aspect-square flex flex-col justify-center items-center p-6 gap-4 md:gap-8">
              <Image
                src="/home_images/credo_AI_logo.png"
                alt=""
                width={190}
                height={190}
                className="w-20 md:w-auto md:h-auto"
              ></Image>
              <figcaption className="text-lg md:text-2xl">Credo AI</figcaption>
            </figure>
          </li>
          <li>
            <figure className="h-full w-full aspect-square flex flex-col justify-center items-center p-6 gap-4">
              <Image
                src="/home_images/EPA_ESA_logo.png"
                alt=""
                width={120}
                height={120}
                className="w-20 md:w-auto md:h-auto"
              ></Image>
              <figcaption className="text-lg md:text-2xl">EPA/ESA</figcaption>
            </figure>
          </li>
          <li>
            <figure className="h-full w-full aspect-square flex flex-col justify-center items-center md:col-span-2 lg:col-span-1 md:w-auto md:h-auto lg:w-full lg:h-full p-6 gap-4">
              <Image
                src="/home_images/the_creative_destination_logo.png"
                alt=""
                width={110}
                height={120}
                className="w-20 md:w-auto md:h-auto"
              ></Image>
              <figcaption className="text-lg md:text-2xl">
                <p>The Creative</p> <p>Destination</p>
              </figcaption>
            </figure>
          </li>
        </ul>
      </section>

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
                <SiLinkedin
                  role="presentation"
                  className="text-4xl md:text-5xl bg-brand-indigo text-white p-2 md:p-2.5 rounded-md md:rounded-xl"
                ></SiLinkedin>
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
