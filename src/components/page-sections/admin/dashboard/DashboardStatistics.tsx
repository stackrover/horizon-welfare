"use client";

import { DashboardOverviewCard } from "@/components/custom/DashboardOverviewCard";
import { CubeBoxIcon } from "@/components/icons";
import { ChartIcon } from "@/components/icons/ChartIcon";
import { TimeRepeat } from "@/components/icons/TimeRepeat";
import { UserGroupIcon } from "@/components/icons/UserGroupIcon";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";

const OVERVIEWS = [
  {
    title: "Total Donars",
    key: "total_donors",
    icon: UserGroupIcon,
    iconClass: "bg-[#8280FF]/10",
  },
  {
    title: "Total Active Campaign",
    key: "total_campaigns",
    icon: CubeBoxIcon,
    iconClass: "bg-[#FEC53D]/10",
  },
  {
    title: "Total Donations (BDT)",
    key: "total_donations",
    icon: ChartIcon,
    iconClass: "bg-[#4AD991]/10",
  },

  {
    title: "Total Transaction",
    key: "total_transactions",
    icon: TimeRepeat,
    iconClass: "bg-[#FF9066]/10",
  },
];

export const DashboardStatistics = () => {
  const { data, isLoading } = useSWR("/reports/dashboard-statistics");

  console.log({ data });

  return (
    <div className="mb-5 grid grid-cols-12 gap-5 @container">
      {_.map(OVERVIEWS, (o, i) => (
        <DashboardOverviewCard
          key={i}
          title={o.title}
          value={data?.data?.results?.[o.key]}
          Icon={o.icon}
          className="col-span-12 @sm:col-span-6 @3xl:col-span-4 @5xl:col-span-3"
          iconClass={o.iconClass}
        />
      ))}
    </div>
  );
};
