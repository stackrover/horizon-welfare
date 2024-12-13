import { EventCardProps } from "@/types/types";
import { IconArrowRight, IconBellRinging } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";

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
        <Button
          variant="light"
          className="h-10 w-10 rounded-full sm:h-[56px] sm:w-[56px]"
          size="icon"
        >
          <IconBellRinging size={24} />
        </Button>
      </div>
    </div>
  );
}
