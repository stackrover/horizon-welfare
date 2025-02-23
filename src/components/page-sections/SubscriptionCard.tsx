"use client";

import { donateAction } from "@/app/actions/donorActions";
import { CheckIcon } from "@/assets/icons";
import { DonorAvailableProject, DonorSubscribedProject } from "@/data";
import { cn } from "@/lib/utils";
import { IconHeartFilled } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { HeartIcon, ShareIcon } from "../../../public/icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function SubscriptionCard({
  className,
  subscribed,
  serializedData,
}: {
  className?: string;
  subscribed: boolean | undefined | null;
  serializedData: DonorSubscribedProject | DonorAvailableProject;
}) {
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  // handle project subscription
  const handleSubscription = async () => {
    setLoading(true);

    const resp = await donateAction({
      projectId: serializedData.projectId,
      packageId: serializedData.packageId,
      isSubscriptionMoney: "yes",
      totalAmount: Number(serializedData.subscriptionRate),
      currency: "BDT",
    });

    if (resp.status === "success" && window) {
      window.location.href = resp.checkoutUrl;
    }

    if (resp.status === "error" && resp.error_type === "general") {
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
          end={serializedData.totalSubscribers}
          className="text-[40px] font-semibold leading-[64px] text-base-400"
        />
        <span className="text-[40px] font-semibold leading-[64px] text-base-400">
          {" Subscribers"}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-base-200">
        <motion.div
          ref={ref}
          initial={{ width: "0%" }}
          animate={
            isInView
              ? {
                  width: `${(serializedData.totalSubscribers / serializedData.subscriberGoal) * 100}%`,
                }
              : {}
          }
          transition={{ delay: 0.1, type: "ease-in-out" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-left text-xs font-medium leading-5 text-base-300">
            Subscriber Goal
          </h6>
          <div>
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              start={0}
              end={serializedData.subscriberGoal}
              className="text-left text-lg font-semibold leading-5 text-base-400"
            />
          </div>
        </div>
        <div>
          <h6 className="text-right text-xs font-medium leading-5 text-base-300">
            Remaining Subscriber
          </h6>
          <div>
            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              start={0}
              end={
                serializedData.subscriberGoal -
                  serializedData.totalSubscribers || 0
              }
              className="text-left text-lg font-semibold leading-5 text-base-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconHeartFilled fill="red" size={24} />
        <h4 className="text-xl font-medium leading-6 text-base-400">
          {serializedData.totalSubscribers} Contributors
        </h4>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleSubscription}
          className="h-11 w-full gap-2 rounded-full"
          variant="secondary"
        >
          {subscribed ? (
            <>
              <span>{loading ? "DONATION PAYING..." : "DONATION PAY"}</span>
              <CheckIcon className="h-[24px] w-[24px]" />
            </>
          ) : (
            <>
              <span>{loading ? "SUBSCRIBING..." : "SUBSCRIBE"}</span>
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
