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
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("", className)}>
      <ul className="flex items-center gap-x-2">
        {menuItems.map((menu) =>
          !menu?.submenu ? (
            <li
              key={menu.id}
              data-link={menu.path === pathname}
              className={`text-lg font-extrabold transition-all duration-200 ease-in-out hover:text-primary data-[link=true]:text-primary`}
            >
              <Link className="px-2 py-1" href={menu.path}>
                {menu.name}
              </Link>
            </li>
          ) : (
            <li key={menu.id}>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer items-center text-lg font-extrabold transition-all duration-200 ease-in-out hover:text-primary">
                    <h4 className="">{menu.name}</h4>
                    <IconChevronDown className="mt-1" size={20} stroke={3} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
