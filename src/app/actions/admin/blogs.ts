"use server";

import { auth } from "@/auth";
import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function addBlog(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);
  formData.append("created_by", session?.user?.id as string);

  try {
    const res = await fetcher("/blog/add", {
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

export async function addBlogCategory(formData: FormData) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);
  formData.append("created_by", session?.user?.id as string);

  try {
    const res = await fetcher("/blog/category/add", {
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

// Update blog content
export async function updateBlog(formData: FormData, blogId: number) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  formData.append("updated_by", session?.user?.id as string);

  try {
    const res = await fetcher(`/blog/update/${blogId}`, {
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

// Update blog comment
export async function updateBlogComment(formData: FormData, blogId: number) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/blog/comment/update/${blogId}`, {
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

// delete blog content
export async function deleteBlogCategory(blogId: number | string) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/blog/category/delete/${blogId}`, {
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

// delete blog content
export async function deleteBlog(blogId: number | string) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/blog/delete/${blogId}`, {
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

// delete blog comment
export async function addBlogComment(formData: FormData, slug: string) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/blog/comment/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      body: formData,
      signal: controller.signal,
    });

    const data = await res.json();

    revalidatePath(`/blog/show/slug/${slug}`, "page");

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
}

// delete blog comment
export async function deleteBlogComment(commentId: number) {
  const controller = new AbortController();
  const session = await auth();

  // return error if user is not authenticated
  if (!session?.user?.token) {
    return { ...ERROR_OBJ_FORMAT, message: "Unauthorized" };
  }

  try {
    const res = await fetcher(`/blog/comment/delete/${commentId}`, {
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
