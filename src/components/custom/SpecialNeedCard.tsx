import React from "react";

type SpecialNeedCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

export function SpecialNeedCard({ icon, title, text }: SpecialNeedCardProps) {
  return (
    <div className="flex items-start justify-start gap-x-4">
      <div>{icon}</div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl font-bold leading-7 text-base-0">{title}</h3>
        <h6 className="text-sm font-normal leading-[22px] text-base-200">
          {text}
        </h6>
      </div>
    </div>
  );
}
