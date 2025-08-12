import Link from 'next/link';
import styles from './Header.module.css'; // Import the CSS module for the Header

export default function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>MyBrand</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
