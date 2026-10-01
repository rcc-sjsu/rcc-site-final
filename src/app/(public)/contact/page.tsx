'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { contactFormSchema, type ContactFormValues } from '@/lib/contact';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: '', email: '', subject: '', message: '', website: '' },
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your message. Please try again.');
      }

      reset();
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent to the RCC team.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not send your message. Please try again.',
      });
    }
  }

  return (
    <section className="flex flex-col items-center px-4 py-16" aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="text-3xl font-bold mb-2">
        Contact Us
      </h1>
      <p className="text-gray-600 mb-8">Fill out this form if you would like reach out to the RCC team!</p>
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Your message will be emailed directly to the RCC team.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field data-invalid={!!errors.fullName}>
                  <FieldLabel htmlFor="fullName">Full Name (Required)</FieldLabel>
                  <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register('fullName')} />
                  <FieldError errors={errors.fullName ? [errors.fullName] : undefined} />
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email (Required)</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  <FieldError errors={errors.email ? [errors.email] : undefined} />
                </Field>

                <Field data-invalid={!!errors.subject}>
                  <FieldLabel htmlFor="subject">Subject (Required)</FieldLabel>
                  <Input id="subject" aria-invalid={!!errors.subject} {...register('subject')} />
                  <FieldError errors={errors.subject ? [errors.subject] : undefined} />
                </Field>

                <Field data-invalid={!!errors.message}>
                  <FieldLabel htmlFor="message">Message (Required)</FieldLabel>
                  <Textarea id="message" rows={4} aria-invalid={!!errors.message} {...register('message')} />
                  <FieldError errors={errors.message ? [errors.message] : undefined} />
                </Field>

                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>

                {status && (
                  <p
                    role="status"
                    className={status.type === 'success' ? 'text-sm text-green-700' : 'text-sm text-red-600'}
                  >
                    {status.message}
                  </p>
                )}

                <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
