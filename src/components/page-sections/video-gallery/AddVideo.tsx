import { addNewVideoOnGallery } from "@/app/actions/admin/pages/video-gallery";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// form schema
const formSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  youtube_link: z
    .string({ required_error: "YouTube link is required" })
    .url("Invalid url."),
});

type FormData = z.infer<typeof formSchema>;

const fields = [
  { name: "title", type: "text", label: "Title", placeholder: "Video Title" },
  {
    name: "youtube_link",
    type: "url",
    label: "YouTube Link",
    placeholder: "YouTube link",
  },
];

export default function AddVideo() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      youtube_link: "",
    },
  });

  // hanlde form submittion
  const onSubmit = async (values: FormData) => {
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("youtube_link", values.youtube_link);

    try {
      const res = await addNewVideoOnGallery(fd);
      if (res.status !== "success") {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center border border-dashed border-black/50 hover:bg-black/10">
          <IconPlus size={48} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
          <DialogDescription>Add a new video</DialogDescription>
        </DialogHeader>

        <Separator className="bg-black/15" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            {fields.map((field) => (
              <InputField key={field.name} {...field} />
            ))}

            <div className="grid grid-cols-[1fr_150px]">
              <Button type="submit" className="col-start-2">
                {form.formState.isSubmitting ? "Processing..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
