import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])[a-zA-Z0-9\S]{6,}$/;

export const donorProfileFormSchema = z.object({
  f_name: z.string().min(1, {
    message: "First name is required.",
  }),
  l_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  location: z.string().min(1, {
    message: "Select a location.",
  }),
  age: z.string().min(1, {
    message: "Age is required.",
  }),
  gender: z.string().min(1, {
    message: "Choose a gender.",
  }),
  person: z.string().min(1, {
    message: "Person is required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email(),
});
