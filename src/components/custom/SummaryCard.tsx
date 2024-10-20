import { SummaryCardProps } from "@/types/types";

export function SummaryCard({ icon, title, subTitle }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-x-4 rounded-[9px] bg-base-0 px-8 py-5 shadow-[2px_10px_30px_rgba(0,0,0,0.07)]">
      {icon}
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
