import { NextResponse } from 'next/server';

import { contactFormSchema } from '@/lib/contact';

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const scriptSecret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!scriptUrl || !scriptSecret) {
    console.error('Contact email is missing required environment variables.');
    return NextResponse.json({ error: 'Contact email is not configured.' }, { status: 503 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const { fullName, email, subject, message, website } = result.data;

  // Bots commonly fill hidden fields. Return success without sending so they do not retry.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: scriptSecret, fullName, email, subject, message }),
      cache: 'no-store',
      redirect: 'follow',
    });

    const responseText = await response.text();
    let responseBody: unknown;

    try {
      responseBody = JSON.parse(responseText);
    } catch {
      console.error('Google Apps Script returned a non-JSON response:', response.status, responseText.slice(0, 500));
      return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
    }

    const succeeded =
      response.ok &&
      typeof responseBody === 'object' &&
      responseBody !== null &&
      'ok' in responseBody &&
      responseBody.ok === true;

    if (!succeeded) {
      console.error('Google Apps Script failed to send contact email:', response.status, responseBody);
      return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
    }
  } catch (error) {
    console.error('Google Apps Script request failed:', error);
    return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
