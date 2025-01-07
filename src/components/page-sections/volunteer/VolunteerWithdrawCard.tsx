"use client";

import { projectStatusToggleAction } from "@/app/actions/volunteerActions";
import { CrossIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export function VolunteerWithdrawCard({
  className,
  projectId,
}: {
  className?: string;
  projectId: string | number;
}) {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);
  const router = useRouter();

  // handle project subscription
  const handleSubscription = async () => {
    setLoading(true);
    const resp = await projectStatusToggleAction(projectId);

    if (resp.status === "success") {
      toast.success(resp.message);
      router.replace(`/volunteer/profile`);
    }

    if (resp.status === "error") {
      toast.error(resp.message);
    }

    setLoading(false);
  };
  return (
    <div
      className={cn(
        "flex flex-col gap-y-5 rounded border px-6 py-4 shadow",
        className,
      )}
    >
      <div>
        <h1 className="text-[40px] font-semibold leading-[64px] text-base-400">
          Withdraw listing
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <h4 className="text-xl font-medium leading-6 text-base-400">
          Its Oky if you want to withdraw your name
        </h4>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleSubscription}
          className="h-11 w-full gap-2 rounded-full"
          variant="secondary"
        >
          <span>{loading ? "WITHDRAWING..." : "WITHDRAW"}</span>
          <CrossIcon className="h-[24px] w-[24px]" />
        </Button>
      </div>
    </div>
  );
}
