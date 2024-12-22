"use server";

import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (
  fd: FormData,
  userId: number | string | undefined,
) => {
  const controller = new AbortController();

  console.log(fd);

  try {
    const res = await fetcher(`/donor/profile/update/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: fd,
      signal: controller.signal,
    });

    const data = await res.json();

    if (data.status === "success") {
      revalidatePath("/donor/profile", "page");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
