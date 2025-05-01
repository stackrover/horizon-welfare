"use client";

import { updateBlog } from "@/app/actions/admin/blogs";
import InputField from "@/components/forms/InputField";
import SelectBlogCategory from "@/components/forms/SelectBlogCategory";
import BlogCategoryForm from "@/components/page-sections/admin/blogs/BlogCategoryForm";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Blog } from "@/data";
import { BlogCategory } from "@/data/blogs/blog-category";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  title: z.string({ required_error: "Blog title is required" }),
  author_name: z.string({ required_error: "Blog author name is required" }),
  description: z.string({ required_error: "Blog description is required" }),
  thumbnail: z.any(),
  category_id: z.string({ required_error: "Category is required" }),
  status: z.string(),
});

type TFormData = z.infer<typeof schema>;

export default function BlogDetails() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { slug } = useParams();
  const { data, isLoading } = useSWR(`/blog/show/slug/${slug}`);
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refresh,
  } = useSWR("/blog/category/list");

  // form instance
  const form = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      status: "active",
      author_name: "",
      category_id: "",
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const d = data?.data?.results as {
        title: string;
        description: string;
        thumbnail: string;
        status: string;
        author_name: string;
        category_id: string;
      };

      form.reset({
        title: d?.title,
        description: d?.description,
        status: d?.status,
        author_name: d?.author_name,
        category_id: d?.category_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  // handle form submission
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
      const response = await updateBlog(fd, data?.data?.results?.id);
      if (response.status === "success") {
        toast.success(response.message);
        router.push("/admin/dashboard/blogs");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-6"> Loading... </div>;
  }

  const blog = new Blog(data?.data?.results);

  return (
    <div className="flex-1 p-6 @container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-6 @5xl:flex-row @5xl:gap-x-6">
            <div className="flex h-fit flex-1 flex-col space-y-6 rounded-xl border bg-white px-6 py-4">
              <InputField
                name="thumbnail"
                type="file"
                label="Thumbnail"
                placeholder="Thumbnail"
                className="h-[300px] border-solid border-black/15 [&_div]:border"
                defaultPreview={getImageURL(blog.getThumbnail())}
              />

              <InputField
                name="title"
                type="text"
                label="Title"
                placeholder="Title"
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

                      <Select
                        value={field.value || "active"}
                        onValueChange={(value) => {
                          field.onChange(value);
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
                      <div className="flex items-center justify-between">
                        <FormLabel> Category </FormLabel>
                        <button
                          onClick={() => setOpen(true)}
                          type="button"
                          className="rounded-md bg-primary-light p-1 text-base-0 hover:bg-primary"
                        >
                          <IconPlus size={18} />
                        </button>
                      </div>

                      <SelectBlogCategory
                        value={field.value}
                        onSelectChange={(cat: BlogCategory) =>
                          field.onChange(cat.getId().toString())
                        }
                        data={categoryData}
                        isLoading={categoryLoading}
                        refresh={refresh}
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

      <Dialog open={open} onOpenChange={(op) => setOpen(op)}>
        <BlogCategoryForm refresh={refresh} />
      </Dialog>
    </div>
  );
}
