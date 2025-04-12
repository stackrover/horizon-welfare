"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";


export async function statusChange(id: string, fd: FormData) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    try {
        const res = await fetcher(`/user/status/change/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
            },
            body: fd,
            signal: controller.signal,
        });

        const data = await res.json();

        return data;
    } catch (error) {
        return { ...ERROR_OBJ_FORMAT, error: error };
    }
}

export async function deleteUser(id: string) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    try {
        const res = await fetcher(`/user/delete/${id}`, {
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