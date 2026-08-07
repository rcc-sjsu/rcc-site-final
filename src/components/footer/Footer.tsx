'use client';

import Image from 'next/image';
import { SiInstagram, SiDiscord } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.clubSection}>
          <Image
            src="/about/pastProjects/rcc-logo.png"
            alt="Responsible Computing Club logo"
            width={90}
            height={90}
            className={styles.rccLogo}
          />

          <div className={styles.clubText}>
            <p className={styles.footerTitle}>Responsible Computing Club</p>
            <p className={styles.footerDescription}>
              The Responsible Computing Club (RCC) at SJSU partners with Mozilla
              to empower students and shape the future of tech.
            </p>
          </div>
        </div>

        <nav className={styles.followSection} aria-label="Follow us">
          <p className={styles.footerHeading}>FOLLOW US</p>

          <ul className={styles.linkList}>
            <li>
              <a
                href="https://www.linkedin.com/company/rcc-sjsu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/rcc.sjsu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </li>

            <li>
              <a
                href="https://discord.com/invite/RGG9dMw4Rc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiDiscord aria-hidden="true" />
                <span>Discord</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.contactSection}>
          <p className={styles.footerHeading}>CONTACT US</p>
          <p>San Jose State University</p>
          <a href="mailto:rcc.sjsu@gmail.com">rcc.sjsu@gmail.com</a>
        </div>

        <div className={styles.partnerSection}>
          <div className={styles.sjsuLogo}>
            <span className={styles.sjsuLetters}>SJSU</span>
            <span className={styles.sjsuName}>
              SAN JOSÉ STATE
              <br />
              UNIVERSITY
            </span>
          </div>

          <Image
            src="/images/footer/mozilla-footer-logo.png"
            alt="Mozilla"
            width={94}
            height={30}
            className={styles.mozillaLogo}
          />
        </div>
      </div>
    </footer>
  );
}
