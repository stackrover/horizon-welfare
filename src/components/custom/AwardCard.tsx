import { AwardCardProps } from "@/types/types";
import Image from "next/image";
import { getImageURL } from "../../lib/utils";

export function AwardCard({ imageUrl, year, name, place }: AwardCardProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-fit flex-col items-center gap-y-1">
        <Image
          src={getImageURL(imageUrl)}
          height={119}
          width={92}
          alt="Award Image"
        />
        <h3 className="mb-1 text-2xl font-bold leading-[38px] text-base-400">
          {year}
        </h3>
        <h4 className="text-base font-bold leading-[25px] text-base-400">
          {name}
        </h4>
        <h5 className="text-xs font-medium leading-[20px] text-base-400">
          {place}
        </h5>
      </div>
    </div>
  );
}
