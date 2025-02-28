"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { getImageURL } from "@/lib/utils";

const EventFormFields = [
  {
    group: "group1",
    items: [
      {
        name: "thumbnail",
        type: "file",
        label: "Thumbnail",
        className: "border-black/20",
      },
      { name: "project_id", type: "selectProject", label: "Project" },
      { name: "title", type: "text", label: "Title" },
      { name: "location", type: "text", label: "Location" },
      { name: "map_link", type: "url", label: "Map link" },
      { name: "meet_link", type: "url", label: "Meet link" },
      { name: "zoom_link", type: "url", label: "Zoom link" },
    ],
  },
  {
    group: "group2",
    items: [
      {
        name: "schedule_date",
        type: "date",
        label: "Schedule date",
      },
      {
        name: "schedule_time",
        type: "time",
        label: "Schedule time",
        className: "w-full appearance-none",
      },
      { name: "description", type: "textEditor", label: "Description" },
    ],
  },
];

type EventFormProps<T extends z.ZodType<any, any>> = {
  formSchema: T;
  onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
  defaultValues?: any;
  preview?: string;
};

const formDefaultValues = {
  project_id: "",
  title: "",
  description: "",
  thumbnail: undefined,
  location: "",
  map_link: "",
  meet_link: "",
  zoom_link: "",
  schedule_date: "",
  schedule_time: "",
  status: "upcoming",
};

export default function EventForm<T extends z.ZodType<any, any>>({
  formSchema,
  onSubmit,
  defaultValues = formDefaultValues,
  preview,
}: EventFormProps<T>) {
  type EventFormData = z.infer<typeof formSchema>;

  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: EventFormData) => {
    onSubmit(values, form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 @container">
          {EventFormFields.map((group) => (
            <div
              key={group.group}
              className="col-span-12 flex flex-col gap-4 @3xl:col-span-6"
            >
              {group.items.map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  defaultPreview={
                    field.type === "file" ? getImageURL(preview) : ""
                  }
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button>{form.formState.isSubmitting ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Form>
  );
}
