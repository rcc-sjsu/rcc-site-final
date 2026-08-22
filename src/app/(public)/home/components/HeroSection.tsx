import styles from '../hero.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.container} data-intersecting-header-theme="Homepage">
      {/* padding-top from page.module.css takes up space here */}
      <Image
        src="/home_images/hero-background-image.png"
        alt="A laptop with code that a student is working on."
        fill
        priority
        className={styles.background}
      />

      <div className={styles.overlay} />

      <Image src="/home_images/hero-rcc.svg" alt="RCC" width={768} height={250} className={styles.title} />
    </section>
  );
}
