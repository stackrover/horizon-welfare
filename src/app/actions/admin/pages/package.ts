"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";

export async function addPackage(formData: FormData) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    formData.append("updated_by", session?.user?.id as string);
    formData.append("created_by", session?.user?.id as string);

    try {
        const res = await fetcher("/subscription/package/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
            },
            body: formData,
            signal: controller.signal,
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return { ...ERROR_OBJ_FORMAT, error: error };
    }
}

// Update content

export async function updatePackage(formData: FormData, packageId: number) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    formData.append("updated_by", session?.user?.id as string);

    try {
        const res = await fetcher(`/subscription/package/update/${packageId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
            },
            body: formData,
            signal: controller.signal,
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return { ...ERROR_OBJ_FORMAT, error: error };
    }
}

// Delete
export async function deletePackage(packageId: number) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    try {
        const res = await fetcher(`/subscription/package/delete/${packageId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
            },
            signal: controller.signal,
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return { ...ERROR_OBJ_FORMAT, error: error };
    }
}
