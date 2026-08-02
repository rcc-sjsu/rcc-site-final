'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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

const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Please enter your name.'),
  subject: z.string().min(1, 'Please enter a subject.'),
  message: z.string().min(1, 'Please enter a message.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: '', subject: '', message: '' },
  });

  function onSubmit(values: ContactFormValues) {
    const body = `From: ${values.fullName}\n\n${values.message}`;
    const mailtoUrl = `mailto:rcc.sjsu@gmail.com?subject=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
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
            <CardDescription>
              This will open your email client with your message ready to send.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field data-invalid={!!errors.fullName}>
                  <FieldLabel htmlFor="fullName">Full Name (Required)</FieldLabel>
                  <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register('fullName')} />
                  <FieldError errors={errors.fullName ? [errors.fullName] : undefined} />
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

                <Button type="submit" className="w-full mt-2">
                  Submit
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}