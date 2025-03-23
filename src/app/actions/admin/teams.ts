"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";

// add team member
export async function addTeamMember(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);
  formData.append("created_by", session?.user?.id as string);

  try {
    const res = await fetcher("/about/page/team/member/add", {
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
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

export async function editTeamMember(formData: FormData, id: number) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher(`/about/page/team/member/update/${id}`, {
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
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

export async function deleteTeamMember(id: number) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/about/page/team/member/delete/${id}`, {
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
