"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProfileNavItemProps } from "@/types/types";
import {
  IconBell,
  IconClock,
  IconHeart,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function VolunteerProfileNav() {
  return (
    <nav className="container mt-10 flex items-center justify-between">
      <ul className="flex items-center gap-3">
        <ProfileNavItem path="/volunteer/profile">
          <IconSettings size={24} />
          <span>Home</span>
        </ProfileNavItem>

        <ProfileNavItem path="/volunteer/transactions">
          <IconBell size={24} />
          <span>Subscription</span>
        </ProfileNavItem>

        <ProfileNavItem path="/volunteer/transactions">
          <IconHeart size={24} />
          <span>All Projects Subscription</span>
        </ProfileNavItem>

        <ProfileNavItem path="/volunteer/transactions">
          <IconClock size={24} />
          <span>Transaction History</span>
        </ProfileNavItem>
      </ul>
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
