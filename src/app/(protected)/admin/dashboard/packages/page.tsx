"use client";

import { TruncateString } from "@/components";
import DataTable from "@/components/data-table/Table";
import PackageAddButton from "@/components/page-sections/admin/packages/PackageAddButton";
import PackageDeleteButton from "@/components/page-sections/admin/packages/PackageDeleteButton";
import PackageEditButton from "@/components/page-sections/admin/packages/PackageEditButton";
import { Package } from "@/data/package/package-data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";

export default function Packages() {
  const { data, isLoading, refresh } = useSWR("/subscription/package/list");
  const campaignProjects: Package[] = data?.data?.results?.map(
    (d: any) => new Package(d),
  );

  console.log(campaignProjects);

  if (isLoading) {
    return <div className="py-6"> Loading... </div>;
  }
  return (
    <section className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12 flex items-center justify-between">
        <h1 className="text-3xl font-bold leading-[52.38px] tracking-[-0.14px]">
          Subscription Packages
        </h1>
        <PackageAddButton refresh={refresh} />
      </div>

      <div className="col-span-12 rounded-xl border bg-white p-6">
        <DataTable
          data={campaignProjects}
          columns={[
            {
              id: "id",
              header: "#",
              accessorKey: "id",
              cell: (info) => info.getValue(),
            },
            {
              id: "title",
              header: "Project title",
              accessorKey: "title",
              cell: (i) => (
                <TruncateString length={30}>
                  {i.getValue() as string}
                </TruncateString>
              ),
            },
            {
              id: "subscription_rate",
              header: "Subscription Rate",
              accessorKey: "subscription_rate",
              cell: (i) => <span>{i.getValue() as string} / Month</span>,
            },
            {
              id: "status",
              header: "Status",
              accessorKey: "status",
              cell: (info) => (
                <span
                  data-status={info.getValue()}
                  className="rounded px-2 py-0.5 text-xs font-medium data-[status=active]:bg-green-100 data-[status=inactive]:bg-red-100 data-[status=pending]:bg-orange-100 data-[status=active]:text-green-500 data-[status=inactive]:text-red-500 data-[status=pending]:text-orange-500"
                >
                  {_.startCase((info.getValue() as string) || "")}
                </span>
              ),
            },
            {
              id: "action",
              header: "Action",
              enableSorting: false,
              cell: ({ row }) => (
                <div className="flex items-center">
                  <PackageEditButton
                    editData={row.original}
                    refresh={refresh}
                  />
                  <PackageDeleteButton
                    packageId={row.original.id}
                    refresh={refresh}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
