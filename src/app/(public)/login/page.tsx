'use client';

import { useActionState } from 'react';
import { login } from './actions';
import { useRef } from 'react';
import styles from './page.module.css';
import { EmailInput, PasswordInput } from './components/Inputs';
import { ErrorMessage } from './components/ErrorMessage';
import { ForgotPassword } from './components/ForgotPassword';
import { SubmitButton } from './components/SubmitButton';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: null });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className={styles.container}>
      <form ref={formRef} action={formAction} className={styles.form}>
        <EmailInput />
        <ErrorMessage error={state?.error || ''} />
        <PasswordInput />
        <ForgotPassword />
        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
}
