import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(100, 'Name is too long.'),
  email: z.string().trim().min(1, 'Email is required.').email('Please enter a valid email.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message should be at least 10 characters.')
    .max(2000, 'Message is too long.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;