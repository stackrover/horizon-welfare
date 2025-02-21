import { DashboardStatistics } from "@/components/page-sections/admin/dashboard/DashboardStatistics";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const RecentTransactons = dynamic(
  () => import("@/components/page-sections/admin/dashboard/RecentTransactions"),
  { ssr: false },
);

const DonationOverviewCharts = dynamic(
  () =>
    import(
      "@/components/page-sections/admin/dashboard/DonationOverviewCharts"
    ).then((mod) => mod.DonationOverviewCharts),
  { ssr: false },
);

const DonationByNationalityPieCharts = dynamic(
  () =>
    import(
      "@/components/page-sections/admin/dashboard/DonationReportsByNationality"
    ),
  { ssr: false },
);

export default function Dashboard() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-[38.4px] font-bold leading-[52.38px] tracking-[-0.14px]">
        Dashboard
      </h1>

      {/* Statistic cards */}
      <DashboardStatistics />

      <div className="mb-5 grid grid-cols-12 items-stretch gap-5 @container">
        {/* Total Donations */}
        <div className="col-span-12 @4xl:col-span-8">
          <Suspense fallback={<div> Loading... </div>}>
            <DonationOverviewCharts />
          </Suspense>
        </div>

        <div className="col-span-12 @4xl:col-span-4">
          <Suspense fallback={<div> Loading... </div>}>
            <DonationByNationalityPieCharts />
          </Suspense>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mb-5 grid grid-cols-12 gap-5 @container">
        {/* Total Donations */}
        <div className="col-span-12">
          <Suspense fallback={<div> Loading... </div>}>
            <RecentTransactons />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
