'use server';
import { createClient } from '../../../../utils/supabase/server';
import { redirect } from 'next/navigation';

interface LoginState {
  error: string | null;
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    console.log(loginError.message);
    return { error: loginError.message };
  }

  // Optionally, you can return a success state before redirecting
  // return { error: null };
  redirect('/');
}
