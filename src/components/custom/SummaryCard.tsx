import { SummaryCardProps } from "@/types/types";
import Image from "next/image";

export function SummaryCard({ imageUrl, title, subTitle }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-x-4 rounded-[9px] bg-base-0 px-8 py-5 shadow-[2px_10px_30px_rgba(0,0,0,0.07)]">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${imageUrl}`}
        alt="Banner"
        className="h-[107px] w-[107px]"
        width={1000}
        height={100}
      />
      <div>
        <h3 className="text-5xl font-bold leading-[64px] text-primary-light">
          {title}
        </h3>
        <h5 className="text-lg font-extrabold leading-[26px] text-primary-light">
          {subTitle}
        </h5>
      </div>
    </div>
  );
}
