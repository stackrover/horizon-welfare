"use server";

import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import axiosInstance from "@/lib/axios";
import { StateType } from "@/types/types";

// add subscription action handler
export const subscribe = async (prevState: StateType, formData: FormData) => {
  try {
    const email = formData.get("email");

    const { data } = await axiosInstance.post("/newsletter/subscriber/add", {
      email,
    });

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};

// contact us form action handler
export const contactUs = async (prevState: StateType, formData: FormData) => {
  try {
    const firstName = formData.get("contact-us-first_name");
    const lastName = formData.get("contact-us-last_name");
    const email = formData.get("contact-us-email");
    const subject = formData.get("contact-us-subject");
    const message = formData.get("contact-us-message");

    const { data } = await axiosInstance.post("/newsletter/subscriber/add", {
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error: error };
  }
};
