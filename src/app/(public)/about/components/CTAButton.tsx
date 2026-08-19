import Link from 'next/link';
import { useId } from 'react';
import styles from '../ctabutton.module.css';

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function CTAButton({ href, children }: Props) {
  const g1 = useId();
  const g2 = useId();

  return (
    <Link href={href} className={styles.button}>
      <svg className={styles.svg} aria-hidden>
        <defs>
          <linearGradient id={g1} y1="0%" y2="10%">
            <stop offset="0%" stopColor="var(--blurple)" />
            <stop offset="100%" stopColor="rgb(from var(--color-brand-pink) r g b / 0)" />
          </linearGradient>
          <linearGradient id={g2} y1="90%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-pink)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--yellow)" />
          </linearGradient>
        </defs>
        <rect className={styles.g1} fill={`url(#${g1})`} x="-100%" y="0%" width="100%" height="100%" />
        <rect className={styles.g2} fill={`url(#${g2})`} x="100%" y="0%" width="100%" height="100%" />
      </svg>
      <div className="relative">{children}</div>
    </Link>
  );
}
