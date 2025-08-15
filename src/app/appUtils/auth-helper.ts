import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';

export async function checkAuthStatus() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    // If no user or an error, redirect to auth-error page
    redirect('/auth-error');
  }

  return data.user;
}
