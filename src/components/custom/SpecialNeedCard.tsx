import { SpecialNeedCardProps } from "@/types/types";
import Image from "next/image";

export function SpecialNeedCard({
  iconUrl,
  title,
  text,
}: SpecialNeedCardProps) {
  return (
    <div className="flex items-start justify-start gap-x-4">
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${iconUrl}`}
          alt="Banner"
          className="h-7 w-fit min-w-7"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl font-bold leading-7 text-base-0">{title}</h3>
        <h6 className="text-sm font-normal leading-[22px] text-base-200">
          {text}
        </h6>
      </div>
    </div>
  );
}
