"use server";

import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";
import { StateType } from "@/types/types";

// contact us form action handler
export const subscribeEvent = async (
  eventId: number,
  prevState: StateType,
  formData: FormData,
) => {
  const controller = new AbortController();

  try {
    formData.append("event_id", eventId.toString());

    const res = await fetcher("/event/subscriber/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
      signal: controller.signal,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
