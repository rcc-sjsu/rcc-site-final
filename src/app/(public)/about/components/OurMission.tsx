import Image from 'next/image';
import Link from 'next/link';
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../ourmission.module.css';
import { UsersRound } from 'lucide-react';

export default function OurMission() {
  return (
    <section className={styles.container}>
      <div className="bg-purple-100 rounded-full p-5">
        <Image
          src="/about/hand-holding-globe-icon.svg"
          alt=""
          width={75}
          height={75}
          //   className={styles.collageImage}
        ></Image>
      </div>

      <Heading headingTag="h2"> Shaping a More Responsible and Inclusive Future</Heading>
      {/* <BackgroundGradient className={styles.gradient} color="purple" /> */}
      {/* <BackgroundGradient className={aboutStyles.gradient2} color="purple" /> */}

      <p className={styles.description}>
        Our mission is to change the conversation around AI and emerging technologies, focusing on their social,
        ethical, and environmental impact rather than just the technical side.
      </p>
      <p className={styles.description}>
        In order to make RCC relevant to all majors (and minors) and to hone their collective strengths, we've created
        dedicated teams focused on areas like workshops, consulting, marketing, web dev, and so much more!
      </p>

      {/* <Button
           variant="link"
           className={'bg-brand-dark-purple px-14 py-6 text-xl text-white cursor-pointer seeOurStoryButton'}
         >
           See Our Story
         </Button> */}

      {/* option 1 for hover, focus, and active: hover:bg-brand-dark-violet focus:outline-2 focus:outline-offset-2 focus:outline-brand-cobalt-blue focus:bg-brand-cobalt-blue active:outline-2 active:outline-offset-2 active:outline-brand-cobalt-blue active:bg-brand-cobalt-blue */}

      <Link
        href="/ambassadors"
        className="flex gap-2 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 md:py-3 w-[75%] md:w-auto text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
      >
        Meet Our Ambassadors
        <UsersRound size="1em"></UsersRound>
      </Link>
    </section>
  );
}
