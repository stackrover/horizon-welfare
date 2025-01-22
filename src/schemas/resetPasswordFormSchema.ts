import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])[a-zA-Z0-9\S]{6,}$/;

export const resetPasswordFormSchema = z
  .object({
    token: z.string(),
    new_password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .refine((val) => regex.test(val), {
        message:
          "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 2 digits & 2 special characters!",
      }),
    new_password_confirmation: z.string(),
    honey_pot: z.string().optional(),
  })
  .superRefine((schema, context) => {
    if (schema.new_password !== schema.new_password_confirmation) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match!",
        path: ["new_password_confirmation"],
      });
    }
  });
