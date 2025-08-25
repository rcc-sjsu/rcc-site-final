'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SiLinkedin, SiInstagram, SiDiscord } from 'react-icons/si';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Col 1: Club info */}
        <div className={`${styles.footerColumn} ${styles.footerMain}`}>
          <p className={styles.footerTitle}>Responsible Computing Club</p>
          <p className={styles.footerDescription}>
            The Responsible Computing Club (RCC) at SJSU partners with Mozilla to
            empower students and shape the future of tech.
          </p>
          <div className={styles.footerLogo}>
            <Image
              src="/images/footer/mozilla-footer-logo.png"
              alt="Mozilla"
              width={90}
              height={30}
              priority
            />
          </div>
        </div>

        {/* Column 2: Shortcut links */}
        <nav className={`${styles.footerColumn} ${styles.shortcut}`} aria-label="Shortcut">
          <p className={styles.footerHeading}>SHORTCUT</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><Link href="/about">about us</Link></li>
            <li className={styles.linkItem}><Link href="/ambassadorship">ambassadorship</Link></li>
            <li className={styles.linkItem}><Link href="/events">events</Link></li>
          </ul>
        </nav>

        {/* Column 3: Social links */}
        <nav className={`${styles.footerColumn} ${styles.follow}`} aria-label="Follow us">
          <p className={styles.footerHeading}>FOLLOW US</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link
                href="https://www.linkedin.com/company/rcc-sjsu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="RCC on LinkedIn"
                title="LinkedIn"
              >
                <SiLinkedin className={styles.socialIcon} aria-hidden="true" />
                <span>linkedin</span>
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link
                href="https://www.instagram.com/rcc.sjsu/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="RCC on Instagram"
                title="Instagram"
              >
                <SiInstagram className={styles.socialIcon} aria-hidden="true" />
                <span>instagram</span>
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link
                href="https://discord.gg/RGG9dMw4Rc"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="RCC on Discord"
                title="Discord"
              >
                <SiDiscord className={styles.socialIcon} aria-hidden="true" />
                <span>discord</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 4: Contact */}
        <div className={`${styles.footerColumn} ${styles.contactUs}`}>
          <p className={styles.footerHeading}>CONTACT US</p>
          <p className={styles.contactDescription}>San José State University</p>
          <p className={styles.contactDescription}>rcc.sjsu@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
