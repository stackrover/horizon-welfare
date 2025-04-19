"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserDetail } from "@/data/users/UserDetails";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

export default function UserDetailsDrawer({
  userId,
  className,
  showIcon = true,
  isOpen = false,
  setIsOpen,
}: {
  userId: number | null;
  className?: string;
  showIcon?: boolean;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  const { data, isLoading } = useSWR(`user/details/${userId}`);

  const userDetail = new UserDetail(data?.data?.results);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-3 w-full max-w-[450px] rounded-xl bg-background after:!bg-transparent">
        <DrawerHeader className="relative">
          <DrawerTitle> Details </DrawerTitle>
          <DrawerDescription className="hidden" />

          <DrawerClose asChild className="absolute right-2 top-2">
            <Button variant="ghost" size="icon">
              <IconX size={18} className="opacity-70" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="w-full p-4">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div>
              <div className="relative mb-20 px-2">
                <Image
                  src={
                    getImageURL(userDetail.bannerImage) ||
                    "/images/banner-placeholder.png"
                  }
                  alt="Banner Image"
                  width={400}
                  height={300}
                  className="aspect-video w-full rounded-md"
                />
                <div className="absolute left-1/2 top-full flex -translate-x-1/2 -translate-y-1/2 justify-center">
                  <Image
                    src={
                      getImageURL(userDetail.profileImage) ||
                      "/images/user-placeholder.png"
                    }
                    alt="Profile Image"
                    width={200}
                    height={200}
                    className="aspect-square w-[160px] rounded-full border-8 border-base-0"
                  />
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-center text-2xl font-semibold">
                  {userDetail.name}
                </h1>
                <p className="text-center text-base opacity-70">
                  {userDetail.email}
                </p>
                <p className="text-center text-sm opacity-70">
                  {userDetail.mobile}
                </p>
              </div>
              <Table>
                <TableBody className="[&_tr]:!border-none">
                  <TableRow>
                    <TableCell className="opacity-70"> Nationality </TableCell>
                    <TableCell className="text-right font-medium">
                      {userDetail.nationality}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="opacity-70">Age</TableCell>
                    <TableCell className="text-right">
                      <span
                        data-status={"active"}
                        className="ml-auto flex w-fit items-center gap-1 rounded-xl p-1 text-xs font-medium data-[status=cancelled]:bg-red-50 data-[status=completed]:bg-[#e9f5e3] data-[status=pending]:bg-[#fef6e8] data-[status=cancelled]:text-red-500 data-[status=completed]:text-[#45a216] data-[status=pending]:text-[#d59a02]"
                      >
                        {userDetail.age}
                      </span>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="opacity-70"> Gender </TableCell>
                    <TableCell className="text-right font-medium">
                      {userDetail.gender}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="opacity-70"> Status </TableCell>
                    <TableCell className="text-right">
                      {userDetail.status}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="opacity-70"> Address </TableCell>
                    <TableCell className="text-right">
                      {userDetail.address}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="opacity-70"> Joined </TableCell>
                    <TableCell className="text-right">
                      {userDetail.createdAt}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
