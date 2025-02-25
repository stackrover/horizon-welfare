"use client";

import { handleSignOut } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBell, IconChevronDown, IconLogout2 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

export function DashboardNavbar() {
  const session = useSession();

  return (
    <div className="sticky inset-x-0 left-0 top-0 z-50 flex h-16 flex-row items-center border-b bg-white px-6">
      <div className="ml-auto flex items-center gap-x-5">
        <Button size="icon" variant="ghost">
          <IconBell />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-6 text-left">
            <div className="flex items-center gap-2">
              <div>
                <h6 className="font-bold"> {session?.data?.user?.name} </h6>
                <span className="-mt-0.5 block text-xs">
                  {session?.data?.user?.role}
                </span>
              </div>
            </div>

            <IconChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
            <form action={handleSignOut}>
              <button type="submit" className="w-full">
                <DropdownMenuItem className="flex flex-row items-center gap-1.5">
                  <IconLogout2 size={17} />
                  Logout
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
