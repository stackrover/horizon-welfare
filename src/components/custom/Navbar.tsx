"use client";

import { LanguageChangeDropdown, Logo, Nav } from "@/components";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function Navbar() {
  const [position, setPosition] = React.useState("ENG");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky left-0 top-0 z-50 h-[80px] bg-base-0 shadow 2xl:h-[113px]">
      <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between px-4">
        {/* logo section  */}
        <Logo className="" logo="/img/footer/1730228736-hand-shake.png" />
        {/* nav section  */}
        <Nav className="hidden 2xl:flex" />

        {/* button section  */}
        <div className="hidden items-center gap-x-2 2xl:flex">
          <Button className="h-[45px] px-6 text-lg">Donate Now</Button>
          <LanguageChangeDropdown value={position} setValue={setPosition} />
        </div>

        {/* hidden dropdown menu for small device  */}
        {/* <button
          className="block border 2xl:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <IconMenu2 size={32} />
        </button> */}

        {/* <DropdownMenu
          open={isOpen}
          onOpenChange={(open) => !open && setIsOpen(false)}
          modal={false}
        >
          <DropdownMenuTrigger>open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
}
