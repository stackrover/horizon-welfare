"use client";

import { CrossIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function CancelSubscriptionCard({ className }: { className?: string }) {
  const ref = React.useRef(null);
  return (
    <div
      className={cn(
        "flex flex-col gap-y-5 rounded border px-6 py-4 shadow",
        className,
      )}
    >
      <div>
        <h1 className="text-[40px] font-semibold leading-[64px] text-base-400">
          Cancel subscription
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <h4 className="text-xl font-medium leading-6 text-base-400">
          Its Oky if you dont want to subscribe <br /> anymore click cancel
          below
        </h4>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-4">
        <Button className="h-11 w-full gap-2 rounded-full" variant="secondary">
          <span>CANCEL SUBSCRIPTION</span>
          <CrossIcon className="h-[24px] w-[24px]" />
        </Button>
      </div>
    </div>
  );
}
