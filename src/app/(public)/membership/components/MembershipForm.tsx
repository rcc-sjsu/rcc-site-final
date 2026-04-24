"use client";
import React from 'react';
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  fullName: z.string(),
  preferredName: z.string(),
  familyName: z.string(),
  schoolEmail: z.email(),
  preferredEmail: z.email(),
  phone: z.string(),
  pronouns: z.string().optional(),
  major: z.string(),
  expectedGraduation: z.date(),
});

type Schema = z.infer<typeof formSchema>

type GraduationDate = {
  value: Date
  label: string
}
const graduationDates: GraduationDate[] = function () {
  let today = new Date();
  let year = today.getFullYear();

  let years = Array.from({ length: 5 }, (_val, idx) => year + idx)
  let semesters = ["Spring", "Fall"]

  let items = years.flatMap(year => semesters.map(sem => ({
    label: `${sem} ${year}`,
    value: new Date(year, sem == "Spring" ? 4 : 11)
  })));

  // Rotate if the Spring semester is already over for this calendar .
  if (year > 5) {
    items = items.splice(1);
    items.push({
      label: `Spring ${year + 5}`,
      value: new Date(year + 5, 4)
    });
  }

  return items
}();

export default function MembershipForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: Schema) {
    console.log(data)
  }
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          New Members Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="student-info-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Jane Doe"
                  />
                  <FieldDescription>
                    Please provide your full name
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="preferredName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Preferred Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Jane"
                  />
                  <FieldDescription>
                    How would you like to be called?
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="familyName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Family Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Doe"
                  />
                  <FieldDescription>
                    What is your family name?
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="pronouns"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Pronouns
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="she/her"
                  />
                  <FieldDescription>
                    What are your pronouns?
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldSeparator />

            <Controller
              name="schoolEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    SJSU Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="jane.doe@sjsu.edu"
                  />
                  <FieldDescription>
                    Please provide your school email.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="preferredEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Preferred Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="jane.doe@gmail.com"
                  />
                  <FieldDescription>
                    Please provide your preferred email for newsletters, events, and opportunities.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Mobile Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="(408) 123-4567"
                  />
                  <FieldDescription>
                    If you'd like to receive communications via text, please provide your mobile phone number.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldSeparator />

            <Controller
              name="major"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Major
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Graphics Design"
                  />
                  <FieldDescription>
                    What is your major?
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="expectedGraduation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Expected Graduation
                  </FieldLabel>
                  <Combobox
                    items={graduationDates}
                  >
                    <ComboboxInput placeholder={graduationDates[0].label} />
                    <ComboboxContent>
                      <ComboboxEmpty>No valid dates found.</ComboboxEmpty>
                      <ComboboxList>
                        {(graduationDate) => (
                          <ComboboxItem key={graduationDate.value} value={graduationDate}>
                            {graduationDate.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="student-info-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card >
  )
}
