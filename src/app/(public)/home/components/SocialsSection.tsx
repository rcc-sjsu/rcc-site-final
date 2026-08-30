import Image from 'next/image';
import Link from 'next/link';
import styles from '../socialmedia.module.css';

const socials = [
  {
    href: 'https://discord.com/invite/RGG9dMw4Rc',
    eyebrow: 'Join Our Community',
    label: 'Discord',
    icon: '/figma/social-discord.svg',
    color: 'blurple',
  },
  {
    href: 'https://www.instagram.com/rcc.sjsu/',
    eyebrow: 'Follow Us',
    label: 'Instagram',
    icon: '/figma/social-instagram.svg',
    color: 'purple',
  },
  {
    href: 'https://www.linkedin.com/company/rcc-sjsu/',
    eyebrow: 'See Our Work',
    label: 'LinkedIn',
    icon: '/figma/social-linkedin.svg',
    color: 'pink',
  },
  {
    href: 'mailto:rcc.sjsu@gmail.com',
    eyebrow: 'Reach Out to Us',
    label: 'Email',
    icon: '/figma/social-email.svg',
    color: 'orange',
  },
];

export default function SocialsSection() {
  return (
    <section className={styles.container} aria-labelledby="socials-heading">
      <h2 id="socials-heading" className={styles.heading}>
        Get in Touch
      </h2>

      <ul className={styles.buttons}>
        {socials.map((social) => (
          <li key={social.label}>
            <Link
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              className={styles.button}
              data-color={social.color}
            >
              <Image src={social.icon} alt="" width={60} height={60} className={styles.icon} />
              <span className={styles.text}>
                <span className={styles.eyebrow}>{social.eyebrow}</span>
                <span className={styles.label}>{social.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
