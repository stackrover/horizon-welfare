import { z } from "zod";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const donorRegistrationFormSchema = z
  .object({
    f_name: z.string().min(1, {
      message: "First name is required.",
    }),
    l_name: z.string().min(1, {
      message: "Last name is required.",
    }),
    mobile_number: z.string().min(1, {
      message: "Mobile number is required.",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email(),
    password: z
      .string()
      .min(1, {
        message: "Password is required.",
      })
      .refine((val) => regex.test(val), {
        message:
          "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 digits!",
      }),
    confirm_password: z.string(),
    honey_pot: z.string(),
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
