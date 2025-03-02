"use client";

import DataTable from "@/components/data-table/Table";
import AwardAddButton from "@/components/page-sections/admin/awards/AwardAddButton";
import { AwardSection } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import Image from "next/image";
import AwardEditButton from "@/components/page-sections/admin/awards/AwardEditButton";
import AwardDeleteButton from "../../../../../../components/page-sections/admin/awards/AwardDeleteButton";

export default function Awards() {
  const { data, isLoading, refresh } = useSWR("/about/page/award/list");

  if (isLoading) {
    return <div className="py-20 text-center"> Loading... </div>;
  }

  const awardList = data?.data?.results?.map(
    (awd: any) => new AwardSection(awd),
  );

  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      <div className="col-span-12 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold"> Awards </h1>
        <AwardAddButton refresh={refresh} />
      </div>

      <div className="col-span-12">
        <DataTable<AwardSection>
          data={awardList || []}
          columns={[
            {
              id: "id",
              header: "#",
              accessorKey: "id",
              maxSize: 60,
            },
            {
              id: "title",
              header: "Title",
              accessorKey: "title",
              cell: (i) => (
                <div className="flex items-center gap-4">
                  <Image
                    src={getImageURL(i.row.original.logo)}
                    alt=""
                    width={36}
                    height={36}
                  />
                  <span className="inline-block flex-1">
                    {i.getValue() as string}
                  </span>
                </div>
              ),
            },
            {
              id: "venue",
              header: "Venue",
              accessorKey: "venue",
              cell: (i) => i.getValue(),
            },
            {
              id: "year",
              header: "Year",
              accessorKey: "year",
              cell: (i) => i.getValue(),
            },
            {
              id: "action",
              header: "Action",
              enableSorting: false,
              cell: ({ row }) => (
                <div className="flex items-center">
                  <AwardEditButton editData={row.original} refresh={refresh} />
                  <AwardDeleteButton
                    awardId={row.original.id}
                    refresh={refresh}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
