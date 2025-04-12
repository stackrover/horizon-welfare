"use client";

import { TruncateString } from "@/components";
import DataTable from "@/components/data-table/Table";
import EventDeleteButton from "@/components/forms/EventDeleteButton";
import UpdateEventStatus from "@/components/forms/UpdateEventStatus";
import { Button } from "@/components/ui/button";
import { EventDetail } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Events() {
  const { data, isLoading, refresh } = useSWR("/event/list/all");

  if (isLoading) {
    return <div className="py-20 text-center"> Loading... </div>;
  }

  const events = data?.data?.results?.map(
    (event: any) => new EventDetail(event),
  ) as EventDetail[];

  return (
    <section className="grid grid-cols-12 gap-4 p-6">
      {/* Page header */}

      <div className="col-span-12">
        <div className="flex w-full items-center justify-between gap-4">
          <h2 className="text-2xl font-bold"> Events </h2>
          <Button asChild className="gap-2">
            <Link href="/admin/dashboard/events/add">
              <Plus size={18} />
              <span> Event </span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="col-span-12">
        <DataTable
          data={events || []}
          columns={[
            {
              id: "eventId",
              header: "#",
              accessorKey: "id",
              maxSize: 120,
              cell: (i) => i.getValue(),
            },

            {
              id: "scheduleDate",
              header: "Schedule Date",
              accessorFn: (row) => (
                <span>
                  {row.scheduleDate} <br />
                  {format(new Date(row.scheduleDate), "hh:mm a")}
                </span>
              ),
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
              cell: (i) => <TruncateString length={30}>{i.getValue() as string}</TruncateString>,
            },

            {
              id: "Location",
              header: "location",
              accessorKey: "location",
              enableSorting: false,
              cell: (i) => <TruncateString length={40}>{i.getValue() as string}</TruncateString>,
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
              enableSorting: false,
              cell: (i) => (
                <UpdateEventStatus event={i.row.original} refresh={refresh} />
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
                    <Link href={`/events/${row.original.id}`}>
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
                      href={`/admin/dashboard/events/${row.original.id}/edit`}
                    >
                      <IconEdit />
                    </Link>
                  </Button>

                  {/* Delete button */}
                  <EventDeleteButton
                    eventId={row.original.id}
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
