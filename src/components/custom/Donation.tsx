"use client";

import { cn } from "@/lib/utils";
import { IconHeartFilled, IconHourglassLow } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import React from "react";
import CountUp from "react-countup";
import { HeartIcon, ShareIcon } from "../../../public/icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Donation({ className }: { className?: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      className={cn(
        "flex flex-col gap-y-5 rounded border px-6 py-4 shadow",
        className,
      )}
    >
      <div>
        <span className="text-[40px] font-semibold leading-[64px] text-base-400">
          ৳{"  "}
        </span>

        <CountUp
          enableScrollSpy={true}
          scrollSpyOnce={true}
          end={124000}
          className="text-[40px] font-semibold leading-[64px] text-base-400"
        />
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
            Goal
          </h6>
          <div>
            <span className="text-left text-lg font-semibold leading-5 text-base-400">
              ৳{"  "}
            </span>

            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              end={124000}
              className="text-left text-lg font-semibold leading-5 text-base-400"
            />
          </div>
        </div>
        <div>
          <h6 className="text-right text-xs font-medium leading-5 text-base-300">
            Remaining
          </h6>
          <div>
            <span className="text-left text-lg font-semibold leading-5 text-base-400">
              ৳{"  "}
            </span>

            <CountUp
              enableScrollSpy={true}
              scrollSpyOnce={true}
              end={124000}
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
          12354 Contributors
        </h4>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-4">
        <Button className="h-11 w-full gap-2 rounded-full" variant="secondary">
          <span>Donate Now</span>
          <HeartIcon />
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
