"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EventCreateSchema } from "@/schemas/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEvent } from "@/app/actions/admin/events";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EventFormData = z.infer<typeof EventCreateSchema>;

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

export default function AddNewEvent() {
  const router = useRouter();

  // Form hook
  const form = useForm<EventFormData>({
    resolver: zodResolver(EventCreateSchema),
    defaultValues: {
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
    },
  });

  // Function to handle form submission
  const onSubmit = async (fd: EventFormData) => {
    const formData = new FormData();
    Object.entries(fd).forEach(([key, value]) => {
      formData.append(key, value || "");
    });

    const res = await createEvent(formData);

    if (res.status === "success") {
      toast.success(res.message);
      form.reset();
      router.push("/admin/dashboard/events");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold"> Create event </h1>
            <Button asChild>
              <Link href="/admin/dashboard/events"> Back </Link>
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-4 @container">
            {EventFormFields.map((group) => (
              <div
                key={group.group}
                className="col-span-12 flex flex-col gap-4 @3xl:col-span-6"
              >
                {group.items.map((field) => (
                  <InputField key={field.name} {...field} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button> Create </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
