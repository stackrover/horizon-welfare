"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewCategory } from "../../app/actions/admin/pages/campaigns";
import toast from "react-hot-toast";
import _ from "lodash";

const formSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  slug: z.string({ required_error: "Slug is required." }),
  icon: z.instanceof(File),
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
  { name: "icon", label: "Icon", type: "file" },
];

export const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      icon: undefined,
      status: "active",
    },
  });

  // hadnle slug
  const title = form.watch("title");

  useEffect(() => {
    if (title) {
      form.setValue("slug", _.kebabCase(title));
    }
  }, [title, form]);

  // handle form submission
  const onSubmit = async (formData: TFormData) => {
    const fd = new FormData();
    Object.keys(formData).forEach((key) =>
      fd.append(key, formData[key as keyof TFormData] || ""),
    );

    const res = await createNewCategory(fd);
    if (res.status === "success") {
      toast.success(res.message);
      setOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> Add New Category </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Form {...form}>
          <form>
            <div className="flex flex-col gap-y-4">
              {FORM_FIELDS.map((field) => (
                <InputField key={field.name} {...field} />
              ))}

              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                {form.formState.isSubmitting ? "Loading..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
