import { z } from "zod";

export const PartnerAddFormSchema = z.object({
  title: z.string({ required_error: "Title name is required." }),
  logo: z.instanceof(File),
  status: z.string().optional().default("active"),
});

export const PartnerEditFormSchema = PartnerAddFormSchema.extend({
  logo: z.instanceof(File).optional(),
});
