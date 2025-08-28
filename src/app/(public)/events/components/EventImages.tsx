import Image from 'next/image';
import styles from '../page.module.css';

export default function EventImages() {
  return (
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
  );
}
