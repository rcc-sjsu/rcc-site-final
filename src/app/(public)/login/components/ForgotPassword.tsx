import Link from 'next/link';
import styles from '../page.module.css';

export function ForgotPassword() {
  return (
    <div className={styles.forgotWrapper}>
      <Link className={styles.forgotLink} href="./password-recovery">
        Forgot Password
      </Link>
    </div>
  );
}
