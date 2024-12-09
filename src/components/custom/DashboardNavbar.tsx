import {
  IconBell,
  IconChevronDown,
  IconLogout2,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export function DashboardNavbar() {
  return (
    <div className="sticky inset-x-0 left-0 top-0 flex h-16 flex-row items-center border-b bg-white px-6">
      <div className="ml-auto flex items-center gap-x-5">
        <Button size="icon" variant="ghost">
          <IconBell />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
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
            <DropdownMenuItem className="flex flex-row items-center gap-1.5">
              <IconUser size={17} /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row items-center gap-1.5">
              <IconSettings size={17} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row items-center gap-1.5">
              <IconLogout2 size={17} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
