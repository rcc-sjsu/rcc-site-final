'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ArrowUpRightIcon, MailIcon } from 'lucide-react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import PageHero from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { contactFormSchema, type ContactFormValues } from '@/lib/contact';

const channels = [
  { label: 'Email', value: 'rcc.sjsu@gmail.com', href: 'mailto:rcc.sjsu@gmail.com', icon: MailIcon },
  { label: 'Discord', value: 'Join our community', href: 'https://discord.com/invite/RGG9dMw4Rc', icon: FaDiscord },
  { label: 'Instagram', value: '@rcc.sjsu', href: 'https://www.instagram.com/rcc.sjsu/', icon: FaInstagram },
  { label: 'LinkedIn', value: 'See our work', href: 'https://www.linkedin.com/company/rcc-sjsu/', icon: FaLinkedin },
];

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
    <div style={{ overflow: 'clip' }}>
      <PageHero
        badge="Contact"
        title="Let's"
        accent="talk."
        description="Students, faculty, and industry partners: fill out the form if you'd like to reach out to the RCC team!"
        image="/images/rcc-case-comp.png"
        className="lg:min-h-[52svh]"
      />

      <section className="bg-muted py-16 sm:py-24" aria-labelledby="contact-heading">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 font-mono text-sm tracking-widest text-highlight uppercase">
              <span aria-hidden className="size-2 bg-highlight" />
              Other ways to reach us
            </span>
            <ul className="flex flex-col gap-3">
              {channels.map((channel) => {
                const isEmail = channel.href.startsWith('mailto:');
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className="group flex items-center gap-4 rounded-xl bg-card p-4 text-foreground ring-1 ring-foreground/10 transition-all duration-200 ease-hover outline-none hover:ring-primary/30 hover:shadow-lg hover:shadow-rcc-violet/10 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <channel.icon className="size-5" aria-hidden />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-xs text-muted-foreground">{channel.label}</span>
                        <span className="truncate text-base font-semibold">{channel.value}</span>
                      </span>
                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-4 text-muted-foreground transition-[color,translate] duration-300 ease-cta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-highlight"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-full">
            <Card className="gap-6 py-6 sm:py-8">
              <CardHeader className="sm:px-8">
                <CardTitle id="contact-heading" className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  Send us a message
                </CardTitle>
                <CardDescription>Your message will be emailed directly to the RCC team.</CardDescription>
              </CardHeader>
              <CardContent className="sm:px-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Field data-invalid={!!errors.fullName}>
                      <FieldLabel htmlFor="fullName">Full Name (Required)</FieldLabel>
                      <Input
                        id="fullName"
                        autoComplete="name"
                        aria-invalid={!!errors.fullName}
                        {...register('fullName')}
                      />
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

                    <Button
                      type="submit"
                      className="mt-2 h-12 w-full font-mono text-sm tracking-wide uppercase"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
