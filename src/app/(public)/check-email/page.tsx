import StatusMessage from '@/components/StatusMessage';

export default async function CheckEmail() {
  return (
    <StatusMessage
      eyebrow="Almost there"
      title="Please check your email!"
      description="We sent you a link to confirm your account. Open it on this device to finish signing in."
    />
  );
}
