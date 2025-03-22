"use client";

import DataTable from "@/components/data-table/Table";
import { Badge } from "@/components/ui/badge";
import { Partner } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import {
  PartnerAddButton,
  PartnerDeleteButton,
} from "@/components/page-sections/admin";

export default function OurPartners() {
  const { data, isLoading, refresh } = useSWR("/partner/list");

  if (isLoading) {
    return <div className="py-20 text-center"> Loading... </div>;
  }

  const partners = data?.data?.results?.map((p: any) => new Partner(p));

  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      <div className="col-span-12 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold"> Partners </h1>
        <PartnerAddButton refresh={refresh} />
      </div>

      <div className="col-span-12">
        <DataTable<Partner>
          data={partners || []}
          columns={[
            {
              id: "id",
              header: "#",
              accessorKey: "id",
              maxSize: 60,
            },
            {
              id: "logo",
              header: "Logo",
              accessorKey: "logo",
              cell: (i) => (
                <Image
                  src={getImageURL(i.getValue() as string)}
                  alt=""
                  width={80}
                  height={80}
                  sizes="100px"
                />
              ),
            },

            {
              id: "name",
              header: "Name",
              accessorKey: "title",
              cell: (i) => i.getValue(),
            },

            {
              id: "status",
              header: "Status",
              accessorKey: "status",
              cell: (i) => (
                <Badge
                  variant={
                    {
                      active: "success",
                      pending: "warning",
                      inactive: "error",
                    }?.[
                      i.getValue() as "active" | "pending" | "inactive"
                    ] as any
                  }
                >
                  {_.startCase(i.getValue() as string)}
                </Badge>
              ),
            },

            {
              id: "action",
              header: "Action",
              enableSorting: false,
              cell: ({ row }) => (
                <div className="flex items-center">
                  <PartnerDeleteButton id={row.original.id} refresh={refresh} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
