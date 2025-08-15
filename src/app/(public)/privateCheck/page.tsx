import { createClient } from '../../../../utils/supabase/server';
import { checkAuthStatus } from '../../appUtils/auth-helper';

export default async function PrivatePage() {
  const user = await checkAuthStatus();

  return <p>Hello {user.email}</p>;
}
