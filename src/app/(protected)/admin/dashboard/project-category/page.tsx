"use client";

import { CreateCategory } from "@/components/custom/CreateCategory";
import DataTable from "@/components/data-table/Table";
import CategoryDeleteButton from "@/components/page-sections/admin/campaigns/DeleteCategory";
import { UpdateCategory } from "@/components/page-sections/admin/campaigns/UpdateCategory";
import { Button } from "@/components/ui/button";
import { ProjectCategory } from "@/data/projects/category";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { IconEdit } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function CampaignCategories() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data, isLoading, isError, refresh } = useSWR(
    "/project/category/list",
  );

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
  const projects: ProjectCategory[] =
    data?.data?.results?.map(
      (cat: Record<string, any>) => new ProjectCategory(cat),
    ) || [];

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Campaign Categories</h1>
        <CreateCategory refresh={refresh}>
          <Button type="button" size="lg" className="w-fit gap-2 px-4">
            <Plus />
            <span>Create</span>
          </Button>
        </CreateCategory>
      </div>

      <div className="rounded-md border bg-white p-6">
        <DataTable<ProjectCategory>
          data={projects || []}
          columns={[
            {
              id: "id",
              accessorKey: "id",
              header: "ID",
              cell: (i) => i.getValue(),
            },

            {
              id: "icon",
              header: "Icon",
              accessorKey: "icon",
              cell: (i) =>
                i.getValue() ? (
                  <Image
                    src={getImageURL(i.getValue() as string)}
                    alt=""
                    width={60}
                    height={60}
                    sizes="60px"
                  />
                ) : null,
            },

            {
              id: "title",
              accessorKey: "title",
              header: "Title",
              cell: (i) => i.getValue(),
            },

            {
              id: "slug",
              accessorKey: "slug",
              header: "Slug",
              cell: (i) => i.getValue(),
            },

            {
              id: "status",
              accessorKey: "status",
              header: "Status",
              cell: (i) => i.getValue(),
            },

            {
              id: "createdAt",
              accessorKey: "createdAt",
              header: "CreatedAt",
              cell: (i) => i.getValue(),
            },

            {
              id: "actions",
              header: "Action",
              enableSorting: false,
              cell: ({ row }) => (
                <div className="flex items-center gap-0.5">
                  <UpdateCategory
                    preview={getImageURL(row.original.icon)}
                    slug={row.original.slug}
                    status={row.original.status}
                    title={row.original.title}
                    id={row.original.id}
                    refresh={refresh}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer p-1.5 text-gray-500"
                    >
                      <IconEdit size={20} />
                    </Button>
                  </UpdateCategory>

                  {/* Delete button */}
                  <CategoryDeleteButton
                    id={row.original.id}
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
