'use client';

import { useState } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import Link from 'next/link';
import Heading from '@/components/Heading';
import styles from './page.module.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password has been reset! You can now log in.');
    }
  }

  return (
    <div className={styles.container}>
      <Heading headingTag="h1" align="center" logoSize={12} aria-labelledby="reset-psw-heading">
        Reset Password
      </Heading>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className={styles.input}
          required
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <div className={styles.link}>
          <Link href="/login">Return to login</Link>
        </div>
      </form>
    </div>
  );
}
