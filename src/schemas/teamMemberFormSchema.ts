import { z } from "zod";

export const teamMemberEntryFormSchema = z.object({
  name: z.string({ required_error: "Team member name is required." }),
  position: z.string({ required_error: "Position is required." }),
  image: z.instanceof(File),
  facebook_link: z.string().url().optional(),
  twitter_link: z.string().url().optional(),
  linkedin_link: z.string().url().optional(),
  status: z.string(),
});

export const teamMemberUpdateFormSchema = teamMemberEntryFormSchema.extend({
  image: z.instanceof(File).optional(),
});
