import { Session } from "next-auth";

export const menuItems = (auth: Session | null) => [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Services",
    path: "/service",
    submenu: [
      { name: "What We Do", path: "/what-we-do" },
      { name: "Media Center", path: "/media-center" },
      { name: "Video Gallery", path: "/video-gallery" },
      { name: "Events", path: "/events" },
    ],
  },
  {
    id: 4,
    name: "Contact Us",
    path: "/contact-us",
  },
  {
    id: 5,
    name: "Donate",
    path: "/projects",
  },
  {
    id: 6,
    name: "About Us",
    path: "/about-us",
  },
  {
    id: 3,
    name: auth?.user?.id ? "Pay Zakat" : "Join Us",
    path: auth?.user?.id ? "/zakat-calculator" : "/login",
    submenu: auth?.user?.id
      ? null
      : [
          { name: "As a donor", path: "/signup/donor" },
          { name: "As a volunteer", path: "/signup/volunteer" },
        ],
  },
];
