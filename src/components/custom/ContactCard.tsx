import React from "react";

type ContactCardProp = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

export function ContactCard({ icon, title, subtitle }: ContactCardProp) {
  return (
    <div className="flex w-[330px] items-center gap-x-2 rounded-[20px] bg-base-0 px-6 py-4 shadow-lg">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-primary-light to-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-semibold leading-[26px] text-base-400">
          {title}
        </h4>
        <h4 className="text-xl font-normal leading-[26px] text-base-300">
          {subtitle}
        </h4>
      </div>
    </div>
  );
}
