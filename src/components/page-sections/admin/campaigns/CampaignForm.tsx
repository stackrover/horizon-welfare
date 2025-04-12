"use client";

import { deleteProjectDocument, deleteProjectImage } from "@/app/actions/admin/pages/campaigns";
import { CreateCategory } from "@/components/custom/CreateCategory";
import InputField from "@/components/forms/InputField";
import { SelectProjectCategory } from "@/components/forms/SelectProjectCategory";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getImageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconFileTypePdf, IconLoader2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Path, PathValue, useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FORM_FIELDS = [
    { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
    {
        name: "goal_amount",
        label: "Goal amount",
        type: "number",
        placeholder: "Enter goal amount",
    },
    {
        name: "collection_days",
        label: "Campaign days",
        type: "number",
        placeholder: "Enter campaign days",
    },
    {
        name: "volunteer_need",
        label: "Volunteer need",
        type: "number",
        placeholder: "Enter volunteer count",
    },
    {
        name: "is_emergency",
        label: "Emergency",
        type: "select",
        options: [
            { label: "Emergency", value: "1" },
            { label: "Not Emergency", value: "0" },
        ],
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Pending", value: "pending" },
        ],
    },
    {
        name: "manager_name",
        label: "Manager Name",
        type: "text",
        placeholder: "Enter Manager Name",
    },
    {
        name: "manager_email",
        label: "Manager Email",
        type: "email",
        placeholder: "Enter Manager Email",
    },
    {
        name: "manager_mobile",
        label: "Manager Mobile",
        type: "tel",
        placeholder: "Enter Manager Mobile",
    },
];

const formDefaultValues = {
    category_id: "",
    title: "",
    description: "",
    thumbnail: undefined,
    goal_amount: 0,
    collection_days: 0,
    volunteer_need: 0,
    is_emergency: "1",
    status: "active",
    manager_img: "",
    manager_name: "",
    manager_email: "",
    manager_mobile: "",
};

type CampaignFormProps<T extends z.ZodType<any, any>> = {
    formSchema: T;
    onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
    defaultValues?: any;
    thumbnailPreview?: string;
    managerImgPreview?: string;
    documents?: any[];
    images?: any[];
    refresh: () => void;
};

export default function CampaignForm<T extends z.ZodType<any, any>>({
    formSchema,
    onSubmit,
    defaultValues = formDefaultValues,
    thumbnailPreview,
    managerImgPreview,
    documents,
    refresh,
    images,
}: CampaignFormProps<T>) {
    const [documentDeleteLoading, setDocumentDeleteLoading] =
        React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    type ProjectFormData = z.infer<typeof formSchema>;

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleSubmit = async (values: ProjectFormData) => {
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
        const res = await deleteProjectDocument(id);
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
        const res = await deleteProjectImage(id);
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
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="w-full p-6">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-4 @container">
                        <div className="col-span-12 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                {" "}
                                Campaign (Project){" "}
                            </h2>
                            <Button asChild>
                                <Link href="/admin/dashboard/campaigns"> Back </Link>
                            </Button>
                        </div>
                        <div className="col-span-12 flex flex-col gap-4 @3xl:col-span-6">
                            {FORM_FIELDS.map((field) => (
                                <InputField key={field.name} {...field} />
                            ))}
                            <InputField
                                name="manager_img"
                                label="Manager Image"
                                type="file"
                                className="min-h-[200px] border-black/20"
                                defaultPreview={getImageURL(managerImgPreview)}
                            />
                        </div>

                        {/* project id  */}
                        <div className="col-span-12 @3xl:col-span-6">
                            <div className="mb-4">
                                <FormField
                                    control={form.control}
                                    name={"category_id" as Path<z.infer<T>>}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-gray-500">
                                                Category
                                            </FormLabel>
                                            <div className="flex items-center gap-4">
                                                <SelectProjectCategory
                                                    value={field.value}
                                                    onSelectChange={field.onChange}
                                                />

                                                <CreateCategory />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-5">
                                <InputField
                                    name="thumbnail"
                                    label="Thumbnail"
                                    type="file"
                                    className="h-[384px] border-black/20"
                                    defaultPreview={getImageURL(thumbnailPreview)}
                                />

                                <p className="mt-3 text-sm text-gray-500">
                                    Image size must have a 2:3 aspect ratio.
                                </p>
                            </div>
                            <div className="mb-5">
                                <InputField
                                    name="description"
                                    label="description"
                                    type="textarea"
                                    className="min-h-80"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="mt-4">
                                <label className="mb-1 block font-medium" htmlFor="images">
                                    Project Images (.png, .jpg, .jpeg)
                                </label>
                                <Input
                                    type="file"
                                    name="images"
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
                                    Project Documents (PDF)
                                </label>
                                <Input
                                    type="file"
                                    name="documents"
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
                                                        <DrawerClose
                                                            asChild
                                                            className="absolute right-2 top-2"
                                                        >
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
                        </div>
                        <div className="col-span-12 flex items-center justify-start">
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
