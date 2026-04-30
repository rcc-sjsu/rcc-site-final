"use client";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError, FieldSeparator, FieldSet, FieldLegend } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxEmpty, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { Accordion } from "@base-ui/react";
const formSchema = z.object({
  fullName: z.string(),
  preferredName: z.string(),
  familyName: z.string(),
  schoolEmail: z.email(),
  preferredEmail: z.email().optional(),
  phone: z.string().regex(/^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/).optional(),
  pronouns: z.string().optional(),
  major: z.string(),
  expectedGraduation: z.string(),
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
  <> 
    <Accordion.Root
  className="flex flex-col items-center gap-4 w-full max-w-md mx-auto"
  type="single"
  collapsible
>
  <Accordion.Item className="w-full border rounded-lg">
    <Accordion.Header>
      <Accordion.Trigger className="w-full text-center py-3 font-semibold">
        Web Dev Ambassador
      </Accordion.Trigger>
    </Accordion.Header>

    <Accordion.Panel className="overflow-hidden transition-all duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
      <div className="text-center pb-3">
        Does Web Dev
      </div>
    </Accordion.Panel>
  </Accordion.Item>

  <Accordion.Item className="w-full border rounded-lg">
    <Accordion.Header>
      <Accordion.Trigger className="w-full text-center py-3 font-semibold">
        Graphic Design
      </Accordion.Trigger>
    </Accordion.Header>

    <Accordion.Panel className="overflow-hidden transition-all duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-40">
      <div className="text-center pb-3">
        Something Graphic Design Description
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="px-4 py-2">
          New Members Registration
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form id="student-info-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="p-4">
            <FieldLegend>Biographical Information</FieldLegend>

            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <FieldDescription>
                      Please provide your full name
                    </FieldDescription>

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
                name="preferredName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Preferred Name
                    </FieldLabel>
                    <FieldDescription>
                      How would you like to be called?
                    </FieldDescription>

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
                name="familyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Family Name</FieldLabel>
                    <FieldDescription>
                      What is your family name?
                    </FieldDescription>

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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Pronouns</FieldLabel>
                    <FieldDescription>
                      What are your pronouns?
                    </FieldDescription>

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
          </FieldSet>

          <FieldSeparator className="mb-2" />

          <FieldSet className="p-4">
            <FieldLegend>Contact Information</FieldLegend>

            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="schoolEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>SJSU Email</FieldLabel>
                    <FieldDescription>
                      Please provide your school email.
                    </FieldDescription>

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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mobile Phone</FieldLabel>
                    <FieldDescription>
                      If you'd like to receive communications via text, please
                      provide your mobile phone number.
                    </FieldDescription>

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
                name="preferredEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="sm:col-span-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Preferred Email
                    </FieldLabel>
                    <FieldDescription>
                      Please provide your preferred email for newsletters,
                      events, and opportunities.
                    </FieldDescription>

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

            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="major"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Major</FieldLabel>
                    <FieldDescription>
                      What is your major?
                    </FieldDescription>

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Graphic Design"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    <FieldDescription>
                      Which semester do you anticipate graduating?
                    </FieldDescription>

                    <Combobox
                      items={graduationDates}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <ComboboxInput placeholder={graduationDates[0].label} />

                      <ComboboxContent>
                        <ComboboxEmpty>
                          No valid dates found.
                        </ComboboxEmpty>

                        <ComboboxList>
                          {(graduationDate) => (
                            <ComboboxItem
                              key={graduationDate.value}
                              value={graduationDate.value}
                            >
                              {graduationDate.label}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter>
        <Field>
          <Button type="submit" form="student-info-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  </>
);
}