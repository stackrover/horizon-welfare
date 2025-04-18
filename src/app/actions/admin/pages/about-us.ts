"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import logger from "@/utils/logger";

// Update media center page hero section data
export async function updateAboutUsOurJourneySection(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/about/page/journey/update", {
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
    if (error && typeof error === "object" && "message" in error && window) {
      logger.error(error?.message);
    }
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

// Update
export async function updateAboutUsHeroSection(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/about/page/content/update", {
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
    if (error && typeof error === "object" && "message" in error && window) {
      logger.error(error?.message);
    }
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}
