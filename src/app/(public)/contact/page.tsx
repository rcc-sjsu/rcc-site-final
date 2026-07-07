'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';

type SubmitState = 'idle' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: '', email: '', message: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Request failed');
      setSubmitState('success');
      reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitState('error');
    }
  }

  return (
    <main className="flex flex-col items-center px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Fill out this form if you would like reach out to the RCC team!
      </p>
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We usually reply within a few business days.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                <Field data-invalid={!!errors.fullName}>
                  <FieldLabel htmlFor="fullName">Full Name (Required)</FieldLabel>
                  <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register('fullName')} />
                  <FieldError errors={errors.fullName ? [errors.fullName] : undefined} />
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email (Required)</FieldLabel>
                  <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
                  <FieldError errors={errors.email ? [errors.email] : undefined} />
                </Field>

                <Field data-invalid={!!errors.message}>
                  <FieldLabel htmlFor="message">Message (Required)</FieldLabel>
                  <Textarea id="message" rows={4} aria-invalid={!!errors.message} {...register('message')} />
                  <FieldError errors={errors.message ? [errors.message] : undefined} />
                </Field>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                  {isSubmitting ? 'Sending…' : 'Submit'}
                </Button>

                {submitState === 'success' && (
                  <p role="status" className="text-sm text-center text-green-600">
                    Thanks for reaching out! We&apos;ll get back to you soon.
                  </p>
                )}
                {submitState === 'error' && (
                  <p role="alert" className="text-sm text-center text-destructive">
                    Something went wrong sending your message. Please try again.
                  </p>
                )}
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}