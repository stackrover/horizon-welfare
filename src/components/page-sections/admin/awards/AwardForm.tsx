"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AwardFormProps } from "@/types/awardFormProps.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formFields = [
  { name: "title", type: "text", label: "Title" },
  { name: "venue", type: "text", label: "Venue" },
  { name: "year", type: "text", label: "Year" },
  { name: "logo", type: "file", label: "Logo", className: "border-black/20" },
];

export default function AwardForm<T extends z.ZodType<any, any>>({
  formSchema,
  defaultValues,
  preview,
  onSubmit,
}: AwardFormProps<T>) {
  type AwardFormData = z.infer<T>;

  const form = useForm<AwardFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      year: "",
      venue: "",
      status: "active",
      ...defaultValues,
      logo: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
      >
        {formFields.map((field) => (
          <InputField key={field.name} {...field} defaultPreview={preview} />
        ))}

        <Button>{form.formState.isSubmitting ? "Saving..." : "Save"}</Button>
      </form>
    </Form>
  );
}
