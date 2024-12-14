import { IconClock, IconHeart, IconSettings } from "@tabler/icons-react";

export const donorNavMenu = [
  {
    id: 1,
    title: "Profile",
    url: "/donor/profile",
    icon: IconSettings,
  },
  {
    id: 2,
    title: "Subscriptions",
    url: "/donor/monthly-subscriptions",
    icon: IconHeart,
  },
  {
    id: 2,
    title: "Available Subscriptions",
    url: "/donor/monthly-available-subscriptions",
    icon: IconHeart,
  },
  {
    id: 3,
    title: "Transaction History",
    url: "/donor/transactions",
    icon: IconClock,
  },
];
