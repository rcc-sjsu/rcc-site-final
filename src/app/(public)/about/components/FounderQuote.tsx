import Image from 'next/image';
import styles from '../founderquote.module.css';

export default function FounderQuote() {
  return (
    <section className={styles.container}>
      {/* For screen reader use only */}
      <p className="sr-only">A Quote from RCC&apos;s Founder</p>

      {/* RCC Founder quote */}
      <div className="flex flex-col justify-center items-center gap-7 md:gap-10 p-7 sm:p-10 md:p-15 lg:p-20 bg-purple-100 rounded-2xl md:rounded-4xl lg:rounded-[20%]">
        <Image
          src="/about/founder-image-circle.png"
          alt="Julia, RCC Founder, enthusiastically speaking at an RCC event"
          width={200}
          height={200}
          className={styles.juliaImage}
        ></Image>
        <figure>
          <blockquote>
            <p className="text-brand-indigo font-bold mb-2 md:mb-5 text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[2rem]">
              “Our goal isn’t just to study technology, but to question it, to understand its effects, and to make sure
              it’s applied responsibly.”
            </p>
          </blockquote>
          <figcaption>
            <p className={styles.description}>- Julia, RCC Founder</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
