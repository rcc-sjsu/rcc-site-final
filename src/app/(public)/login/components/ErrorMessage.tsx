import styles from '../page.module.css';

export function ErrorMessage({ error }: { error: string }) {
  if (!error) return null;
  return <div className={styles.error}>{error}</div>;
}
