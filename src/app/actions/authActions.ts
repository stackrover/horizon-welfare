"use server";

import { signIn, signOut } from "@/auth";
import { donorRegistrationFormSchema } from "@/schemas/donorRegistrationFormSchema";
import { loginFormSchema } from "@/schemas/loginFromSchema";
import { volunteerRegistrationFormSchema } from "@/schemas/volunteerRegistrationFormSchema";
import { AuthError } from "next-auth";
import { z } from "zod";
import { forgotPasswordFormSchema } from "../../schemas/forgotPasswordFormSchema";
import { resetPasswordFormSchema } from "../../schemas/resetPasswordFormSchema";

const errorState = {
  status: "error",
  error_type: "general",
  message: "Something went wrong! Please try again later.",
};

// login with next-auth credentials provider action handler
export const singInWithCredentials = async (
  values: z.infer<typeof loginFormSchema>,
) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/login",
    });
  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials!",
            status: "error",
            errors: error,
          };
        default:
          return errorState;
      }
    }
    throw error;
  }
};

// user login handler
export const loginAction = async (
  credentials: z.infer<typeof loginFormSchema>,
) => {
  try {
    const jsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    return errorState;
  }
};

// logout handler
export const handleSignOut = async () => {
  await signOut({ redirectTo: "/login" });
};

// donor registration handler
export const donorRegistrationAction = async (
  values: z.infer<typeof donorRegistrationFormSchema>,
) => {
  const { honey_pot, ...restData } = values;
  try {
    const jsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donar/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restData),
      },
    );

    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    return errorState;
  }
};

// volunteer registration handler
export const volunteerRegistrationAction = async (
  values: z.infer<typeof volunteerRegistrationFormSchema>,
) => {
  const { honey_pot, confirm_password, ...restData } = values;
  try {
    const jsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/volunteer/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restData),
      },
    );

    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    return errorState;
  }
};

// reset password email link sender handler
export const sendPasswordResetEmailAction = async (
  values: z.infer<typeof forgotPasswordFormSchema>,
) => {
  const { honey_pot, ...restData } = values;
  try {
    const jsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/send/reset/password/link`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restData),
      },
    );

    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    return errorState;
  }
};

// reset password email link sender handler
export const passwordResetAction = async (
  values: z.infer<typeof resetPasswordFormSchema>,
) => {
  const { honey_pot, ...restData } = values;
  try {
    const jsonResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset/password`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restData),
      },
    );

    const response = await jsonResponse.json();

    return response;
  } catch (error) {
    return errorState;
  }
};
