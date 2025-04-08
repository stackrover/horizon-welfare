"use client";

import { updateEvent } from "@/app/actions/admin/events";
import EventForm from "@/components/page-sections/admin/events/EventForm";
import { Button } from "@/components/ui/button";
import { EventDetail } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { EventUpdateSchema } from "@/schemas/eventSchema";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type EventFormData = z.infer<typeof EventUpdateSchema>;

export default function EditEvent() {
  const params = useParams() as { eventId: string };

  const { data, isLoading, refresh } = useSWR(`/event/show/${params.eventId}`);

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

    const res = await updateEvent(formData, data?.data?.results?.id);

    if (res.status === "success") {
      toast.success(res.message);
      form.reset();
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  const event = new EventDetail(data?.data?.results);

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold"> Edit Event </h1>
        <Button asChild>
          <Link href="/admin/dashboard/events"> Back </Link>
        </Button>
      </div>

      <EventForm
        formSchema={EventUpdateSchema}
        onSubmit={onSubmit as any}
        defaultValues={{
          project_id: event.projectId?.toString() || "",
          title: event.title || "",
          description: event.description || "",
          thumbnail: undefined,
          location: event.location || "",
          map_link: event.mapLink || "",
          meet_link: event.meetLink || "",
          zoom_link: event.zoomLink || "",
          schedule_date: event.scheduleDate || "",
          schedule_time: event.scheduleTime || "",
          status: event.status,
          documents: [],
        }}
        preview={event.thumbnail}
        documents={event.documents || []}
        refresh={refresh}
      />
    </div>
  );
}
