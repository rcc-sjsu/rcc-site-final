import React from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  fullName: z.string(),
  preferredName: z.string(),
  familyName: z.string(),
  schoolEmail: z.email(),
  preferredEmail: z.email(),
  phone: z.string(),
  pronouns: z.string().optional(),
  major: z.string(),
  expectedGraduation: z.string(),
});

export default async function MembershipForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return <>
  </>
}
