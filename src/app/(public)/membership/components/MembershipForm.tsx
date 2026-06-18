"use client";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError, FieldSeparator, FieldSet, FieldLegend } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  // These must be snake_case to match Postgres column names.
  full_name: z.string(),
  preferred_name: z.string(),
  family_name: z.string(),
  school_email: z.email(),
  preferred_email: z.email().optional(),
  phone: z.string().regex(/^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/).optional(),
  pronouns: z.string().optional(),
  major: z.string(),
  expected_graduation: z.string(),
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

const supabase = createClient();

export default function MembershipForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // TODO: Change these to empty values once the DB integration works.
      full_name: "Jane Doe",
      preferred_name: "Jane",
      family_name: "Doe",
      school_email: "jane.doe@sjsu.edu",
      preferred_email: "jane.doe@gmail.edu",
      phone: "(408) 123-4567",
      pronouns: "she/her",
      major: "Graphics Design",
      expected_graduation: "Fall 2030",
    }
  });

  async function onSubmit(formData: Schema) {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      console.error(result.error);
      alert(result.error)
      return
    }

    const { error } = await supabase
      .from("students")
      .insert(result.data);
    if (error) {
      alert(`Error ${error.code}: ${error.message}`);
      console.error(error);
    }
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    />

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
                  <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
                    <div className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Mobile Phone
                      </FieldLabel>
                    </div>


                    <div className="flex-1">
                      <FieldDescription>
                        If you'd like to receive communications via text, please provide your mobile phone number.
                      </FieldDescription>
                    </div>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="(408) 123-4567"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form >
      </CardContent >
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
