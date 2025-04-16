"use client";

import { updateServiceSectionData } from "@/app/actions/admin/pages/home";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getImageURL } from "@/lib/utils";
import { head } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components//ui/label";
import { HomePageServiceCardData } from "@/types/types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ServiceSection<T extends Record<string, any>>({
  data,
}: {
  data: T;
}) {
  const serviceData = head(data.results) as HomePageServiceCardData;

  // form fields
  const formFields = [
    {
      group: serviceData?.title_1 || "Serive Card 1",
      id: "c72ba007-2d72-4be5-b1a1-68fff2896d1b",
      fields: [
        {
          name: "image_1",
          label: "Icon",
          type: "file",
          className:
            "w-[150px] h-[150px] [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
        },
        { name: "title_1", label: "Title", type: "text" },
        { name: "description_1", label: "Description", type: "textarea" },
      ],
    },

    {
      group: serviceData?.title_2 || "Serive Card 2",
      id: "a57d1506-d118-4c29-bd15-aa0c0928c71b",
      fields: [
        {
          name: "image_2",
          label: "Icon",
          type: "file",
          className:
            "w-[150px] h-[150px] [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
        },
        { name: "title_2", label: "Title", type: "text" },
        { name: "description_2", label: "Description", type: "textarea" },
      ],
    },

    {
      group: serviceData?.title_3 || "Serive Card 3",
      id: "cb6dcd2f-6c00-4c8c-8976-87350ece7da5",
      fields: [
        {
          name: "image_3",
          label: "Icon",
          type: "file",
          className:
            "w-[150px] h-[150px] [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
        },
        { name: "title_3", label: "Title", type: "text" },
        { name: "description_3", label: "Description", type: "textarea" },
      ],
    },

    {
      group: serviceData?.title_4 || "Serive Card 4",
      id: "4fa82525-c545-40dd-9f26-b0c0f0cb7689",
      fields: [
        {
          name: "image_4",
          label: "Icon",
          type: "file",
          className:
            "w-[150px] h-[150px] [&_img]:w-full [&_img]:h-full [&_img]:object-cover",
        },
        { name: "title_4", label: "Title", type: "text" },
        { name: "description_4", label: "Description", type: "textarea" },
      ],
    },
  ];

  const form = useForm({
    defaultValues: {
      ...serviceData,
      image_1: undefined,
      image_2: undefined,
      image_3: undefined,
      image_4: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) => {
      fd.append(key, values[key] || "");
    });

    const res = await updateServiceSectionData(fd);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AccordionItem
      value="seariceSection"
      className="rounded-xl bg-white p-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <h3 className="text-lg font-bold"> Service section </h3>
          <Label className="flex cursor-pointer items-center gap-2">
            <Checkbox
              defaultChecked={form.getValues("status") === "active"}
              onCheckedChange={(checked: any) => {
                if (checked) {
                  form.setValue("status", "active");
                } else {
                  form.setValue("status", "inactive");
                }
              }}
            />
            <span className="text-gray-500">Service section is active</span>
          </Label>
        </div>

        <AccordionTrigger />
      </div>

      <AccordionContent className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields.map((group, index) => (
              <div
                key={group.id}
                className="flex flex-col space-y-4 border border-dashed border-gray-200 p-8"
              >
                <h4 className="font-bold">
                  {index + 1}. {group.group}
                </h4>
                {group.fields?.map((field) => (
                  <InputField
                    key={field.name}
                    defaultPreview={
                      field.type === "file"
                        ? getImageURL(
                            serviceData?.[
                              field.name as keyof HomePageServiceCardData
                            ] as string,
                          )
                        : ""
                    }
                    {...field}
                  />
                ))}
              </div>
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
