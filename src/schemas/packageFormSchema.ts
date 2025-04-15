import { z } from "zod";

export const packageAddFormSchema = z.object({
  project_id: z.string().min(1, { message: "Package ID is required." }),
  subscription_rate: z.coerce
    .number()
    .min(1, { message: "Subscription rate must be greater than 0" }),
  status: z.string().min(1, { message: "Status is required." }),
});

export const packageUpdateFormSchema = z.object({
  project_id: z.string().min(1, { message: "Package ID is required." }),
  subscription_rate: z.coerce
    .number()
    .min(1, { message: "Subscription rate must be greater than 0" }),
  status: z.string().min(1, { message: "Status is required." }),
});
