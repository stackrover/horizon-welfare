"use client";

import { createEvent } from "@/app/actions/admin/events";
import EventForm from "@/components/page-sections/admin/events/EventForm";
import { Button } from "@/components/ui/button";
import { EventCreateSchema } from "@/schemas/eventSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type EventFormData = z.infer<typeof EventCreateSchema>;

export default function AddNewEvent() {
  const router = useRouter();

  // Function to handle form submission
  const onSubmit = async (fd: EventFormData, form: UseFormReturn) => {
    const formData = new FormData();
    Object.entries(fd).forEach(([key, value]) => {
      if (key === "documents" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append("documents[]", file);
          }
        });
      } else {
        formData.append(key, value as any);
      }
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold"> Create event </h1>
        <Button asChild>
          <Link href="/admin/dashboard/events"> Back </Link>
        </Button>
      </div>
      <EventForm
        refresh={() => {}}
        formSchema={EventCreateSchema}
        onSubmit={onSubmit as any}
      />
    </div>
  );
}
