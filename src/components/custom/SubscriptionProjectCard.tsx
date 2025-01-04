import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SubscriptionCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { TruncateString } from "./TruncateString";

export function SubscriptionProjectCard({
  imageUrl,
  buttonText,
  title,
  description,
  className,
  linkUrl,
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md p-4 shadow-[0_4px_18px_0_rgba(75,70,92,0.1)] sm:flex-row sm:items-center sm:justify-between sm:gap-x-2",
        className,
      )}
    >
      <div className="order-2 flex flex-col items-center gap-6 sm:order-1 sm:items-start md:ml-4">
        <div>
          <Link
            href={linkUrl}
            className="mb-1 text-center text-lg font-semibold leading-6 text-base-400 transition-all duration-150 ease-in-out hover:text-primary sm:text-start"
          >
            <TruncateString length={30}>{title}</TruncateString>
          </Link>
          <p
            data-status={description}
            className="text-center text-sm text-base-300 data-[status=Emergency]:text-destructive data-[status=Regular]:text-primary sm:text-start"
          >
            {description}
          </p>
        </div>
        <Link href={linkUrl}>
          <Button variant="secondary" className="w-fit md:w-full">
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className="order-1 flex justify-center sm:order-2 sm:block">
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL + imageUrl}
          alt="subscription"
          height={166}
          width={166}
          className="aspect-square h-[100px] w-[100px] rounded-lg md:h-[166px] md:w-[166px]"
        />
      </div>
    </div>
  );
}
