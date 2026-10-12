'use client';

import StatusMessage from '@/components/StatusMessage';

export default function ErrorPage() {
  return (
    <StatusMessage
      eyebrow="Error"
      title="Sorry, something went wrong."
      description="Please try again in a moment."
      tone="error"
    />
  );
}
