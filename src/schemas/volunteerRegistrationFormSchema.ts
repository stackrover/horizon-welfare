import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])[a-zA-Z0-9\S]{6,}$/;

export const volunteerRegistrationFormSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "First name is required.",
    }),
    last_name: z.string().min(1, {
      message: "Last name is required.",
    }),
    division: z.string().min(1, {
      message: "Select a division.",
    }),
    district: z.string().min(1, {
      message: "Select a district.",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email(),
    address: z.string().min(1, {
      message: "Address is required.",
    }),
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
    blood_group: z.string().min(1, {
      message: "Select a blood group.",
    }),
    mobile: z.string().min(1, {
      message: "Mobile no is required.",
    }),
    profession: z.string().min(1, {
      message: "Profession is required.",
    }),
    education: z.string().min(1, {
      message: "Education is required.",
    }),
  })
  .superRefine((schema, context) => {
    if (schema.password !== schema.confirm_password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password do not match!",
        path: ["confirm_password"],
      });
    }

    if (schema.mobile.length !== 11) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile number must be 11 digits.",
        path: ["mobile"],
      });
    } else if (
      schema.mobile.length === 11 &&
      !/(^(\+8801|8801|01|008801))[3-9]{1}(\d){8}$/.test(schema.mobile)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid mobile number.",
        path: ["mobile"],
      });
    }
  });
