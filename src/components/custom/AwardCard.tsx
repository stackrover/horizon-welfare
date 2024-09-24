import React from "react";

type AwardCardProps = {
  icon: React.ReactNode;
  year: string;
  name: string;
  place: string;
};

export function AwardCard({ icon, year, name, place }: AwardCardProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-fit flex-col items-center gap-y-1">
        {icon}
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
