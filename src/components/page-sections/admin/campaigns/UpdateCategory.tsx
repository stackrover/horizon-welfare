"use client";

import { updateCategory } from "@/app/actions/admin/pages/campaigns";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { STATUS } from "@/data/projects/category";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  slug: z.string({ required_error: "Slug is required." }),
  icon: z.instanceof(File).optional(),
  status: z.enum(["active", "inactive", "pending"]),
});

type TFormData = z.infer<typeof formSchema>;

const FORM_FIELDS = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Category title",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "Write a unique slug",
  },
  // { name: "icon", label: "Icon", type: "file" },
];

type UpdateCategoryProps = {
  children: React.ReactNode | string;
  preview: string;
  title: string;
  slug: string;
  status: STATUS;
  id: number;
  refresh: () => void;
};

export const UpdateCategory = ({
  children,
  preview,
  title,
  slug,
  status,
  id,
  refresh,
}: UpdateCategoryProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      slug,
      icon: undefined,
      status,
    },
  });

  // hadnle slug
  const categoryTitle = form.watch("title");

  useEffect(() => {
    if (categoryTitle) {
      form.setValue("slug", _.kebabCase(categoryTitle));
    }
  }, [categoryTitle, form]);

  // handle form submission
  const onSubmit = async (formData: TFormData) => {
    const fd = new FormData();
    Object.keys(formData).forEach((key) =>
      fd.append(key, formData[key as keyof TFormData] || ""),
    );

    const res = await updateCategory(fd, id);
    if (res.status === "success") {
      toast.success(res.message);
      setOpen(false);
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Update Category </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Form {...form}>
          <form>
            <div className="flex flex-col gap-y-4">
              {FORM_FIELDS.map((field) => (
                <InputField key={field.name} {...field} />
              ))}
              <InputField
                name="icon"
                type="file"
                defaultPreview={preview}
                required
              />

              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                {form.formState.isSubmitting ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
