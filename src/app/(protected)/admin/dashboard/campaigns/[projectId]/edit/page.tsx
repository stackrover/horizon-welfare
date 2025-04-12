"use client";

import { updateProject } from "@/app/actions/admin/pages/campaigns";
import CampaignForm from "@/components/page-sections/admin/campaigns/CampaignForm";
import { Project } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { projectUpdateSchema } from "@/schemas/projectSchema";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

type ProjectFormData = z.infer<typeof projectUpdateSchema>;


export default function EditCampaign<T extends z.ZodType<any, any>>() {
    const { projectId } = useParams();
    const { data, isLoading, refresh } = useSWR(`/project/show/${projectId}`);


    if (isLoading) {
        return <div className="py-6"> Loading... </div>;
    }

    const serializedData = data?.data?.results
        ? new Project(data?.data?.results)
        : null;

    console.log(serializedData)

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
            } else {
                fd.append(typedKey, (value as string) || "");
            }
        });

        try {
            const res = await updateProject(fd, serializedData?.id as number);
            if (res.status === "success") {
                toast.success(res.message);
                refresh()
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <CampaignForm
            formSchema={projectUpdateSchema}
            onSubmit={onSubmit}
            refresh={refresh}
            documents={serializedData?.documents}
            images={serializedData?.images}
            thumbnailPreview={serializedData?.thumbnail}
            managerImgPreview={serializedData?.managers[0]?.link}
            defaultValues={{
                category_id: (serializedData?.categoryId)?.toString() || "",
                title: serializedData?.title || "",
                description: serializedData?.description || "",
                thumbnail: undefined,
                goal_amount: serializedData?.goalAmount || 0,
                collection_days: serializedData?.collectionDays || 0,
                volunteer_need: serializedData?.volunteerNeed || 0,
                is_emergency: (serializedData?.isEmergency)?.toString() || "1",
                status: serializedData?.status || "",
                manager_img: undefined,
                manager_name: serializedData?.managers[0]?.managerName || "",
                manager_email: serializedData?.managers[0]?.email || "",
                manager_mobile: serializedData?.managers[0]?.mobile || "",
            }}
        />
    );
}
