"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useSWR } from "../../../../hooks/use-swr";

const formFields = [
    {
        name: "subscription_rate",
        type: "number",
        label: "Subscription Rate (Per Month)",
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select Status",
        options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Pending", value: "pending" },
        ],
    },
];

const formDefaultValues = {
    project_id: "",
    subscription_rate: 0,
    status: "",
};

export type ProjectFormProps<T extends z.ZodType<any, any>> = {
    formSchema: T;
    onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
    defaultValues?: any;
    preview?: string;
};

export default function PackageForm<T extends z.ZodType<any, any>>({
    formSchema,
    defaultValues = formDefaultValues,
    preview,
    onSubmit,
}: ProjectFormProps<T>) {
    const { data: projects, isLoading } = useSWR(`/project/less/data/list`);

    type PackageFormData = z.infer<T>;

    const form = useForm<PackageFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    console.log(form.getValues());

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
            >
                <InputField
                    label="Project"
                    name="project_id"
                    type="select"
                    placeholder="Select a Project"
                    options={
                        projects?.data?.results
                            ? projects.data?.results?.map(
                                (d: { title: string; id: string }) => ({
                                    label: d.title,
                                    value: d.id?.toString(),
                                }),
                            )
                            : []
                    }
                />

                {formFields.map((field) => (
                    <InputField key={field.name} {...field} defaultPreview={preview} />
                ))}

                <Button>{form.formState.isSubmitting ? "Saving..." : "Save"}</Button>
            </form>
        </Form>
    );
}
