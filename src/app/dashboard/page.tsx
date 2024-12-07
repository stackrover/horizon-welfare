import { DashboardOverviewCard } from "@/components";
import { CubeBoxIcon } from "@/components/icons";
import { ChartIcon } from "@/components/icons/ChartIcon";
import { TimeRepeat } from "@/components/icons/TimeRepeat";
import { UserGroupIcon } from "@/components/icons/UserGroupIcon";
import _ from "lodash";

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
      <div className="grid grid-cols-12 gap-9">
        {_.map(overviews, (o, i) => (
          <DashboardOverviewCard
            key={i}
            title={o.title}
            value={o.value}
            Icon={o.icon}
            className="col-span-3"
            iconClass={o.iconClass}
          />
        ))}
      </div>
    </section>
  );
}
