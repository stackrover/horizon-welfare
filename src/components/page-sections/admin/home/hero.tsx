"use client";

import saveHeroSectionData from "@/app/actions/admin/pages/home";
import SubmitButton from "@/components/custom/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";
import { head } from "lodash";
import React from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import { match } from "ts-pattern";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue } from "../../../ui/select";

export function HeroSection({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = React.use(dataPromise);

  const hero = head(data.results) as Record<string, string>;

  console.log({ hero });

  const [state, action] = useFormState(saveHeroSectionData, null);

  React.useEffect(() => {
    if (state && state.status === "success") {
      toast.success(state.message);
    }
  }, [state]);

  // form fields
  const formFields = [
    {
      label: "Title",
      name: "title",
      type: "text",
      defaultValue: hero?.title || "",
    },
    {
      label: "Donate now button title",
      name: "donate_now_bt_title",
      type: "text",
      defaultValue: hero?.donate_now_bt_title || "",
    },
    {
      label: "Donate now button link",
      name: "donate_now_bt_link",
      type: "text",
      defaultValue: hero?.donate_now_bt_link || "",
    },
    {
      label: "Watch button title",
      name: "watch_video_bt_title",
      type: "text",
      defaultValue: hero?.watch_video_bt_title || "",
    },
    {
      label: "Video link",
      name: "watch_video_bt_link",
      type: "url",
      defaultValue: hero?.watch_video_bt_link || "",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      defaultValue: hero?.status || "",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      defaultValue: hero?.description || "",
    },
  ];

  return (
    <section className="rounded-xl bg-white p-6 py-4">
      <h3 className="mb-6 text-lg"> Hero section </h3>
      <form action={action} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name} className="space-y-2">
            {field.label && <Label> {field.label} </Label>}
            {match(field.type)
              .with("textarea", () => <Textarea {...field} />)
              .with("select", () => (
                <select
                  name={field.name}
                  className="block h-10 w-full appearance-none rounded-md border bg-base-0 px-3 outline-none focus:outline-none active:border-base-300"
                >
                  {field?.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ))
              .otherwise(() => (
                <Input {...field} />
              ))}
          </div>
        ))}

        <SubmitButton> Save changes </SubmitButton>
      </form>
    </section>
  );
}
