"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";
import logger from "@/utils/logger";

export async function updateVolunteerPageHeroSectionData(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/donate/page/hero/update", {
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
      revalidatePath("/admin/dashboard/pages/volunteers", "page");
    }

    return data;
  } catch (error) {
    console.log({ error });
    logger.error("error: ", error);
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

// volunteer project update
export async function updateVolunteerProjectSectionData(
  formData: FormData,
  id: number,
) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher(`/project/category/update/${id}`, {
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
      revalidatePath("/admin/dashboard/pages/volunteers", "page");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

// update success stories
export async function updateSuccessStories(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  logger.error("This is a test error message");

  // return error if user is not authenticated
  if (!session?.user?.token) {
    logger.error("Unauthorized");
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/donate/page/success/story/update", {
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
      revalidatePath("/admin/dashboard/pages/volunteers", "page");
    } else {
      logger.error(data.message);
    }

    return data;
  } catch (error) {
    console.log({ error: error });
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}
