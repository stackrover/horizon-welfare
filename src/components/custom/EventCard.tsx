import { EventCardProps } from "@/types/types";
import { IconArrowRight, IconBellRinging } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function EventCard({ day, month, title, url }: EventCardProps) {
  return (
    <div className="flex justify-between gap-x-5 rounded-[20px] bg-gradient-to-r from-primary-light to-primary px-8 py-6">
      <div className="flex flex-col items-start gap-y-2">
        <h3 className="text-5xl font-medium text-base-0">{day}</h3>
        <h6 className="text-base font-medium leading-[18px] text-base-0">
          {month}
        </h6>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-4">
          <h4 className="text-base font-medium leading-[18px] text-base-0">
            NEXT EVENT
          </h4>
          <div className="h-0.5 w-10 bg-base-0"></div>
        </div>
        <h3 className="text-[28px] font-bold leading-[42px] text-base-0">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-x-2">
        <Link href={url}>
          <Button
            variant="light"
            className="h-[56px] w-[56px] rounded-full"
            size="icon"
          >
            <IconArrowRight size={24} />
          </Button>
        </Link>
        <Button
          variant="light"
          className="h-[56px] w-[56px] rounded-full"
          size="icon"
        >
          <IconBellRinging size={24} />
        </Button>
      </div>
    </div>
  );
}
