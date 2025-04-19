import { SummaryCardProps } from "@/types/types";

export function SummaryCard({ image, title, subTitle }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-x-4 rounded-[9px] bg-base-0 px-6 py-5 shadow-[2px_10px_30px_rgba(0,0,0,0.07)] 3xl:px-8">
      {image}
      <div>
        <h3 className="text-3xl font-bold leading-[64px] text-primary-light xl:text-5xl">
          {title}
        </h3>
        <h5 className="text-base font-extrabold leading-[26px] text-primary-light xl:text-lg">
          {subTitle}
        </h5>
      </div>
    </div>
  );
}
