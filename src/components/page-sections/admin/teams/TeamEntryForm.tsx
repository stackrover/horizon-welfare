"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const TeamEntryFormFields = [
  {
    name: "image",
    type: "file",
    label: "Avatar",
    className: "border-black/20",
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Team member name.",
  },
  {
    name: "position",
    type: "text",
    label: "Position",
    placeholder: "Team meamber designation.",
  },
  {
    name: "facebook_link",
    type: "url",
    label: "Facebook",
    placeholder: "https://www.facebook.com/stackrover",
  },
  {
    name: "twitter_link",
    type: "url",
    label: "Twitter",
    placeholder: "https://www.twitter.com/stackrover",
  },
  {
    name: "linkedin_link",
    type: "url",
    label: "Linkedin",
    placeholder: "https://www.linkedin.com/in/stackrover",
  },
];

type TeamEntryFormProps<T extends z.ZodType<any, any>> = {
  formSchema: T;
  onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => Promise<any>;
  defaultValues?: any;
  preview?: string;
};

const formDefaultValues = {
  name: "",
  position: "",
  image: "",
  facebook_link: "",
  twitter_link: "",
  linkedin_link: "",
  status: "active",
};

export default function TeamEntryForm<T extends z.ZodType<any, any>>({
  formSchema,
  onSubmit,
  defaultValues = formDefaultValues,
  preview,
}: TeamEntryFormProps<T>) {
  type TeamEntryFormData = z.infer<typeof formSchema>;

  const form = useForm<TeamEntryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: TeamEntryFormData) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) =>
      fd.append(key, values[key as keyof TeamEntryFormData] || ""),
    );

    await onSubmit(fd, form);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, (error) =>
          console.log({ error }),
        )}
        className="p-1"
      >
        <div className="flex flex-col gap-y-4 @container">
          {TeamEntryFormFields.map((field) => (
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
