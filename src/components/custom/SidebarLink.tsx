"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  title: string;
  url: string;
  className?: string;
};

export function SidebarLink({ title, url, className }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      data-active={
        url === "/admin/dashboard" ? pathname === url : pathname.startsWith(url)
      }
      href={url}
      className={cn(
        'group relative mb-1 block w-full px-3 text-base font-semibold before:absolute before:inset-y-0 before:left-0 before:top-0 before:w-1 before:rounded-r-md before:content-[""] data-[active="true"]:before:bg-primary active:[&>span]:bg-primary/50',
        className,
      )}
    >
      <span className="block rounded-md px-4 py-2 hover:bg-primary/30 group-data-[active=true]:bg-sidebar-grd group-data-[active=true]:text-primary-foreground">
        {title}
      </span>
    </Link>
  );
}
