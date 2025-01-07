"use client";

import { projectStatusToggleAction } from "@/app/actions/volunteerActions";
import { CheckIcon } from "@/assets/icons";
import { VolunteerProjectDetailsData } from "@/data";
import { cn } from "@/lib/utils";
import { IconHeartFilled, IconHourglassLow } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { HeartIcon, ShareIcon } from "../../../../public/icons";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

export function VolunteerCard({
  className,
  subscribed,
  detailsData,
}: {
  className?: string;
  subscribed: boolean | undefined | null;
  detailsData: VolunteerProjectDetailsData;
}) {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  const handleSubscription = async () => {
    setLoading(true);
    const resp = await projectStatusToggleAction(detailsData.projectId);

    if (resp.status === "success") {
      toast.success(resp.message);
      router.replace(`/volunteer/subscribed-projects`);
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
        <CountUp
          enableScrollSpy={true}
          scrollSpyOnce={true}
          start={0}
          end={detailsData.totalVolunteers}
          className="text-[40px] font-semibold leading-[64px] text-base-400"
        />
        <span className="text-[40px] font-semibold leading-[64px] text-base-400">
          {" Volunteers"}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-base-200">
        <motion.div
          ref={ref}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "50%" } : {}}
          transition={{ delay: 0.1, type: "ease-in-out" }}
          className="h-full w-[20%] rounded-full bg-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-left text-xs font-medium leading-5 text-base-300">
            Volunteers Goal
          </h6>
          <div>
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              start={0}
              end={detailsData.volunteerNeed}
              className="text-left text-lg font-semibold leading-5 text-base-400"
            />
          </div>
        </div>
        <div>
          <h6 className="text-right text-xs font-medium leading-5 text-base-300">
            Remaining
          </h6>
          <div>
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              start={0}
              end={detailsData.remainingVolunteers}
              className="text-left text-lg font-semibold leading-5 text-base-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconHourglassLow size={24} />
        <h4 className="text-xl font-medium leading-6 text-base-400">
          12 days left
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <IconHeartFilled fill="red" size={24} />
        <h4 className="text-xl font-medium leading-6 text-base-400">
          {detailsData.totalVolunteers} Volunteers
        </h4>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => (subscribed ? null : handleSubscription())}
          className="h-11 w-full gap-2 rounded-full"
          variant="secondary"
        >
          {subscribed ? (
            <>
              <span>COUNTED</span>
              <CheckIcon className="h-[24px] w-[24px]" />
            </>
          ) : (
            <>
              <span>{loading ? "COUNTING..." : "COUNT ME IN"}</span>
              <HeartIcon className="h-[24px] w-[24px]" />
            </>
          )}
        </Button>
        <Button
          variant="light"
          className="h-11 w-fit min-w-11 rounded-full"
          size="icon"
        >
          <ShareIcon />
        </Button>
      </div>
    </div>
  );
}
