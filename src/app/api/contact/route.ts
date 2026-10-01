import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { contactFormSchema } from '@/lib/contact';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
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

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[RCC Contact] ${subject}`,
    text: [`Name: ${fullName}`, `Email: ${email}`, '', message].join('\n'),
  });

  if (error) {
    console.error('Resend failed to send contact email:', error);
    return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
