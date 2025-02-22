"use client";

import React from "react";
import { useSWR } from "@/hooks/use-swr";
import DataTable from "@/components/data-table/Table";
import { addDays, format } from "date-fns";

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
            cell: (info) => info.getValue(),
          },
        ]}
      />
    </div>
  );
};
