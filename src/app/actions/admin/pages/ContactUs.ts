"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function updateContactUsHero(formData: FormData) {
    const controller = new AbortController();
    const session = await auth();

    // return error if user is not authenticated
    if (!session?.user?.token) {
        return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
    }

    formData.append("updated_by", session?.user?.id as string);

    try {
        const res = await fetcher("/contact/us/page/content/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.user?.token}`,
            },
            body: formData,
            signal: controller.signal,
        });

        const data = await res.json();

        if (data.status === "success") {
            revalidatePath("/admin/dashboard/pages/contact-us", "page");
        }

        return data;
    } catch (error) {
        return { ...ERROR_OBJ_FORMAT, error: error };
    }
}