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
    <figure className={`${styles['marquee-item']} flex flex-col items-center justify-center gap-3`}>
      <Image
        src={partner.src}
        alt={partner.name}
        width={partner.width ?? 140}
        height={partner.height ?? 140}
        className="h-20 w-auto object-contain md:h-28"
      />
      <figcaption className="text-sm md:text-base font-semibold text-brand-indigo whitespace-nowrap">
        {partner.name}
      </figcaption>
    </figure>
  );
}

function MarqueeGroup({ partners, hidden }: { partners: Partner[]; hidden?: boolean }) {
  return (
    <div className={styles['marquee-group']} aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <PartnerLogo key={partner.name} partner={partner} />
      ))}
    </div>
  );
}

export function Marquee({
  partners,
  secondsPerItem = 4,
  pxPerItem = 220,
  minWidth = 320,
  maxWidth = 900,
}: {
  partners: Partner[];
  secondsPerItem?: number;
  pxPerItem?: number;
  minWidth?: number;
  maxWidth?: number;
}) {
  const duration = Math.max(partners.length * secondsPerItem, 12);
  const wrapperWidth = Math.min(maxWidth, Math.max(minWidth, partners.length * pxPerItem));

  return (
    <div className={`${styles['marquee-outer']} mx-auto`} style={{ maxWidth: wrapperWidth }}>
      <div className={styles['marquee-wrapper']}>
        <div className={styles['marquee-track']} style={{ animationDuration: `${duration}s` }}>
          <MarqueeGroup partners={partners} />
          <MarqueeGroup partners={partners} hidden />
        </div>
      </div>
    </div>
  );
}
