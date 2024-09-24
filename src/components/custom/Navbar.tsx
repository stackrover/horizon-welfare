"use client";

import { Button } from "@/components/ui/button";

import { LanguageChangeDropdown, Logo, Nav } from "@/components";

import * as React from "react";

export function Navbar() {
  const [position, setPosition] = React.useState("ENG");
  return (
    <header className="sticky left-0 top-0 z-50 h-[113px] bg-base-0 shadow">
      <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between">
        {/* logo section  */}
        <Logo />
        {/* nav section  */}
        <Nav />

        {/* button section  */}
        <div className="flex items-center gap-x-2">
          <Button className="h-[45px] px-6 text-lg">Donate Now</Button>
          <LanguageChangeDropdown value={position} setValue={setPosition} />
        </div>
      </div>
    </header>
  );
}
