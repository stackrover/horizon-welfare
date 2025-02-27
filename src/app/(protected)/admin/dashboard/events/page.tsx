"use client";

import DataTable from "@/components/data-table/Table";
import { Button } from "@/components/ui/button";
import { EventDetail } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getImageURL } from "../../../../../lib/utils";
import Image from "next/image";
import _ from "lodash";
import { Badge } from "../../../../../components/ui/badge";

export default function Events() {
  const { data, isLoading } = useSWR("/event/list/all");

  console.log({ data });

  if (isLoading) {
    return <div className="py-20 text-center"> Loading... </div>;
  }

  const events = data?.data?.results?.map(
    (event: any) => new EventDetail(event),
  ) as EventDetail[];

  console.log({ events });

  return (
    <section className="grid grid-cols-12 gap-4 p-6">
      {/* Page header */}

      <div className="col-span-12">
        <div className="flex w-full items-center justify-between gap-4">
          <h2 className="text-2xl font-bold"> Events </h2>
          <Button asChild className="gap-2">
            <Link href="/">
              <Plus size={18} />
              <span> Event </span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="col-span-12">
        <DataTable
          data={events}
          columns={[
            {
              id: "eventId",
              header: "#",
              accessorKey: "id",
              cell: (i) => i.getValue(),
            },

            {
              id: "scheduleDate",
              header: "Schedule Date",
              accessorFn: (row) => `${row.scheduleDate} ${row.scheduleTime}`,
              cell: (i) => i.getValue(),
            },
            {
              id: "thumbnail",
              header: "Thumbnail",
              accessorKey: "thumbnail",
              cell: (i) =>
                i.getValue() ? (
                  <Image
                    src={getImageURL(i.getValue() as string)}
                    alt=""
                    width={100}
                    height={100}
                    sizes="100px"
                  />
                ) : null,
            },
            {
              id: "eventTitle",
              header: "Title",
              accessorKey: "title",
              cell: (i) => i.getValue(),
            },

            {
              id: "Location",
              header: "location",
              accessorKey: "location",
              enableSorting: false,
              cell: (i) => i.getValue(),
            },

            {
              id: "Map",
              header: "Map iframe",
              accessorKey: "mapLink",
              enableSorting: false,
              cell: (i) => (i.getValue() ? "Enabled" : "--"),
            },

            {
              id: "SocialLinks",
              header: "Social links",
              enableSorting: false,
              cell: (i) => {
                const { meetLink, zoomLink } = i.row.original;
                return (
                  <div className="flex items-center gap-3">
                    {[
                      { link: meetLink, icon: "/images/meet.png" },
                      { link: zoomLink, icon: "/images/zoom.png" },
                    ].map(
                      (s, idx) =>
                        s.link && (
                          <Link key={idx} href={meetLink}>
                            <Image
                              src={s.icon}
                              alt=""
                              width={24}
                              height={24}
                              sizes="48px"
                            />
                          </Link>
                        ),
                    )}
                  </div>
                );
              },
            },

            {
              id: "status",
              header: "Status",
              accessorKey: "status",
              cell: (i) => (
                <Badge
                  variant={
                    {
                      active: "info",
                      pending: "warning",
                      completed: "success",
                      cancelled: "error",
                    }[
                      i.getValue() as
                        | "active"
                        | "pending"
                        | "completed"
                        | "cancelled"
                    ] as any
                  }
                >
                  {_.startCase(i.getValue() as string)}
                </Badge>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
