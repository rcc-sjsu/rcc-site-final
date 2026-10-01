import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254, 'Email address is too long.'),
  subject: z.string().trim().min(1, 'Please enter a subject.').max(150, 'Subject is too long.'),
  message: z.string().trim().min(1, 'Please enter a message.').max(5_000, 'Message is too long.'),
  website: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
