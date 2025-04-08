"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuItems } from "@/constants/menuItems";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({
  className,
  auth,
}: {
  className?: string;
  auth: Session | null;
}) {
  const pathname = usePathname();
  return (
    <nav className={cn("", className)}>
      <ul className="flex flex-col items-stretch gap-y-1 2xl:flex-row 2xl:items-center 2xl:gap-x-2">
        {menuItems(auth).map((menu) =>
          !menu?.submenu ? (
            <li
              key={menu.id}
              data-link={menu.path === pathname}
              className={`rounded-md text-lg font-extrabold transition-all duration-200 ease-in-out hover:bg-primary/20 hover:text-black data-[link=true]:bg-primary data-[link=true]:text-base-0 2xl:hover:bg-base-0 2xl:hover:text-primary 2xl:data-[link=true]:bg-base-0 2xl:data-[link=true]:text-primary`}
            >
              <Link
                className="inline-block px-4 py-2 2xl:px-2 2xl:py-1"
                href={menu.path}
              >
                {menu.name}
              </Link>
            </li>
          ) : (
            <li key={menu.id}>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  asChild
                  className="w-full rounded-md px-4 py-2 hover:bg-primary/20 hover:text-black 2xl:w-fit 2xl:px-2 2xl:py-1 2xl:hover:bg-base-0 2xl:hover:text-primary"
                >
                  <div className="flex cursor-pointer items-center text-lg font-extrabold transition-all duration-200 ease-in-out">
                    <h4 className="">{menu.name}</h4>
                    <IconChevronDown className="mt-1" size={20} stroke={3} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-40 sm:w-60"
                  sideOffset={8}
                >
                  {menu.submenu?.map((submenu, index) => (
                    <DropdownMenuItem
                      key={index}
                      asChild
                      className="cursor-pointer px-4 text-lg"
                    >
                      <Link
                        href={submenu.path}
                        className="text-base font-normal"
                      >
                        {submenu.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
