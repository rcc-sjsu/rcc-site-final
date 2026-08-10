import { headingProps } from './type';
import styles from './Heading.module.css';
import Image from 'next/image';
import { JSX } from 'react';

export default function Heading({
  headingTag,
  className,
  children,
  customStyle,
  align,
  tone = 'default',
  logoPath,
  logoAlign,
  logoSize,
}: headingProps) {
  const HeadingTag = headingTag as keyof JSX.IntrinsicElements;
  const textToneClassName = tone === 'light' ? styles.lightText : styles.gradientText;

  return (
    <HeadingTag
      style={{ justifyContent: align == 'left' ? 'left' : 'center', ...customStyle }}
      className={`${styles.heading} ${className ?? ''}`}
    >
      {/* Left-aligned logo */}
      {logoPath && logoAlign == 'left' && logoSize && (
        <Image src={logoPath} className={styles.logo} height={logoSize} width={logoSize} alt="" />
      )}

      <span className={`${styles.headingText} ${textToneClassName}`}>{children}</span>

      {/* Right-aligned logo */}
      {logoPath && logoAlign == 'right' && logoSize && (
        <Image src={logoPath} className={styles.logo} alt="" height={logoSize} width={logoSize} />
      )}
    </HeadingTag>
  );
}
