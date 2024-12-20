"use server";

import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";

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

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
