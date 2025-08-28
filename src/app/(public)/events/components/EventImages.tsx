import Image from 'next/image';
import styles from '../page.module.css';

export default function EventImages() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
      {/*left images section*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 lg:mb-0 lg:mr-8 w-full lg:w-[60%]">
        <div className="flex items-center justify-center">
          <div className="relative rounded-full overflow-hidden aspect-square w-[280px] sm:w-[320px] md:w-[400px]">
            <Image
              src="/images/events1.jpg"
              alt="events1"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
              priority
            />
          </div>
        </div>
        <div className="flex items-center justify-center sm:mt-8">
          <div className="relative rounded-full overflow-hidden aspect-square w-[280px] sm:w-[320px] md:w-[400px]">
            <Image
              src="/images/events2.jpg"
              alt="events2"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
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
