import {
  IconCalendarStats,
  IconHeartHandshake,
  IconSettings,
} from "@tabler/icons-react";

export const volunteerNavMenu = [
  {
    id: 1,
    title: "Profile",
    url: "/volunteer/profile",
    icon: IconSettings,
  },
  {
    id: 2,
    title: "Subscribed",
    url: "/volunteer/subscribed-projects",
    icon: IconHeartHandshake,
  },
  {
    id: 3,
    title: "Upcoming Projects",
    url: "/volunteer/upcoming-projects",
    icon: IconCalendarStats,
  },
];
