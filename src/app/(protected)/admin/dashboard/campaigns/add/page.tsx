"use client";

import { addNewProject } from "@/app/actions/admin/pages/campaigns";
import InputField from "@/components/forms/InputField";
import { SelectProjectCategory } from "@/components/forms/SelectProjectCategory";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { projectSchema } from "@/schemas/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type ProjectFormData = z.infer<typeof projectSchema>;

const FORM_FIELDS = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
  {
    name: "goal_amount",
    label: "Goal amount",
    type: "number",
    placeholder: "Enter goal amount",
  },
  {
    name: "collection_days",
    label: "Campaign days",
    type: "number",
    placeholder: "Enter campaign days",
  },

  {
    name: "volunteer_need",
    label: "Volunteer need",
    type: "number",
    placeholder: "Enter volunteer count",
  },

  {
    name: "is_emergency",
    label: "Emergency",
    type: "select",
    options: [
      { label: "Emergency", value: "1" },
      { label: "Not Emergency", value: "0" },
    ],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Write description here...",
    className: "min-h-[150px]",
  },
];

export default function AddCampaign() {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      category_id: "",
      title: "",
      description: "",
      thumbnail: undefined,
      goal_amount: 0,
      collection_days: 0,
      volunteer_need: 0,
      is_emergency: "1",
      status: "active",
    },
  });

  const onSubmit = async (formData: ProjectFormData) => {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof ProjectFormData;
      const value = formData[typedKey];

      // Check if the value is a File (Blob) or a number, and convert accordingly
      if (value instanceof File) {
        fd.append(typedKey, value);
      } else if (typeof value === "number") {
        fd.append(typedKey, value.toString()); // Convert number to string
      } else {
        fd.append(typedKey, value || ""); // Fallback for other types, ensures string
      }
    });

    try {
      const res = await addNewProject(fd);
      if (res.status === "success") {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full p-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 @container">
            <div className="col-span-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold"> Create Category </h2>
              <Button asChild>
                <Link href="/admin/dashboard/campaigns"> Back </Link>
              </Button>
            </div>
            <div className="col-span-12 flex flex-col gap-4 @3xl:col-span-6">
              {FORM_FIELDS.map((field) => (
                <InputField key={field.name} {...field} />
              ))}
            </div>

            <div className="col-span-12 @3xl:col-span-6">
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-500">
                        Category
                      </FormLabel>
                      <SelectProjectCategory
                        value={field.value}
                        onSelectChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-5">
                <InputField
                  name="thumbnail"
                  label="Thumbnail"
                  type="file"
                  className="border-black/20"
                />

                <p className="mt-3 text-sm text-gray-500">
                  Image size must have a 2:3 aspect ratio.
                </p>
              </div>

              <div className="flex items-center justify-start">
                <Button>Create</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
