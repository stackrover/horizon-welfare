"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath, revalidateTag } from "next/cache";

export async function saveHeroSectionData(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/home/hero/update", {
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
      revalidatePath("/admin/dashboard/pages/home", "page");
      revalidateTag("hello");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

/******************************************/
/****** UPDATE SERVICE SECTION CARDS ******/
/******************************************/

export async function updateServiceSectionData(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/home/service/update", {
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
      revalidatePath("/admin/dashboard/pages/home", "page");
      revalidateTag("homeSerivce");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

/******************************************/
/****** UPDATE GALLERY SECTION ******/
/******************************************/

export async function updateGallerySectionData(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher("/home/gallery/update", {
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
      revalidatePath("/admin/dashboard/pages/home", "page");
      revalidateTag("homeSerivce");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}
