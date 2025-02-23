"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

// donor profile update action handler
export const updateVolunteerProfileAction = async (
  fd: FormData,
  userId: number | string | undefined,
) => {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/volunteer/profile/update/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: fd,
      signal: controller.signal,
    });

    const data = await res.json();

    if (data.status === "success") {
      revalidatePath("/volunteer/profile", "page");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};

// volunteer status toggle action handler
export const projectStatusToggleAction = async (
  packageId: number | string | undefined,
) => {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  const volunteerId = session?.user?.id;

  try {
    const res = await fetcher(
      `/volunteer/toggle/joining/status/${volunteerId}/${packageId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        signal: controller.signal,
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
