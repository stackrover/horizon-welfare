import { z } from "zod";

export const projectCreateSchema = z.object({
  category_id: z.string().min(1, "Category ID is required"),
  title: z.string().min(1, "Title is required"),
  manager_img: z.instanceof(File, {
    message: "Manager image is required.",
  }),
  manager_name: z.string().min(1, "Name is required"),
  manager_email: z.string().min(1, "Email is required"),
  manager_mobile: z.string().min(1, "Mobile is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.instanceof(File, {
    message: "Thumbnail is required.",
  }),
  goal_amount: z.coerce.number().min(1, "Goal amount must be greater than 0"),
  collection_days: z.coerce
    .number()
    .min(1, "Collection days must be at least 1"),
  volunteer_need: z.coerce.number().min(0, "Volunteer need cannot be negative"),
  is_emergency: z.enum(["1", "0"], {
    errorMap: () => ({ message: "Invalid option" }),
  }),
  status: z.enum(["active", "inactive", "pending", "completed"], {
    errorMap: () => ({ message: "Invalid status value" }),
  }),
  documents: z.array(z.instanceof(File)).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export const projectUpdateSchema = z.object({
  category_id: z.string().min(1, "Category ID is required"),
  title: z.string().min(1, "Title is required"),
  manager_img: z.instanceof(File).optional(),
  manager_name: z.string().min(1, "Name is required"),
  manager_email: z.string().min(1, "Email is required"),
  manager_mobile: z.string().min(1, "Mobile is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.instanceof(File).optional(),
  goal_amount: z.coerce.number().min(1, "Goal amount must be greater than 0"),
  collection_days: z.coerce
    .number()
    .min(1, "Collection days must be at least 1"),
  volunteer_need: z.coerce.number().min(0, "Volunteer need cannot be negative"),
  is_emergency: z.enum(["1", "0"], {
    errorMap: () => ({ message: "Invalid option" }),
  }),
  status: z.enum(["active", "inactive", "pending", "completed"], {
    errorMap: () => ({ message: "Invalid status value" }),
  }),
  documents: z.array(z.instanceof(File)).optional(),
  images: z.array(z.instanceof(File)).optional(),
});
