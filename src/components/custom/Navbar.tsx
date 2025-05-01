import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "@/auth";
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
import { IconLogout, IconMenu2, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { getImageURL } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export async function Navbar() {
  const session = await auth();

  const getPrefixAccordingBaseRole = (role: string): string => {
    switch (role) {
      case "donor":
        return "/donor/profile";
      case "volunteer":
        return "/volunteer/profile";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="sticky left-0 top-0 z-50 h-[70px] bg-base-0 shadow 2xl:h-[113px]">
      <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between px-4">
        {/* logo section  */}

        <Link href="/">
          <Logo
            className=""
            imageClass="2xl:h-[73px] h-[60px] w-fit 2xl:w-[132px]"
            textClass="2xl:text-2xl text-xl text-start leading-5 2xl:leading-6 sm:block hidden"
            logo="/img/footer/logo.png"
          />
        </Link>

        {/* nav section  */}
        <Nav auth={session} className="hidden 2xl:flex" />

        {/* button section  */}
        <div
          data-session={session?.user?.id ? true : false}
          className="group flex items-center gap-x-2"
        >
          <Link href="/projects" className="">
            <Button
              variant="outline"
              className="hidden h-[45px] px-6 text-lg 2xl:flex"
            >
              Donate Now
            </Button>
          </Link>
          <Link href="/login" className="group-data-[session=true]:hidden">
            <Button className="mr-2 flex h-10 px-3 2xl:mr-0 2xl:h-[45px] 2xl:px-6 2xl:text-lg">
              Login
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer group-data-[session=false]:hidden"
            >
              <Avatar className="2xl:h-[45px] 2xl:w-[45px]">
                <AvatarImage
                  src={
                    session?.user?.image
                      ? getImageURL(session?.user?.image as string)
                      : "/images/user-placeholder.png"
                  }
                  alt="user"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[200px]"
              sideOffset={10}
            >
              <DropdownMenuLabel>
                <p className="text-base capitalize text-base-400">
                  {session?.user?.name || ""}
                </p>
                <p className="font-normal capitalize text-base-300">
                  {session?.user?.role || ""}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                href={
                  session?.user?.role
                    ? getPrefixAccordingBaseRole(session?.user?.role)
                    : "/login"
                }
              >
                <DropdownMenuItem className="gap-x-2 py-2 font-semibold text-base-300">
                  <IconUser size={20} />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>

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
                <Nav auth={session} />
                <Button
                  variant="secondary"
                  className="mr-2 mt-2 flex h-10 w-full px-3 2xl:hidden"
                >
                  <Link
                    href={
                      session?.user?.role === "donor" ? "/projects" : "/login"
                    }
                  >
                    Donate Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
