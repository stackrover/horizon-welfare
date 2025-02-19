"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSWR } from "@/hooks/use-swr";
import { Blog } from "@/data";
import DataTable from "@/components/data-table/Table";
import { IconEdit, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Blogs() {
  const pathname = usePathname();
  const { data, isLoading, isError } = useSWR("/blog/list/all");

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
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button asChild>
          <Link href={`${pathname}/add`}>Blog</Link>
        </Button>
      </div>

      <div>
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
              cell: (i) => i.getValue(),
            },

            {
              id: "author",
              accessorFn: (r) => r.getAuthorName(),
              header: "Author",
              cell: (i) => i.getValue(),
            },

            {
              id: "category",
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
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
