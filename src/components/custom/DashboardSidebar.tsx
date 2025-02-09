import Image from "next/image";
import _ from "lodash";
import { SidebarLink } from "@/components";

const sidebarItems = [
  {
    id: "overviews",
    title: "",
    childrens: [
      { id: "dashboard", title: "Dashboard", pathname: "/" },
      { id: "transactions", title: "Transactions", pathname: "/transactions" },
      { id: "donors", title: "Donors", pathname: "/donors" },
      { id: "campagin", title: "Campaign", pathname: "/campaign" },
      { id: "volunteers", title: "Volunteers", pathname: "/volunteers" },
    ],
  },
  {
    id: "pages",
    title: "Pages",
    prefix: "/pages",
    childrens: [
      { id: "home", title: "Home", pathname: "/home" },
      { id: "what-we-do", title: "What we do", pathname: "/what-we-do" },
      { id: "volunteers", title: "Volunteers", pathname: "/volunteers" },
      { id: "media-center", title: "Media center", pathname: "/media-center" },
      { id: "donate-now", title: "Donate now", pathname: "/donate-now" },
      {
        id: "video-gallery",
        title: "Video gallery",
        pathname: "/video-gallery",
      },
    ],
  },
  {
    id: "site-management",
    title: "",
    childrens: [
      { id: "settings", title: "Settings", pathname: "/settings" },
      { id: "logout", title: "Logout", pathname: "/logout" },
    ],
  },
];

export function DashboardSiebar() {
  return (
    <div className="sticky inset-y-0 top-0 h-screen w-72 border-r bg-white">
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
    </div>
  );
}
