"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventCardProps } from "@/types/types";
import { IconArrowRight, IconBellRinging } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { InputProps } from "../ui/input";

export function EventCard({ day, month, title, url }: EventCardProps) {
  return (
    <div className="flex justify-between gap-x-3 rounded-[20px] bg-gradient-to-r from-primary-light to-primary px-4 py-4 sm:px-8 sm:py-6">
      <div className="flex flex-col items-start gap-y-1 sm:gap-y-2">
        <h3 className="text-3xl font-medium text-base-0 sm:text-5xl">{day}</h3>
        <h6 className="text-sm font-medium leading-[18px] text-base-0 sm:text-base">
          {month}
        </h6>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-4">
          <h4 className="text-sm font-medium leading-[18px] text-base-0 sm:text-base">
            NEXT EVENT
          </h4>
          <div className="h-0.5 w-10 bg-base-0"></div>
        </div>
        <h3 className="text-xl font-bold text-base-0 sm:text-[28px] sm:leading-[42px]">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-x-2">
        <Link href={url}>
          <Button
            variant="light"
            className="h-10 w-10 rounded-full sm:h-[56px] sm:w-[56px]"
            size="icon"
          >
            <IconArrowRight size={24} />
          </Button>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="light"
              className="h-10 w-10 rounded-full sm:h-[56px] sm:w-[56px]"
              size="icon"
            >
              <IconBellRinging size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[768px] xmd:p-10 mlg:p-20">
            <DialogHeader className="hidden">
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <h1 className="mb-6 text-center text-2xl font-bold text-base-400 xmd:text-3xl">
              Get Notified For the Event
            </h1>
            <form className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="font-semibold text-gray-400"
                >
                  First Name
                </label>
                <FormInput
                  type="text"
                  placeholder="Type your first name"
                  name="first-name"
                  id="first-name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="font-semibold text-gray-400"
                >
                  Last Name
                </label>
                <FormInput
                  type="text"
                  placeholder="Type your last name"
                  name="last-name"
                  id="last-name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="font-semibold text-gray-400">
                  Email
                </label>
                <FormInput
                  type="email"
                  placeholder="Type your email address"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="font-semibold text-gray-400"
                >
                  Mobile
                </label>
                <FormInput
                  type="text"
                  id="subject"
                  placeholder="Type your subject"
                  name="subject"
                  required
                />
              </div>

              <div className="col-span-full flex justify-center">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const FormInput = ({ type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      {...props}
      className="h-10 w-full border-b bg-transparent outline-none transition-all focus:border-b focus:border-primary focus:outline-none active:outline-none"
    />
  );
};
