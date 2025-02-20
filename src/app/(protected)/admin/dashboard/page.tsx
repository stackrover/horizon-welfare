import { DashboardOverviewCard } from "@/components";
import { CubeBoxIcon } from "@/components/icons";
import { ChartIcon } from "@/components/icons/ChartIcon";
import { TimeRepeat } from "@/components/icons/TimeRepeat";
import { UserGroupIcon } from "@/components/icons/UserGroupIcon";
import dynamic from "next/dynamic";
import _ from "lodash";
import { Suspense } from "react";

const DonationOverviewCharts = dynamic(
  () =>
    import(
      "@/components/page-sections/admin/dashboard/DonationOverviewCharts"
    ).then((mod) => mod.DonationOverviewCharts),
  { ssr: false },
);

const overviews = [
  {
    title: "Total Donars",
    value: "40,689",
    icon: UserGroupIcon,
    iconClass: "bg-[#8280FF]/10",
  },
  {
    title: "Total Active Campaign",
    value: "10293",
    icon: CubeBoxIcon,
    iconClass: "bg-[#FEC53D]/10",
  },
  {
    title: "Total Donations (BDT)",
    value: "Tk 89,000",
    icon: ChartIcon,
    iconClass: "bg-[#4AD991]/10",
  },

  {
    title: "Total Transaction",
    value: "2040",
    icon: TimeRepeat,
    iconClass: "bg-[#FF9066]/10",
  },
];

export default function Dashboard() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-[38.4px] font-bold leading-[52.38px] tracking-[-0.14px]">
        Dashboard
      </h1>

      {/* Statistic cards */}
      <div className="mb-5 grid grid-cols-12 gap-5 @container">
        {_.map(overviews, (o, i) => (
          <DashboardOverviewCard
            key={i}
            title={o.title}
            value={o.value}
            Icon={o.icon}
            className="col-span-12 @sm:col-span-6 @3xl:col-span-4 @5xl:col-span-3"
            iconClass={o.iconClass}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5 @container">
        {/* Total Donations */}
        <div className="col-span-12 @4xl:col-span-6">
          <Suspense fallback={<div> Loading... </div>}>
            <DonationOverviewCharts />
          </Suspense>
        </div>
      </div>

      {/* Recent Transactions */}
    </section>
  );
}
