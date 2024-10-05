import { NewsCardProps } from "@/types/types";
import Image from "next/image";

export function NewsCard({ title, date, description, image }: NewsCardProps) {
  return (
    <div className="flex items-center gap-x-4">
      <Image
        src={image}
        alt="Top News"
        width={221}
        height={184}
        className="h-[184px] w-[221px]"
      />
      <div className="flex flex-col gap-y-4">
        <h3 className="text-xl font-bold leading-[30px] text-base-400">
          {title}
        </h3>
        <h5 className="text-sm font-bold leading-[20px] text-base-300">
          {date}
        </h5>
        <h5 className="text-base font-normal leading-[25px] text-base-300">
          {description}
        </h5>
      </div>
    </div>
  );
}
