import { addBlogCategory } from "@/app/actions/admin/blogs";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import { z } from "zod";

export const blogCategoryCreateFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

type TFormData = z.infer<typeof blogCategoryCreateFormSchema>;

export default function BlogCategoryForm({ refresh }: { refresh: () => void }) {
  const { mutate } = useSWRConfig();
  const form = useForm<TFormData>({
    resolver: zodResolver(blogCategoryCreateFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      status: "active",
    },
  });

  async function onSubmit(formData: TFormData) {
    console.log("submitting add category");
    const fd = new FormData();
    // Populate the FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof TFormData];
      if (typeof value === "string") {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    const response = await addBlogCategory(fd);

    if (response.status === "success") {
      toast.success(response.message);
      refresh();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Blog Category</DialogTitle>
        <DialogDescription className="hidden" />
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
