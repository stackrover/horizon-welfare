import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])[a-zA-Z0-9\S]{6,}$/;

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .refine((val) => regex.test(val), {
        message:
          "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 2 digits & 2 special characters!",
      }),
    confirm_password: z.string(),
  })
  .superRefine((schema, context) => {
    if (schema.password !== schema.confirm_password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match!",
        path: ["confirm_password"],
      });
    }
  });
