"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { DonorData } from "@/data";
import { getImageURL } from "@/lib/utils";
import { IconEye, IconX } from "@tabler/icons-react";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

export default function DonorProfileDrawer({ donor }: { donor: DonorData }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconEye />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-3 w-full max-w-[450px] rounded-xl bg-background after:!bg-transparent">
        <DrawerHeader className="relative">
          <div className="flex items-center gap-4">
            <Image
              src={
                getImageURL(donor.getProfileImage()) ||
                "/images/user-placeholder.png"
              }
              alt=""
              width={48}
              height={48}
              className="aspect-square rounded-full"
            />
            <div className="flex-1">
              <DrawerTitle className="leading-8">{donor.getName()}</DrawerTitle>
              <DrawerDescription className="">
                {donor.getEmail()}
              </DrawerDescription>
            </div>
          </div>

          <DrawerClose asChild className="absolute right-2 top-2">
            <Button variant="ghost" size="icon">
              <IconX size={18} className="opacity-70" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col gap-y-2.5 p-4">
          {/* Name */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70"> Name </div>
            <div className="text-right"> {donor.getName()} </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70"> Mobile </div>
            <div className="text-right"> {donor.getMobile()} </div>
          </div>

          {/* Email */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70"> Email </div>
            <div className="text-right"> {donor.getEmail()} </div>
          </div>

          {/* Gender */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70"> Gender </div>
            <div className="text-right"> {_.startCase(donor.getGender())} </div>
          </div>

          {/* Nationality */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70">Nationality</div>
            <div className="text-right"> {donor.getNationality()} </div>
          </div>

          {/* Account status */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70">Account status</div>
            <div className="text-right">
              <span
                data-status={donor.getStatus()}
                className="ml-auto flex w-fit items-center gap-1 rounded-xl px-1.5 py-0.5 text-xs font-medium data-[status=active]:bg-[#e9f5e3] data-[status=inactive]:bg-red-50 data-[status=pending]:bg-[#fef6e8] data-[status=active]:text-[#45a216] data-[status=inactive]:text-red-500 data-[status=pending]:text-[#d59a02]"
              >
                {_.startCase(donor.getStatus())}
              </span>
            </div>
          </div>

          {/* Total donation amount */}
          <div className="flex flex-nowrap items-center gap-4 text-sm">
            <div className="flex-1 opacity-70">Total donate</div>
            <div className="text-right font-bold">
              {`${donor.getTotalDonation()} ${donor.getCurrency()}`}
            </div>
          </div>
        </div>

        <Separator className="my-2.5" />

        <div className="">
          <h3 className="mb-4 px-4 font-medium opacity-70">
            Transactions details
          </h3>

          <div className="flex gap-1.5 text-xs font-bold text-gray-600 [&_div]:px-4 [&_div]:py-1">
            <div className="line-clamp-1 flex-1">Trx. ID</div>
            <div className="text-right">Amount</div>
          </div>

          {donor.getDonations()?.map((trx) => (
            <div
              key={trx.getId()}
              className="flex gap-1.5 text-sm text-gray-600 odd:bg-neutral-100 [&_div]:px-4 [&_div]:py-2"
            >
              <div className="line-clamp-1 flex-1">
                <Link
                  href={`/admin/dashboard/transactions?trxId=${trx.getTrxId()}`}
                  className="hover:underline"
                >
                  {trx.getTrxId()}
                </Link>
              </div>
              <div className="whitespace-nowrap text-right font-semibold">{`${trx.getAmount()} ${trx.getCurrency()}`}</div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
