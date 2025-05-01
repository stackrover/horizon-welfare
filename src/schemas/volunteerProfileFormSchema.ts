import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])[a-zA-Z0-9\S]{6,}$/;

export const volunteerProfileFormSchema = z
  .object({
    f_name: z.string().min(1, {
      message: "First name is required.",
    }),
    l_name: z.string().min(1, {
      message: "Last name is required.",
    }),
    division: z.string().min(1, {
      message: "Select one.",
    }),
    district: z.string().min(1, {
      message: "Select one.",
    }),
    thana: z.string().min(1, {
      message: "Select one.",
    }),
    age: z.number({ required_error: "Age is required." }),
    gender: z.string().min(1, {
      message: "Choose a gender.",
    }),
    nationality: z.string().min(1, {
      message: "Nationality is required.",
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
    blood_group: z.string().min(1, {
      message: "Select a blood group.",
    }),
    mobile_number: z.string().min(1, {
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
    if (schema.mobile_number.length !== 11) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile number must be 11 digits.",
        path: ["mobile_number"],
      });
    } else if (
      schema.mobile_number.length === 11 &&
      !/(^(\+8801|8801|01|008801))[3-9]{1}(\d){8}$/.test(schema.mobile_number)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid mobile number.",
        path: ["mobile_number"],
      });
    }
  });
