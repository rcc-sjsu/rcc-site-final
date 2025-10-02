'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '../../../../utils/supabase/server';

// Helper function to translate error codes to user-friendly messages
function getUserFriendlyError(error: any): string {
  // PostgreSQL error codes
  if (error.code === '23505') {
    // Unique constraint violation (duplicate user_id in user_profiles)
    return 'You already have an account with us! Please log in instead.';
  }
  
  if (error.code === '23503') {
    // Foreign key violation
    return 'There was a problem creating your account. Please try again.';
  }
  
  if (error.code === '42501') {
    // Insufficient privilege / RLS violation
    return 'Permission error. Please contact support if this persists.';
  }

  // Supabase Auth specific errors
  if (error.message?.includes('User already registered')) {
    return 'This email is already registered. Please log in instead.';
  }
  
  if (error.message?.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  
  if (error.message?.includes('Invalid email')) {
    return 'Please enter a valid SJSU email address.';
  }

  if (error.message?.includes('Email rate limit exceeded')) {
    return 'Too many signup attempts. Please try again in a few minutes.';
  }

  // Default fallback
  return error.message || 'An unexpected error occurred. Please try again.';
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  if (user && !user.user_metadata.email_verified) {
    redirect('/check-email');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signupWithProfile(profileData: {
  fullName: string;
  sjsuEmail: string;
  password: string;
  year: string;
  major: string;
  minor: string;
  graduationYear: string;
  howHeard: string;
  interestAreas: string[];
  membershipType: string;
}) {
  const supabase = await createClient();

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: profileData.sjsuEmail,
      password: profileData.password,
      options: {
        data: {
          full_name: profileData.fullName,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { success: false, error: getUserFriendlyError(authError) };
    }

    if (!authData.user) {
      return { success: false, error: 'Unable to create your account. Please try again.' };
    }

    // 2. Insert user profile data
    const { error: profileError } = await supabase.from('user_profiles').insert({
      user_id: authData.user.id,
      full_name: profileData.fullName,
      email: profileData.sjsuEmail,
      year: profileData.year,
      major: profileData.major,
      minor: profileData.minor || null,
      graduation_year: profileData.graduationYear,
      how_heard: profileData.howHeard,
      interest_areas: profileData.interestAreas,
      membership_type: profileData.membershipType,
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return { success: false, error: getUserFriendlyError(profileError) };
    }

    // 3. Check if email confirmation is required
    if (authData.user && !authData.user.email_confirmed_at) {
      return { success: true, requiresEmailConfirmation: true };
    }

    return { success: true, requiresEmailConfirmation: false };
  } catch (error) {
    console.error('Unexpected signup error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again or contact support.' };
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    // Handle logout error, perhaps redirect to an error page or show a message
    console.error('Logout error:', error);
    redirect('/error'); // Or handle it gracefully in the UI
  }

  revalidatePath('/', 'layout');
  redirect('/login'); // Redirect to login page after successful logout
}
