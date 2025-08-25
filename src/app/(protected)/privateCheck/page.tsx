import { getUser } from '@/app/utils/authUtils/authHelpers';

export default async function PrivatePage() {
  // const user = await checkAuthStatus();
  const user = await getUser();

  return <p>Hello {user?.email}</p>;
}
