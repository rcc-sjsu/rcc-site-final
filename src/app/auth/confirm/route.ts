import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server';

const emailOtpTypes = ['signup', 'invite', 'magiclink', 'recovery', 'email_change', 'email'] as const;
type EmailOtpType = (typeof emailOtpTypes)[number];

function isEmailOtpType(type: string | null): type is EmailOtpType {
  return emailOtpTypes.some((emailOtpType) => emailOtpType === type);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/';

  if (token_hash && isEmailOtpType(type)) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirect(next);
    }
  }

  redirect('/membership');
}
