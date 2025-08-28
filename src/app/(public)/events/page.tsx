'use client';
import Image from 'next/image';
import styles from './page.module.css';
import InstaCarousel from '@/components/instagram/instapost';
import Divider from '@/components/Divider';
import Heading from '@/components/Heading';
import EventImages from './components/EventImages';
import EventsCalendar from './components/EventsCalendar';

export default function Events() {
  return (
    <div className="px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-8 sm:mb-16">
        <Heading headingTag="h1" align="center">
          Events
        </Heading>
        <Image src="/icons/shape-icon.svg" alt="Shape Icon" width={200} height={200} />
      </div>

      <EventImages />

      <Divider />

      <div className="mb-8 sm:mb-16 mt-10">
        <div className="flex items-center justify-center mb-8">
          <Heading headingTag="h1" align="center">
            What's Happening
          </Heading>
        </div>

        <InstaCarousel />
      </div>

      <EventsCalendar />
    </div>
  );
}
