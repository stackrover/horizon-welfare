import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionCardProps } from "@/types/types";
import Image from "next/image";

export function SubscriptionProjectCard({
  imageUrl,
  buttonText,
  title,
  description,
  className,
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md p-4 shadow-[0_4px_18px_0_rgba(75,70,92,0.1)]",
        className,
      )}
    >
      <div className="ml-4 flex flex-col gap-6">
        <div>
          <h4 className="mb-1 text-lg font-semibold leading-6 text-base-400">
            {title}
          </h4>
          <p className="text-sm text-base-300">{description}</p>
        </div>

        <Button variant="secondary">{buttonText}</Button>
      </div>
      <div>
        <Image
          src={imageUrl}
          alt="subscription"
          height={166}
          width={166}
          className="aspect-square h-[166px] w-[166px]"
        />
      </div>
    </div>
  );
}
