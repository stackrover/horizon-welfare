import { z } from "zod";

export const EventCreateSchema = z.object({
  project_id: z.string({ required_error: "Project id is required." }),
  title: z.string({ required_error: "Event title is required." }),
  description: z.string({ required_error: "Description is required." }),
  thumbnail: z.instanceof(File),
  location: z.string({ required_error: "Location is required." }),
  map_link: z
    .string({ required_error: "Map link is required." })
    .url("Please provide a valid URL."),

  meet_link: z
    .string({ required_error: "Meet link is required." })
    .url("Please provide a valid URL."),

  zoom_link: z
    .string({ required_error: "Zoom link is required." })
    .url("Please provide a valid URL."),

  schedule_date: z.string().date(),
  schedule_time: z.string({ required_error: "Event time is required." }),
  status: z.enum(["upcoming", "active", "completed", "cancelled", "pending"]),
});
