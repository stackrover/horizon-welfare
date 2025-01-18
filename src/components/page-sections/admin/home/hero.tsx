"use client";

import { saveHeroSectionData } from "@/app/actions/admin/pages/home";
import InputField from "@/components/forms/InputField";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getImageURL } from "@/lib/utils";
import { HeroSectionData } from "@/types/types";
import { head } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export function HeroSection({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = React.use(dataPromise);

  const editData = head(data.results) as HeroSectionData;

  // form fields
  const formFields = [
    {
      label: "Hero image",
      name: "image",
      type: "file",
      className: "h-96",
    },
    {
      label: "Title",
      name: "title",
      type: "text",
    },
    {
      label: "Donate now button title",
      name: "donate_now_bt_title",
      type: "text",
    },
    {
      label: "Donate now button link",
      name: "donate_now_bt_link",
      type: "text",
    },
    {
      label: "Watch button title",
      name: "watch_video_bt_title",
      type: "text",
    },
    {
      label: "Video link",
      name: "watch_video_bt_link",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
  ];

  const form = useForm({
    defaultValues: {
      ...editData,
      image: undefined,
    },
  });

  const onSubmit = async (values: any) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) => {
      fd.append(key, values[key] || "");
    });

    const res = await saveHeroSectionData(fd);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AccordionItem value="HeroSection" className="rounded-xl bg-white p-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <h3 className="text-lg font-bold"> Hero Section </h3>
          <Label className="flex cursor-pointer items-center gap-2">
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
            <span className="text-gray-500">Hero section is active</span>
          </Label>
        </div>

        <AccordionTrigger />
      </div>

      <AccordionContent className="py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields.map((field) => (
              <InputField
                key={field.name}
                defaultPreview={
                  field.type === "file"
                    ? getImageURL(
                        editData?.[
                          field.name as keyof HeroSectionData
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
