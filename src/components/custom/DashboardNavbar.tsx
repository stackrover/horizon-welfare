import { IconBell, IconChevronDown, IconLogout } from "@tabler/icons-react";
import { handleSignOut } from "../../app/actions/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function DashboardNavbar() {
  return (
    <div className="sticky inset-x-0 left-0 top-0 z-50 flex h-16 flex-row items-center border-b bg-white px-6">
      <div className="ml-auto flex items-center gap-x-5">
        <Button size="icon" variant="ghost">
          <IconBell />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex items-center gap-6 text-left">
            <div className="flex items-center gap-2">
              <Avatar className="">
                <AvatarImage src="" alt="" />
                <AvatarFallback className="border font-bold">AI</AvatarFallback>
              </Avatar>
              <div>
                <h6 className="font-bold"> Azmain Idris </h6>
                <span className="-mt-0.5 block text-xs"> admin </span>
              </div>
            </div>

            <IconChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
            {/* <DropdownMenuItem className="flex flex-row items-center gap-1.5">
              <IconUser size={17} /> Profile
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem className="flex flex-row items-center gap-1.5">
              <IconSettings size={17} /> Settings
            </DropdownMenuItem> */}
            <form action={handleSignOut}>
              <button type="submit" className="w-full">
                <DropdownMenuItem className="gap-x-2 py-2 font-semibold text-base-300">
                  <IconLogout size={20} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
