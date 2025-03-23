import { z } from "zod";

export const AwardFormSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  venue: z.string({ required_error: "Venue is required." }),
  year: z.string({ required_error: "Year is required." }),
  logo: z.instanceof(File),
  status: z.string().optional(),
});

export const EditAwardFormSchema = AwardFormSchema.extend({
  logo: z.instanceof(File).optional(),
});
