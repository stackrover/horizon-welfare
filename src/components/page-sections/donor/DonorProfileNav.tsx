"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProfileNavItemProps } from "@/types/types";
import {
  IconClock,
  IconHeart,
  IconMenu2,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const donorNavMenu = [
  {
    id: 1,
    title: "Profile",
    url: "/donor/profile",
    icon: IconSettings,
  },
  {
    id: 2,
    title: "Active Subscriptions",
    url: "/donor/active-subscriptions",
    icon: IconHeart,
  },
  {
    id: 3,
    title: "Transaction",
    url: "/donor/transaction",
    icon: IconClock,
  },
];

export function DonorProfileNav() {
  const pathname = usePathname();
  return (
    <nav className="container mt-10 flex items-center justify-between">
      {/* hidden on small device  */}
      <ul className="hidden items-center gap-3 lg:flex">
        {donorNavMenu.map((menu) => (
          <ProfileNavItem key={menu.id} path={menu.url}>
            <menu.icon size={24} />
            <span>{menu.title}</span>
          </ProfileNavItem>
        ))}
      </ul>

      {/* hidden on large device  */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="lg:hidden">
          <Button size="icon">
            <IconMenu2 size={20} />{" "}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="px-2">
          {donorNavMenu.map((menu) => (
            <Link key={menu.id} href={menu.url}>
              <DropdownMenuItem
                data-active={pathname.startsWith(menu.url)}
                className="my-1 gap-2 px-2.5 py-2 text-base font-semibold text-base-400 transition-all duration-200 ease-in-out data-[active=true]:bg-[#BEF2FF]"
              >
                <menu.icon size={24} />
                <span>{menu.title}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative">
        <Input type="search" placeholder="Search..." className="pl-9" />
        <div className="absolute left-0 top-0 flex h-full items-center justify-center pl-2.5">
          <IconSearch size={20} className="text-base-300" />
        </div>
      </div>
    </nav>
  );
}

const ProfileNavItem = ({ children, className, path }: ProfileNavItemProps) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        data-active={pathname.startsWith(path)}
        href={path}
        className={cn(
          "flex h-10 items-center gap-2 rounded-md px-4 py-2 text-base font-medium leading-5 text-base-400 transition-all duration-200 ease-in-out hover:bg-[#BEF2FF] data-[active=true]:bg-[#BEF2FF]",
          className,
        )}
      >
        {children}
      </Link>
    </li>
  );
};
