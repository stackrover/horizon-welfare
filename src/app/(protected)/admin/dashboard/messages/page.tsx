"use client";

import { TruncateString } from "@/components";
import DataTable from "@/components/data-table/Table";
import BlogCommentList from "@/components/page-sections/admin/blogs/BlogComments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Message } from "@/data/contact-us/message";
import { useSWR } from "@/hooks/use-swr";
import { IconEye } from "@tabler/icons-react";
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
  const messages = data?.data?.results?.map((d: any) => new Message(d));

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="rounded-md border bg-white p-6">
        <DataTable<Message>
          data={messages || []}
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
              id: "mobile_number",
              accessorKey: "mobile_number",
              header: "Mobile No",
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
              header: "Message",
              cell: (i) => (
                <div className="flex items-center gap-2">
                  <TruncateString length={10}>
                    {i.getValue() as string}
                  </TruncateString>
                  {(i.getValue() as string).length > 10 && (
                    <Dialog>
                      <DialogTrigger>
                        <IconEye size={24} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Subject: {i.row.original.subject}
                          </DialogTitle>
                          <DialogDescription>
                            {i.getValue() as string}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              ),
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
