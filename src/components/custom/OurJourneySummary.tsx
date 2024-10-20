import { JourneySummaryProps } from "@/types/types";

export function OurJourneySummary({ count, text }: JourneySummaryProps) {
  return (
    <div>
      <h3 className="text-2xl font-medium leading-[38px] text-base-0">
        {count}
      </h3>
      <h6 className="text-xs font-medium leading-5 text-base-200">{text}</h6>
    </div>
  );
}
