"use client";

import { TruncateString } from "@/components";
import DataTable from "@/components/data-table/Table";
import BlogDeleteButton from "@/components/forms/BlogDeleteButton";
import BlogCommentList from "@/components/page-sections/admin/blogs/BlogComments";
import { Button } from "@/components/ui/button";
import { Blog } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { IconEdit, IconEye, IconMessage } from "@tabler/icons-react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Blogs() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data, isLoading, isError, refresh } = useSWR("/blog/list/all");

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
  const blogs = data?.data?.results?.map((blog: any) => new Blog(blog));

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button asChild>
          <Link href={`${pathname}/add`}>
            <PlusIcon size={18} />
            Blog
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white p-6">
        <DataTable<Blog>
          data={blogs || []}
          columns={[
            {
              id: "id",
              accessorFn: (r) => r.getId(),
              header: "#",
              cell: (i) => i.getValue(),
            },

            {
              id: "title",
              accessorFn: (r) => r.getTitle(),
              header: "Title",
              cell: (i) => (
                <TruncateString length={30}>
                  {i.getValue() as string}
                </TruncateString>
              ),
            },

            {
              id: "author_name",
              accessorFn: (r) => r.getAuthorName(),
              header: "Author",
              cell: (i) => i.getValue(),
            },

            {
              id: "category_title",
              accessorFn: (r) => r.getCategoryTitle(),
              header: "Category",
              cell: (i) => i.getValue(),
            },

            {
              id: "actions",
              header: "actions",
              cell: ({ row }) => (
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/blogs/${row.original?.slug}`}>
                      <IconEye />
                    </Link>
                  </Button>

                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`${pathname}/${row.original?.slug}/edit`}>
                      <IconEdit />
                    </Link>
                  </Button>

                  {/* Delete button */}
                  <BlogDeleteButton
                    blogId={row.original.id}
                    refresh={refresh}
                  />

                  {/* <BlogCommentList blogId={row.original.id} /> */}
                  <Button
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedId(row.original.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <IconMessage />
                  </Button>
                </div>
              ),
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
