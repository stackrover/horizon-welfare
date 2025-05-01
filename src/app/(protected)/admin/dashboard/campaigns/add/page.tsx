"use client";

import { addNewProject } from "@/app/actions/admin/pages/campaigns";
import CampaignForm from "@/components/page-sections/admin/campaigns/CampaignForm";
import { projectCreateSchema } from "@/schemas/projectSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

type ProjectFormData = z.infer<typeof projectCreateSchema>;

export default function AddCampaign() {
  const router = useRouter();

  const onSubmit = async (formData: ProjectFormData) => {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof ProjectFormData;
      const value = formData[typedKey];

      // Check if the value is a File (Blob) or a number, and convert accordingly
      if (value instanceof File) {
        fd.append(typedKey, value);
      } else if (typeof value === "number") {
        fd.append(typedKey, value.toString()); // Convert number to string
      } else if (key === "documents" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            fd.append("documents[]", file);
          }
        });
      } else if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            fd.append("images[]", file);
          }
        });
      } else {
        fd.append(typedKey, (value as string) || "");
      }
    });

    try {
      const res = await addNewProject(fd);

      if (res.status === "success") {
        toast.success(res.message);
        router.push("/admin/dashboard/campaigns");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <CampaignForm
      formSchema={projectCreateSchema}
      onSubmit={onSubmit}
      refresh={() => {}}
    />
  );
}
