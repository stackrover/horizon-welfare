"use client";

import InputField from "@/components/forms/InputField";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";

const formFields = [
  {
    name: "logo",
    label: "Logo",
    type: "file",
    className: "border-black/30",
  },
  { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

type PartnerFormProps<T extends z.ZodType<any, any>> = {
  formSchema: T;
  onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
  defaultValues?: any;
  preview?: string;
};

const formDefaultValues = {
  title: "",
  logo: undefined,
  status: "active",
};

export default function PartnerForm<T extends z.ZodType<any, any>>({
  formSchema,
  onSubmit,
  defaultValues = formDefaultValues,
  preview,
}: PartnerFormProps<T>) {
  type PartnerFormData = z.infer<typeof formSchema>;

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: PartnerFormData) => {
    onSubmit(values, form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-y-4 @container">
          {formFields.map((field) => (
            <InputField
              key={field.name}
              {...field}
              defaultPreview={field.type === "file" ? getImageURL(preview) : ""}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button>{form.formState.isSubmitting ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}
