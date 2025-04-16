"use client";

import { updateGallerySectionData } from "@/app/actions/admin/pages/home";
import { Label } from "@/components//ui/label";
import InputField from "@/components/forms/InputField";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { getImageURL } from "@/lib/utils";
import { HomePageGalleryData, HomePageServiceCardData } from "@/types/types";
import { head } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export function GallerySection<T extends Record<string, any>>({
  data,
}: {
  data: T;
}) {
  const editData = head(data.results) as HomePageGalleryData;

  // form fields
  const formFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Video Title",
      name: "video_title",
      type: "text",
    },
    {
      label: "Video Link",
      name: "video_link",
      type: "url",
    },
    {
      label: "Image Title 1",
      name: "image_title_1",
      type: "text",
    },
    {
      label: "Image 1",
      name: "image_1",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 2",
      name: "image_title_2",
      type: "text",
    },
    {
      label: "Image 2",
      name: "image_2",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 3",
      name: "image_title_3",
      type: "text",
    },
    {
      label: "Image 3",
      name: "image_3",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 4",
      name: "image_title_4",
      type: "text",
    },
    {
      label: "Image 4",
      name: "image_4",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 5",
      name: "image_title_5",
      type: "text",
    },
    {
      label: "Image 5",
      name: "image_5",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 6",
      name: "image_title_6",
      type: "text",
    },
    {
      label: "Image 6",
      name: "image_6",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 7",
      name: "image_title_7",
      type: "text",
    },
    {
      label: "Image 7",
      name: "image_7",
      type: "file",
      className: "w-96 h-96",
    },
    {
      label: "Image Title 8",
      name: "image_title_8",
      type: "text",
    },
    {
      label: "Image 8",
      name: "image_8",
      type: "file",
      className: "w-96 h-96",
    },
  ];

  const form = useForm({
    defaultValues: {
      ...editData,
      image_1: undefined,
      image_2: undefined,
      image_3: undefined,
      image_4: undefined,
      image_5: undefined,
      image_6: undefined,
      image_7: undefined,
      image_8: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) => {
      fd.append(key, values[key] || "");
    });

    const res = await updateGallerySectionData(fd);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AccordionItem
      value="gallerySection"
      className="rounded-xl bg-white p-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <h3 className="text-lg font-bold"> Gallery section </h3>
          <Label className="flex cursor-pointer items-center gap-2 space-y-0">
            <Checkbox
              defaultChecked={form.getValues("status") === "active"}
              onCheckedChange={(checked) => {
                if (checked) {
                  form.setValue("status", "active");
                } else {
                  form.setValue("status", "inactive");
                }
              }}
            />
            <span className="text-gray-500">Gallery section is active</span>
          </Label>
        </div>

        <AccordionTrigger />
      </div>

      <AccordionContent className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields?.map((field) => (
              <InputField
                key={field.name}
                defaultPreview={
                  field.type === "file"
                    ? getImageURL(
                        editData?.[
                          field.name as keyof HomePageGalleryData
                        ] as string,
                      )
                    : ""
                }
                {...field}
              />
            ))}

            <Button>
              {form.formState.isSubmitting ? "Loading..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
