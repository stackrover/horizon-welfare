"use server";

import { signIn, signOut } from "@/auth";
import { loginFormSchema } from "@/schemas/loginFromSchema";
import { AuthError } from "next-auth";
import { z } from "zod";

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
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials!",
            status: "error",
          };
        default:
          return {
            message: "Something went wrong!",
            status: "error",
          };
      }
    }
    throw error;
  }
};

// login handler
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
    return {
      message: "Something went wrong.",
      status: "error",
    };
  }
};

export const handleSignOut = async () => {
  await signOut();
};
