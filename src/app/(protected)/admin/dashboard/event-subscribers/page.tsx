"use client";

import DataTable from "@/components/data-table/Table";
import { EventSubscriberData } from "@/data/events/eventSubscriber";
import { useSWR } from "@/hooks/use-swr";
import { usePathname } from "next/navigation";
import React from "react";

export default function EventSubscribers() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data, isLoading, isError, refresh } = useSWR(
    "/event/subscriber/list",
  );

  console.log(data);

  if (isError) {
    return (
      <section className="p-6">
        <div className="rounded-md bg-red-100 px-4 py-4 font-medium text-red-500">
          Someting went wrong. Please retry again by hard refresh
        </div>
      </section>
    );
  }

  // if loading
  if (isLoading) {
    return (
      <section className="p-6">
        <div className="">Loading...</div>
      </section>
    );
  }

  // serialize data
  const messages = data?.data?.results?.map(
    (d: any) => new EventSubscriberData(d),
  );

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Event Subscribers</h1>
      </div>

      <div className="rounded-md border bg-white p-6">
        <DataTable<EventSubscriberData>
          data={messages || []}
          columns={[
            {
              id: "id",
              accessorKey: "id",
              header: "ID",
              cell: (i) => i.getValue(),
            },

            {
              id: "eventName",
              accessorKey: "eventName",
              header: "Event",
              cell: (i) => i.getValue(),
            },

            {
              id: "name",
              accessorKey: "name",
              header: "Name",
              cell: (i) => i.getValue(),
            },

            {
              id: "email",
              accessorKey: "email",
              header: "Email",
              cell: (i) => i.getValue(),
            },

            {
              id: "mobile_number",
              accessorKey: "mobile_number",
              header: "Mobile No",
              cell: (i) => i.getValue(),
            },
            {
              id: "createdAt",
              accessorKey: "createdAt",
              header: "Time",
              cell: (i) => i.getValue(),
            },
          ]}
        />
      </div>
    </section>
  );
}
