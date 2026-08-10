import Image from 'next/image';
import styles from './Marquee.module.css';

export interface Partner {
  name: string;
  src: string;
  width?: number;
  height?: number;
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <figure className={`${styles['marquee-item']} flex items-center justify-center`}>
      <Image
        src={partner.src}
        alt={partner.name}
        width={partner.width ?? 140}
        height={partner.height ?? 140}
        unoptimized
        className={styles['marquee-logo']}
      />
    </figure>
  );
}

function MarqueeGroup({ partners, hidden }: { partners: Partner[]; hidden?: boolean }) {
  return (
    <div className={styles['marquee-group']} aria-hidden={hidden || undefined}>
      {partners.map((partner, index) => (
        <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
      ))}
    </div>
  );
}

export function Marquee({
  partners,
  duration = 30,
  pxPerItem = 220,
  minWidth = 320,
  maxWidth = 900,
  reverse = false,
}: {
  partners: Partner[];
  duration?: number;
  pxPerItem?: number;
  minWidth?: number;
  maxWidth?: number;
  reverse?: boolean;
}) {
  const wrapperWidth = Math.min(maxWidth, Math.max(minWidth, partners.length * pxPerItem));

  return (
    <div className={`${styles['marquee-outer']} mx-auto`} style={{ maxWidth: wrapperWidth }}>
      <div className={styles['marquee-wrapper']}>
        <div
          className={`${styles['marquee-track']} ${reverse ? styles['marquee-track-reverse'] : ''}`}
          style={{ animationDuration: `${duration}s` }}
        >
          <MarqueeGroup partners={partners} />
          <MarqueeGroup partners={partners} hidden />
        </div>
      </div>
    </div>
  );
}
