"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError, FieldSeparator, FieldSet, FieldLegend } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { createClient } from "@/lib/supabase/client";

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

const validGraduationLabels = graduationDates.map(d => d.label);

const optionalString = z.string().transform((value) => value || undefined);

const sjsuEmail = z.union([z.literal(""), z.string().regex(/^[A-Za-z]+\.[A-Za-z]+\d*@sjsu\.edu$/, {
  message: "Please provide an SJSU email like first.last01@sjsu.edu.",
})])
  .transform((value) => value || undefined);

const optionalPhone = z.union([
  z.literal(""),
  z.string().regex(/^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/),
]).transform((value) => value || undefined);

const formSchema = z.object({
  // These must be snake_case to match Postgres column names.
  full_name: z.string().min(1, "Please provide your full name."),
  preferred_name: z.string().min(1, "How would you like to be called?"),
  family_name: optionalString,
  school_email: sjsuEmail,
  preferred_email: z.email("Please provide a valid preferred email."),
  phone: optionalPhone,
  pronouns: optionalString,
  major: optionalString,
  expected_graduation: z
    .string({ message: "Please select a graduation date." })
    // Validate: Check if the string the Combobox passed matches one of our labels
    .refine((val) => validGraduationLabels.includes(val), {
      message: "Invalid graduation date selected.",
    })
    // Transform: Take that valid label, find it in our array, and return the Date object
    .transform((val) => {
      const match = graduationDates.find((d) => d.label === val);
      // We can use '!' because .refine() already guaranteed the match exists
      return match!.value;
    }),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match.",
});

type FormOutput = z.output<typeof formSchema>

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const supabase = createClient();

const fieldErrorClassName = "min-h-5";

export default function MembershipForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      preferred_name: "",
      family_name: "",
      school_email: "",
      preferred_email: "",
      phone: "",
      pronouns: "",
      major: "",
      expected_graduation: "",
      password: "",
      confirm_password: "",
    }
  });

  async function onSubmit(formData: FormOutput) {
    setSubmitError(null);
    setSubmitSuccess(false);

    const { password, confirm_password: _confirmPassword, expected_graduation, ...profile } = formData;
    const { error } = await supabase.auth.signUp({
      email: formData.preferred_email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/membership`,
        data: {
          ...profile,
          expected_graduation: formatDate(expected_graduation),
        },
      },
    });

    if (error) {
      setSubmitError(error.message);
      return;
    }

    form.reset();
    setSubmitSuccess(true);
  }
  return (
    <Card className="mx-auto min-w-95 sm:max-w-6xl">
      <CardHeader>
        <CardTitle className="px-4 py-2">
          New Members Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="student-info-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="p-4">
            <FieldLegend>Biographical Information</FieldLegend>
            <FieldGroup className="sm:grid grid-cols-2 gap-4">
              <Controller
                name="full_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Please provide your full name
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Jane Doe"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="preferred_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Preferred Name
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        How would you like to be called?
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Jane"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="family_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Family Name
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        What is your family name?
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Doe"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="pronouns"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Pronouns
                      </FieldLabel>
                    </div>


                    <div className="flex-1">
                      <FieldDescription>
                        What are your pronouns?
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="she/her"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet >

          <FieldSeparator className="mb-2" />

          <FieldSet className="p-4">
            <FieldLegend>Contact Information</FieldLegend>
            <FieldGroup className="sm:grid grid-cols-2">
              <Controller
                name="school_email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        SJSU Email
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Please provide your school email.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="jane.doe@sjsu.edu"
                      type="email"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Mobile Phone
                      </FieldLabel>
                    </div>


                    <div className="flex-1">
                      <FieldDescription>
                        If you&apos;d like to receive communications via text, please provide your mobile phone number.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="(408) 123-4567"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="preferred_email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="col-span-2 flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Preferred Email
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Please provide your preferred email for newsletters, events, and opportunities.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="jane.doe@gmail.com"
                      type="email"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Password
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Create a password for your member account.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="password"
                      autoComplete="new-password"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="confirm_password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Re-enter your password to confirm it.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="password"
                      autoComplete="new-password"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator className="mb-2" />

          <FieldSet className="p-4">
            <FieldLegend>Academic Information</FieldLegend>
            <FieldGroup className="grid grid-cols-2 content-center">
              <Controller
                name="major"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">

                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Major
                      </FieldLabel>
                    </div>


                    <div className="flex-1">
                      <FieldDescription>
                        What is your major?
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Graphics Design"
                    />

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />

              <Controller
                name="expected_graduation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Expected Graduation
                      </FieldLabel>
                    </div>

                    <div className="flex-1">
                      <FieldDescription>
                        Which semester do you anticipate graduating?
                      </FieldDescription>
                    </div>

                    <Combobox
                      items={graduationDates}
                      onValueChange={field.onChange}
                    >
                      <ComboboxInput placeholder={graduationDates[0].label} />
                      <ComboboxContent>
                        <ComboboxEmpty>No valid dates found.</ComboboxEmpty>
                        <ComboboxList>
                          {(graduationDate) => (
                            <ComboboxItem key={graduationDate.label} value={graduationDate.label}>
                              {graduationDate.label}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    <div className={fieldErrorClassName}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form >
      </CardContent >
      <CardFooter>
        <Field className="px-4">
          {submitError && (
            <FieldError>{submitError}</FieldError>
          )}

          {submitSuccess && (
            <FieldDescription>
              Account created. Please check your preferred email to confirm your membership account.
            </FieldDescription>
          )}

          <Button type="submit" form="student-info-form" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </Field>
      </CardFooter>
    </Card >
  )
}
