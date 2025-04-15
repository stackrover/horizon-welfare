"use client";

import { TruncateString } from "@/components/custom/TruncateString";
import DataTable from "@/components/data-table/Table";
import ProjectDeleteButton from "@/components/forms/ProjectDeleteButton";
import { Button } from "@/components/ui/button";
import { useSWR } from "@/hooks/use-swr";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { addDays, format } from "date-fns";
import _ from "lodash";
import Link from "next/link";

export const CampaignsDataTable = () => {
  const { data, isLoading, refresh } = useSWR("/project/list-details");
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
            cell: (i) => (
              <TruncateString length={30}>
                {i.getValue() as string}
              </TruncateString>
            ),
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
          {
            id: "action",
            header: "Action",
            enableSorting: false,
            cell: ({ row }) => (
              <div className="flex items-center gap-0.5">
                {/* Preview button */}
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-gray-500"
                >
                  <Link href={`/projects/details/${row.original.id}`}>
                    <IconEye />
                  </Link>
                </Button>

                {/* Edit button */}
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-gray-500"
                >
                  <Link
                    href={`/admin/dashboard/campaigns/${row.original.id}/edit`}
                  >
                    <IconEdit />
                  </Link>
                </Button>

                {/* Delete button */}
                <ProjectDeleteButton
                  projectId={row.original.id}
                  refresh={refresh}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// /project/delete/{id}
