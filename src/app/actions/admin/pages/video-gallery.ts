"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import logger from "@/utils/logger";
import { revalidatePath } from "next/cache";

// Update media center page hero section data
export async function updateVideoGallaryHero(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/video/page/hero/update", {
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
      revalidatePath("/admin/dashboard/pages/media-center", "page");
    }
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      logger.error(error?.message);
    }
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}
