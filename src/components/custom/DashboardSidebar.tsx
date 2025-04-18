import { SidebarLink } from "@/components";
import _ from "lodash";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const sidebarItems = [
  {
    id: "overviews",
    title: "",
    childrens: [
      { id: "dashboard", title: "Dashboard", pathname: "" },
      { id: "campaigns", title: "Campaigns", pathname: "/campaigns" },
      { id: "packages", title: "Subscription Packages", pathname: "/packages" },
      { id: "transactions", title: "Transactions", pathname: "/transactions" },
      { id: "donors", title: "Donors", pathname: "/donors" },
      { id: "volunteers", title: "Volunteers", pathname: "/volunteers" },
      { id: "blogs", title: "Blogs", pathname: "/blogs" },
      { id: "events", title: "Events", pathname: "/events" },
      { id: "messages", title: "Messages", pathname: "/messages" },
    ],
  },
  {
    id: "pages",
    title: "Pages",
    prefix: "/pages",
    childrens: [
      { id: "home", title: "Home", pathname: "/home" },
      { id: "what-we-do", title: "What we do", pathname: "/what-we-do" },
      { id: "media-center", title: "Media center", pathname: "/media-center" },
      { id: "donate-now", title: "Donate now", pathname: "/donate-now" },
      { id: "contact-us", title: "Contact Us", pathname: "/contact-us" },
      { id: "about-us", title: "About Us", pathname: "/about-us" },
      {
        id: "video-gallery",
        title: "Video gallery",
        pathname: "/video-gallery",
      },
    ],
  },
  {
    id: "about_us",
    title: "About us",
    childrens: [
      {
        id: "awards",
        title: "Awards",
        pathname: "/awards",
      },
      {
        id: "teams",
        title: "Our teams",
        pathname: "/teams",
      },

      {
        id: "partners",
        title: "Partners",
        pathname: "/partners",
      },
    ],
  },

  {
    id: "settings",
    title: "Settings",
    childrens: [
      {
        id: "settings",
        title: "Settings",
        pathname: "/settings",
      },
    ],
  },
];

export function DashboardSiebar() {
  return (
    <div className="sticky inset-y-0 top-0 z-10 flex h-screen w-72 flex-col border-r bg-white">
      {/* Logo */}
      <div className="px-4 py-2">
        <Image
          className={"h-[73px] w-[132px]"}
          height={73}
          width={132}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
          src="/images/logo.png"
          alt="Logo"
        />
      </div>

      {/* Sidebar items */}
      <ScrollArea className="flex-1">
        {_.map(sidebarItems, (item) => (
          <ul key={item.id} className="border-b py-4 last:border-b-0">
            {item.title ? (
              <li className="mb-4 ml-4 text-sm font-semibold text-muted-foreground">
                {_.toUpper(item.title)}
              </li>
            ) : null}
            {_.map(item.childrens, (child) => (
              <li key={child.id}>
                <SidebarLink
                  key={child.id}
                  title={child.title}
                  url={`/admin/dashboard${item.prefix ? `${item.prefix}` : ""}${child.pathname}`}
                />
              </li>
            ))}
          </ul>
        ))}
      </ScrollArea>
    </div>
  );
}
