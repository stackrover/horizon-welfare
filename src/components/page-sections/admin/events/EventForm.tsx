"use client";

import {
  deleteEventDocument,
  deleteEventImage,
} from "@/app/actions/admin/events";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconFileTypePdf, IconLoader2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Path, PathValue, useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

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

type EventFormProps<T extends z.ZodType<any, any>> = {
  formSchema: T;
  onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
  defaultValues?: any;
  preview?: string;
  documents?: any[];
  images?: any[];
  refresh: () => void;
};

const formDefaultValues = {
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
  documents: [],
  images: [],
};

export default function EventForm<T extends z.ZodType<any, any>>({
  formSchema,
  onSubmit,
  defaultValues = formDefaultValues,
  preview,
  documents,
  refresh,
  images,
}: EventFormProps<T>) {
  const [documentDeleteLoading, setDocumentDeleteLoading] =
    React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  type EventFormData = z.infer<typeof formSchema>;

  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: EventFormData) => {
    await onSubmit(values, form);
  };

  // function to delete document
  const handleDocumentDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this document?",
    );
    if (!confirm) return;
    setSelectedId(id);

    setDocumentDeleteLoading(true);
    const res = await deleteEventDocument(id);
    if (res.status === "success") {
      toast.success(res.message);
      form.reset();
      refresh();
    } else {
      toast.error(res.message);
    }
    setDocumentDeleteLoading(false);
    setSelectedId(null);
  };

  // function to delete image
  const handleImageDelete = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this document?",
    );
    if (!confirm) return;
    setSelectedId(id);

    setDocumentDeleteLoading(true);
    const res = await deleteEventImage(id);
    if (res.status === "success") {
      toast.success(res.message);
      form.reset();
      refresh();
    } else {
      toast.error(res.message);
    }
    setDocumentDeleteLoading(false);
    setSelectedId(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="rounded-lg border bg-white p-6"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 @container">
          {EventFormFields.map((group) => (
            <div
              key={group.group}
              className="col-span-12 flex flex-col gap-4 @3xl:col-span-6"
            >
              {group.items.map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  defaultPreview={
                    field.type === "file" ? getImageURL(preview) : ""
                  }
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="mb-1 block font-medium" htmlFor="images">
            Event Images (.png, .jpg, .jpeg)
          </label>
          <Input
            type="file"
            name="images"
            id="images"
            multiple
            className="block w-full rounded border p-2"
            onChange={(e) => {
              form.setValue(
                "images" as Path<z.infer<T>>,
                Array.from(e.target.files || []) as PathValue<
                  z.infer<T>,
                  Path<z.infer<T>>
                >,
              );
            }}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>

        {images && images.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
            {images.map((doc) => (
              <div key={doc?.id} className="relative">
                <Image
                  src={getImageURL(doc.link)}
                  alt="Event"
                  height={360}
                  width={992}
                  className="aspect-video w-full"
                />
                <button
                  onClick={() => handleImageDelete(doc?.id)}
                  disabled={documentDeleteLoading}
                  type="button"
                  className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-destructive p-1 text-base-0"
                >
                  {documentDeleteLoading && doc?.id === selectedId ? (
                    <IconLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IconX size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-4">
          <label className="mb-1 block font-medium" htmlFor="documents">
            Event Documents (PDF)
          </label>
          <Input
            type="file"
            name="documents"
            id="documents"
            multiple
            className="block w-full rounded border p-2"
            onChange={(e) => {
              form.setValue(
                "documents" as Path<z.infer<T>>,
                Array.from(e.target.files || []) as PathValue<
                  z.infer<T>,
                  Path<z.infer<T>>
                >,
              );
            }}
            accept=".pdf"
          />
        </div>

        {documents && documents.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
            {documents.map((doc) => (
              <div key={doc?.id} className="relative">
                <Drawer>
                  <DrawerTrigger className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-md bg-base-50 p-4 text-base-300 shadow-sm hover:bg-base-100">
                    <IconFileTypePdf size={32} />
                    <p className="text-xs">{doc.title}</p>
                  </DrawerTrigger>
                  <DrawerContent className="h-[calc(100vh-50px)]">
                    <DrawerHeader>
                      <DialogTitle className="hidden">
                        <DialogDescription></DialogDescription>
                      </DialogTitle>
                      <DrawerClose asChild className="absolute right-2 top-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-7 w-7"
                        >
                          <IconX size={18} />
                        </Button>
                      </DrawerClose>
                    </DrawerHeader>
                    <div className="h-full">
                      <iframe
                        src={getImageURL(doc?.link)}
                        className="h-full w-full border-0"
                      />
                    </div>
                  </DrawerContent>
                </Drawer>
                <button
                  onClick={() => handleDocumentDelete(doc?.id)}
                  disabled={documentDeleteLoading}
                  type="button"
                  className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-destructive p-1 text-base-0"
                >
                  {documentDeleteLoading && doc?.id === selectedId ? (
                    <IconLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IconX size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-6">
          <Button
            disabled={form.formState.isSubmitting || documentDeleteLoading}
            type="submit"
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
