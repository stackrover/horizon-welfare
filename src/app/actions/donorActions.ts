"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

// donor profile update action handler
export const updateDonorProfileAction = async (
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
    const res = await fetcher(`/donor/profile/update/${userId}`, {
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
      revalidatePath("/donor/profile", "page");
    }

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};

// donor profile update action handler
export const projectSubscriptionAction = async (
  packageId: number | string | undefined,
) => {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  const donorId = session?.user?.id;

  try {
    const res = await fetcher(`/project/subscription/${donorId}/${packageId}`, {
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
};

// donation action handler
export const donateAction = async ({
  projectId,
  totalAmount,
  isSubscriptionMoney,
  packageId,
  currency,
}: {
  projectId: number | string | undefined | null;
  totalAmount: number;
  isSubscriptionMoney: "yes" | "no";
  packageId?: number | string | undefined | null;
  currency: string;
}) => {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pay`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        totalAmount,
        uid: session.user.id,
        projectId,
        isSubscriptionMoney,
        packageId,
        currency,
      }),
      signal: controller.signal,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
