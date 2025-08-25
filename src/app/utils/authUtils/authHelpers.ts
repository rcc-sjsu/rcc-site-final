import { createClient } from '../../../../utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Null check -> will redirect user to auth-error page
  if (!user) {
    redirect('/auth-error');
  }

  return user;
}
