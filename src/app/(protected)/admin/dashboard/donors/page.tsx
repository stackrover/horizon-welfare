"use client";

import DataTable from "@/components/data-table/Table";
import DonorProfileDrawer from "@/components/page-sections/admin/donor/ProfilePreviewDrawer";
import { Button } from "@/components/ui/button";
import { DonorData } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Donors() {
  const { data, isLoading } = useSWR("/donor/profile/list");
  const sp = useSearchParams();
  const pathname = usePathname();

  const donorId = sp.get("donorId");

  const getTableData = (data: Record<string, any>[]) => {
    let tData = [...data];

    if (donorId) {
      tData = data?.filter((u: any) => u.id === +donorId);
    }

    return tData?.map((user: any) => new DonorData(user)) || [];
  };

  return (
    <section className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold"> Donors </h1>
      </div>

      <div className="col-span-12 rounded-xl bg-white p-6">
        {isLoading ? (
          <div> Loading...</div>
        ) : (
          <DataTable<DonorData>
            elements={
              donorId && (
                <Button variant="secondary" asChild>
                  <Link href={pathname}>Clear Filter</Link>
                </Button>
              )
            }
            data={getTableData(data?.data?.results)}
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
                id: "gender",
                header: "Gender",
                accessorFn: (row) => row.getGender(),
                cell: (i) => _.startCase(i.getValue() as string),
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
                id: "nationality",
                header: "Nationality",
                accessorFn: (row) => row.getNationality(),
                cell: (i) => i.getValue(),
              },

              {
                id: "donate",
                header: "Donate",
                accessorFn: (row) => row.getTotalDonation(),
                cell: (i) => (
                  <strong className="whitespace-nowrap font-bold">
                    {`${i.getValue()} ${i.row.original?.getCurrency()}`}
                  </strong>
                ),
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
                id: "actions",
                header: "Action",
                cell: ({ row }) => <DonorProfileDrawer donor={row.original} />,
              },
            ]}
          />
        )}
      </div>
    </section>
  );
}
