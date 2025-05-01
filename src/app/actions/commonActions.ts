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
    const firstName = formData.get("contact-us-first-name");
    const lastName = formData.get("contact-us-last-name");
    const email = formData.get("contact-us-email");
    const mobile_number = formData.get("contact-us-mobile-number");
    const subject = formData.get("contact-us-subject");
    const message = formData.get("contact-us-message");

    const { data } = await axiosInstance.post("/contact/form/add", {
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_number,
      subject,
      message,
    });

    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT };
  }
};
