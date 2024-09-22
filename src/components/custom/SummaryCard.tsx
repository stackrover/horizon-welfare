import React from "react";

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  subTitle: string;
};

export function SummaryCard({ icon, title, subTitle }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-x-4 rounded-lg bg-base-0 px-6 py-6 shadow-lg">
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
