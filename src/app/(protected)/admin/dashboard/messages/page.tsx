"use client";

import DataTable from "@/components/data-table/Table";
import BlogCommentList from "@/components/page-sections/admin/blogs/BlogComments";
import { Message } from "@/data/contact-us/message";
import { useSWR } from "@/hooks/use-swr";
import { usePathname } from "next/navigation";
import React from "react";

export default function Messages() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data, isLoading, isError, refresh } = useSWR("/contact/form/list");

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
  const blogs = data?.data?.results?.map((d: any) => new Message(d));

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="rounded-md border bg-white p-6">
        <DataTable<Message>
          data={blogs || []}
          columns={[
            {
              id: "id",
              accessorKey: "id",
              header: "#",
              cell: (i) => i.getValue(),
            },

            {
              id: "name",
              accessorKey: "name",
              header: "Sender",
              cell: (i) => i.getValue(),
            },

            {
              id: "email",
              accessorKey: "email",
              header: "Email",
              cell: (i) => i.getValue(),
            },

            {
              id: "subject",
              accessorKey: "subject",
              header: "Subject",
              cell: (i) => i.getValue(),
            },
            {
              id: "message",
              accessorKey: "message",
              header: "Subject",
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
      <BlogCommentList
        blogId={selectedId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
}
