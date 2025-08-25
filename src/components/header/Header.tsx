import Link from 'next/link';
import styles from './Header.module.css'; // Import the CSS module for the Header
import { createClient } from '../../../utils/supabase/server'; // Import server-side Supabase client
import { logout } from '../../app/utils/authUtils/authActions'; // Import the logout server action

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(); // Fetch user session

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
          {user ? (
            // If user is logged in, show Logout button
            <li>
              <form action={logout}>
                <button type="submit" className={styles.logoutButton}>
                  Logout
                </button>
              </form>
            </li>
          ) : (
            // If user is not logged in, show Login / Signup link
            <li>
              <Link href="/login">Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
