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
import { Blog } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string({ required_error: "Blog title is required" }),
  description: z.string({ required_error: "Blog description is required" }),
  thumbnail: z.any(),
  status: z.string(),
});

type TFormData = z.infer<typeof schema>;

export default function BlogDetails() {
  const { slug } = useParams();

  const { data, isLoading } = useSWR(`/blog/show/slug/${slug}`);

  // form instance
  const form = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", thumbnail: "", status: "" },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const d = data?.data?.results as {
        title: string;
        description: string;
        thumbnail: string;
        status: string;
      };

      console.log({ d });

      form.reset({
        title: d?.title,
        description: d?.description,
        thumbnail: d?.thumbnail,
        status: d?.status,
      });
    }
  }, [isLoading, data]);

  // handle form submittion
  const onSubmit = (values: TFormData) => {
    console.log({ values });
  };

  if (isLoading) {
    return <div className="p-6"> Loading... </div>;
  }

  const blog = new Blog(data?.data?.results);

  return (
    <div className="flex-1 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-6">
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
                name="description"
                type="textEditor"
                label="Description"
                placeholder="Description"
              />
            </div>

            <div className="w-[300px]">
              <div className="rounded-xl border bg-white px-6 py-4">
                <FormField
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Status</FormLabel>
                      {field.value}

                      <Select
                        value={field.value || "active"}
                        onValueChange={field.onChange}
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

                <Button className="mt-6 w-full"> Save </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
