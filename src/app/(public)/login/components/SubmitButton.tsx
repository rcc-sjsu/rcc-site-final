import styles from '../page.module.css';

export function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button type="submit" className={styles.button} disabled={isPending}>
      {isPending ? 'Logging in...' : 'Login'}
    </button>
  );
}
