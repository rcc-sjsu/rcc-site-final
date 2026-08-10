import Image from 'next/image';
import styles from './CoolQuote.module.css';

export default function CoolQuote() {
  return (
    <section className={styles.container} aria-label="Quote from RCC founder">
      <div className={styles.rule} aria-hidden="true" />

      <Image src="/about/quotation_marks.svg" alt="" width={117} height={90} className={styles.quotationMarks} />

      <figure className={styles.quote}>
        <blockquote>
          <p>
            Our goal isn&rsquo;t just to study technology, but to question it, to understand its effects, and to make
            sure it&rsquo;s applied{' '}
            <em>
              <b>responsibly</b>
            </em>
            .
          </p>
        </blockquote>
        <figcaption>Julia, RCC Founder</figcaption>
      </figure>

      <div className={styles.rule} aria-hidden="true" />
    </section>
  );
}
