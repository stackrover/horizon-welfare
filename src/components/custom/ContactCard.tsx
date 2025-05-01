import { ContactCardProps } from "@/types/types";

export function ContactCard({ icon, title, subtitle }: ContactCardProps) {
  return (
    <div className="flex w-full max-w-[350px] items-center gap-x-2 rounded-[20px] bg-base-0 px-4 py-3 shadow-lg sm:p-4">
      <div className="flex h-9 w-fit min-w-9 items-center justify-center rounded-full bg-gradient-to-r from-primary-light to-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold leading-[26px] text-base-400 lg:text-xl">
          {title}
        </h4>
        <h4 className="break-all text-base font-normal leading-[26px] text-base-300 lg:text-base">
          {subtitle}
        </h4>
      </div>
    </div>
  );
}
