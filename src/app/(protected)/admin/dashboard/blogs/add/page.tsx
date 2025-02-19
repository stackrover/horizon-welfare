"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addBlog } from "@/app/actions/admin/blogs";
import { useEffect } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import SelectBlogCategory from "@/components/forms/SelectBlogCategory";
import { BlogCategory } from "@/data/blogs/blog-category";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string({ required_error: "Blog title is required" }),
  author_name: z.string({ required_error: "Blog author name is required" }),
  slug: z.string({ required_error: "Slug is required" }),
  description: z.string({ required_error: "Blog description is required" }),
  thumbnail: z.any(),
  category_id: z.string({ required_error: "Category is required" }),
  status: z.string(),
});

type TFormData = z.infer<typeof schema>;

export default function BlogDetails() {
  const auth = useSession();
  const router = useRouter();

  // form instance
  const form = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: "",
      status: "active",
      author_name: auth?.data?.user?.name || "",
      category_id: "",
    },
  });

  const onSubmit = async (formData: TFormData) => {
    const fd = new FormData();

    // Populate the FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof TFormData];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    try {
      const response = await addBlog(fd);
      if (response.status === "success") {
        toast.success(response.message);
        router.push("/admin/dashboard/blogs");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const title = form.watch("title");

  useEffect(() => {
    if (title && !form.getValues("slug")) {
      form.setValue("slug", _.kebabCase(title));
    }
  }, [title]);

  return (
    <div className="flex-1 p-6 @container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) =>
            console.log({ error }),
          )}
        >
          <div className="flex flex-col gap-y-6 @5xl:flex-row @5xl:gap-x-6">
            <div className="flex h-fit flex-1 flex-col space-y-6 rounded-xl border bg-white px-6 py-4">
              <InputField
                name="thumbnail"
                type="file"
                label="Thumbnail"
                placeholder="Thumbnail"
                className="h-[300px] border-solid border-black/15 [&_div]:border"
              />

              <InputField
                name="title"
                type="text"
                label="Title"
                placeholder="Title"
              />

              <InputField
                name="slug"
                type="text"
                label="Slug"
                placeholder="Slug"
              />

              <InputField
                name="author_name"
                type="text"
                label="Author name"
                placeholder="Author name"
              />

              <InputField
                name="description"
                type="textEditor"
                label="Description"
                placeholder="Description"
              />
            </div>

            <div className="w-full @5xl:w-[300px]">
              <div className="flex flex-row items-stretch gap-6 rounded-xl border bg-white px-6 py-4 @5xl:flex-col">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Status</FormLabel>
                      {field.value}

                      <Select
                        value={field.value || "active"}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log({ value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active"> Publish </SelectItem>
                          <SelectItem value="inactive"> Draft </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel> Category </FormLabel>
                      {field.value}

                      <SelectBlogCategory
                        value={field.value}
                        onSelectChange={(cat: BlogCategory) =>
                          field.onChange(cat.getId().toString())
                        }
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" className="mt-6 w-[180px] @5xl:w-full">
                  {form.formState.isSubmitting ? "Loading..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
