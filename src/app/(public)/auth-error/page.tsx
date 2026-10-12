'use client';

import StatusMessage from '@/components/StatusMessage';

export default function AuthError() {
  return (
    <StatusMessage
      eyebrow="Sign-in problem"
      title="Sorry, something went wrong."
      description="Please make sure you have verified your email or are logged in."
      tone="error"
    />
  );
}
