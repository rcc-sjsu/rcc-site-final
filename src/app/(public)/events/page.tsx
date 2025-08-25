'use client';
import Image from 'next/image';
import styles from './page.module.css';
import InstaCarousel from '@/components/instagram/instapost';

export default function Events() {
  return (
    <div className="px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-8 sm:mb-16">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 lg:mb-0 lg:mr-4">Events</h1>
        <Image src="/icons/shape-icon.svg" alt="Shape Icon" width={200} height={200} />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
        {/*left images section*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 lg:mb-0 lg:mr-8 w-full lg:w-[60%]">
          <div className="relative w-full">
            <div className="aspect-square w-[320px] sm:w-[400px] md:w-[280px] mx-auto">
              <Image
                src="/images/events1.jpg"
                alt="events1"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 280px, 400px"
                priority
              />
            </div>
          </div>
          <div className="relative w-full sm:mt-8">
            <div className="aspect-square w-[320px] sm:w-[280px] md:w-[400px] mx-auto">
              <Image
                src="/images/events2.jpg"
                alt="events2"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 280px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left lg:w-[40%]">
          <p className={styles.description}>
            RCC's committees regularly hold events to promote{' '}
            <strong className={styles.fontBold}>community involvement </strong>
            in ethical technology and cross-disciplinary initiative!
          </p>
        </div>
      </div>

      <hr className="my-8 sm:my-16" />

      <div className="mb-8 sm:mb-16">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800">What's Happening</h1>
        </div>

        <InstaCarousel />
      </div>

      <div className="w-full overflow-hidden rounded-lg aspect-[16/9]">
        <iframe
          src="https://embed.styledcalendar.com/#DBbT3ywMoEOIzrCaOy4E"
          title="Styled Calendar"
          className="w-full h-full border-none"
          data-cy="calendar-embed-iframe"
          style={{ minHeight: '500px' }}
        />
      </div>
    </div>
  );
}
