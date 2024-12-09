export const menuItems = [
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
      { name: "Service 1", path: "#" },
      { name: "Service 2", path: "#" },
    ],
  },
  {
    id: 3,
    name: "Join Us",
    path: "/join-us",
    submenu: [
      { name: "As a donor", path: "/signup/donor" },
      { name: "As a volunteer", path: "/signup/volunteer" },
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
];
