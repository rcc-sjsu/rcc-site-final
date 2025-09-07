import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import styles from '../page.module.css';

export function EmailInput() {
  return (
    <div className={styles.inputWrapper}>
      <span className={styles.iconWrapper}>
        <UserIcon className={styles.icon} />
      </span>
      <input type="email" name="email" placeholder="Email" className={styles.input} required />
    </div>
  );
}

export function PasswordInput() {
  return (
    <div className={styles.inputWrapper}>
      <span className={styles.iconWrapper}>
        <LockClosedIcon className={styles.icon} />
      </span>
      <input type="password" name="password" placeholder="Password" className={styles.input} required />
    </div>
  );
}
