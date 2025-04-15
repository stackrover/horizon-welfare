"use client";

import DataTable from "@/components/data-table/Table";
import UserDeleteButton from "@/components/forms/UserDeleteButton";
import UserStatusChangeButton from "@/components/forms/UserStatusChangeButton";
import UserDetailsDrawer from "@/components/page-sections/admin/user/UserDetails";
import { Button } from "@/components/ui/button";
import { User } from "@/data/users/User";
import { useSWR } from "@/hooks/use-swr";
import { IconEye } from "@tabler/icons-react";
import _ from "lodash";
import React from "react";

export default function Volunteers() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, refresh } = useSWR("/users/list", {
    userType: "volunteer",
  });

  return (
    <section className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold"> Volunteers </h1>
      </div>

      <div className="col-span-12 rounded-xl bg-white p-6">
        <DataTable<User>
          data={data?.data?.results?.map((user: any) => new User(user)) || []}
          columns={[
            {
              id: "id",
              header: "Id",
              accessorFn: (row) => row.getId(),
              cell: (i) => i.getValue(),
            },
            {
              id: "name",
              header: "Name",
              accessorFn: (row) => row.getName(),
              cell: (i) => i.getValue(),
            },
            {
              id: "mobile",
              header: "Mobile",
              accessorFn: (row) => row.getMobile(),
              cell: (i) => i.getValue(),
            },
            {
              id: "email",
              header: "Email",
              accessorFn: (row) => row.getEmail(),
              cell: (i) => i.getValue(),
            },
            {
              id: "accountStatus",
              header: "Account status",
              accessorFn: (row) => row.getStatus(),
              cell: (i) => (
                <span
                  data-status={i.getValue()}
                  className="rounded-sm border px-2 py-0.5 text-xs data-[status=active]:border-green-300 data-[status=inactive]:border-red-300 data-[status=pending]:border-yellow-300 data-[status=active]:bg-green-100 data-[status=inactive]:bg-red-100 data-[status=pending]:bg-yellow-100 data-[status=active]:text-green-500 data-[status=inactive]:text-red-500 data-[status=pending]:text-yellow-500"
                >
                  {_.startCase(i.getValue() as string)}
                </span>
              ),
            },

            {
              id: "isVerified",
              header: "Account v.status",
              accessorFn: (row) => row.isVerified(),
              cell: (i) => (
                <span
                  data-isVerified={i.getValue()}
                  className="rounded-sm border px-2 py-0.5 text-xs data-[isVerified=false]:border-red-300 data-[isVerified=true]:border-green-300 data-[isVerified=false]:bg-red-100 data-[isVerified=true]:bg-green-100 data-[isVerified=false]:text-red-500 data-[isVerified=true]:text-green-500"
                >
                  {i.getValue() ? "Verified" : "Not Verified"}
                </span>
              ),
            },

            {
              id: "action",
              header: "Action",
              enableSorting: false,
              cell: ({ row }) => (
                <div className="flex items-center gap-0.5">
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
                    <IconEye />
                  </Button>

                  {/* status change button */}
                  <UserStatusChangeButton
                    userId={row.original.id}
                    refresh={refresh}
                    status={row.original.getPanelAccess()}
                  />

                  {/* Delete button */}
                  <UserDeleteButton
                    userId={row.original.id}
                    refresh={refresh}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <UserDetailsDrawer
        userId={selectedId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
}
