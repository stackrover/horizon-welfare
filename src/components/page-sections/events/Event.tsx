import { TruncateString } from "@/components/custom/TruncateString";
import { EventProps } from "@/types/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getImageURL } from "../../../lib/utils";

export function Event({ image, date, title, description, id }: EventProps) {
  return (
    <div className="group overflow-hidden rounded-[18px] border">
      <div className="h-[200px] overflow-hidden">
        <Image
          src={getImageURL(image)}
          alt="Event"
          height={200}
          width={350}
          className="h-full w-full transition-all duration-150 ease-in group-hover:scale-105"
        />
      </div>

      <div className="flex items-start gap-x-6 p-6">
        <div>
          <h6 className="text-xs font-bold leading-[14px] text-primary">
            {format(new Date(date), "MMM")}
          </h6>
          <h3 className="text-[30px] font-bold leading-[38px]">
            {format(new Date(date), "dd")}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={`/events/${id}`}
            className="text-base font-bold transition-all hover:text-primary"
          >
            <TruncateString length={40}>{title}</TruncateString>
          </Link>
          <p className="text-sm leading-5 text-base-300">
            <TruncateString length={50}>{description}</TruncateString>
          </p>
        </div>
      </div>
    </div>
  );
}
