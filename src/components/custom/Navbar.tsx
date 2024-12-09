"use client";

import { Logo, Nav } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  return (
    <header className="sticky left-0 top-0 z-50 h-[70px] bg-base-0 shadow 2xl:h-[113px]">
      <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between px-4">
        {/* logo section  */}

        <button onClick={() => router.push("/")}>
          <Logo
            className=""
            imageClass="2xl:h-[73px] h-[60px] w-fit 2xl:w-[132px]"
            textClass="2xl:text-2xl text-xl text-start leading-5 2xl:leading-6 sm:block hidden"
            logo="/img/footer/logo.png"
          />
        </button>

        {/* nav section  */}
        <Nav className="hidden 2xl:flex" />

        {/* button section  */}
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            className="hidden h-[45px] px-6 text-lg 2xl:flex"
            asChild
          >
            <Link href="/login">Donate Now</Link>
          </Button>
          <Button className="hidden h-[45px] px-6 text-lg 2xl:flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="mr-2 flex h-10 px-3 2xl:hidden">
            <Link href="/login">Login</Link>
          </Button>

          {/* hidden dropdown menu for small device  */}

          <Sheet>
            <SheetTrigger asChild>
              <button className="block 2xl:hidden" type="button">
                <IconMenu2 size={32} className="text-primary" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="hidden">
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
              <div>
                <Nav />
                <Button
                  variant="secondary"
                  className="mr-2 mt-2 flex h-10 w-full px-3 2xl:hidden"
                >
                  <Link href="/projects">Donate Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
