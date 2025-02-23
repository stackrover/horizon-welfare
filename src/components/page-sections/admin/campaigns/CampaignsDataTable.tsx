"use client";

import DataTable from "@/components/data-table/Table";
import { Button } from "@/components/ui/button";
import { useSWR } from "@/hooks/use-swr";
import { TrashIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import _ from "lodash";
import { Trash2 } from "lucide-react";

export const CampaignsDataTable = () => {
  const { data, isLoading } = useSWR("/project/list-details");
  const campaignProjects = data?.data?.results || [];

  if (isLoading) {
    return <div className="py-6"> Loading... </div>;
  }

  return (
    <div className="overflow-hidden">
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
            cell: (i) => i.getValue(),
          },
          {
            id: "category",
            header: "Category",
            accessorKey: "category.title",
            cell: (i) => i.getValue(),
          },
          {
            id: "goalAmount",
            header: "Goal amount (BDT)",
            accessorKey: "goal_amount",
            cell: (i) => i.getValue() + " BDT",
          },
          {
            id: "totalCollections",
            header: "Collections (BDT)",
            accessorKey: "total_collections",
            cell: (i) => i.getValue() + " BDT",
          },
          {
            id: "isEmergency",
            header: "Is Emergency",
            accessorKey: "is_emergency",
            cell: (i) =>
              Boolean(i.getValue() ?? false) ? "Emergency" : "Not Emergency",
          },
          {
            id: "deadline",
            header: "Deadline",
            accessorKey: "collection_days",
            cell: ({ row }: any) =>
              format(
                addDays(
                  new Date(row.original?.created_at),
                  row.original?.collection_days,
                ),
                "MMM dd, yyyy",
              ),
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
        ]}
      />
    </div>
  );
};
