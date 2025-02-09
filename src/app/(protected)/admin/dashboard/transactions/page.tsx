"use client";

import DataTable from "@/components/data-table/Table";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/data/transactions/Transaction";
import { useSWR } from "@/hooks/use-swr";
import { IconEye } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Transactions() {
  const { data } = useSWR("/donor/donations");
  const pathname = usePathname();

  return (
    <section className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <h1 className="text-2xl font-bold"> Transactions </h1>
      </div>

      <div className="col-span-12 rounded-xl bg-white p-6">
        <DataTable<Transaction>
          data={
            data?.data?.results?.map((trx: any) => new Transaction(trx)) || []
          }
          columns={[
            {
              id: "trx",
              header: "trxId",
              accessorFn: (row) => row.getTrxId(),
              cell: (i) => i.getValue(),
            },
            {
              id: "name",
              header: "Donor",
              accessorFn: (r) => r.getDonor()?.getName(),
              cell: (i) => i.getValue(),
            },
            {
              id: "project",
              header: "Project",
              accessorFn: (r) => r.getProject().getTitle(),
              cell: (i) => i.getValue(),
            },
            {
              id: "amount",
              header: "Amount",
              accessorFn: (r) => r.getAmount(),
              cell: (i) => (
                <span className="font-bold">
                  {`${i.getValue() as string} ${i.row.original?.getCurrency()}`}
                </span>
              ),
            },
            {
              id: "Trx_status",
              header: "Trx status",
              accessorFn: (r) => r.getTrxStatus(),
              cell: (i) => (
                <span
                  data-status={i.getValue()}
                  className="rounded-sm border px-2 py-0.5 text-xs font-semibold data-[status=cancelled]:border-red-300 data-[status=completed]:border-green-300 data-[status=pending]:border-yellow-300 data-[status=cancelled]:bg-red-100 data-[status=completed]:bg-green-100 data-[status=pending]:bg-yellow-100 data-[status=cancelled]:text-red-500 data-[status=completed]:text-green-500 data-[status=pending]:text-yellow-500"
                >
                  {_.startCase(i.getValue() as string)}
                </span>
              ),
            },

            {
              id: "subscription",
              header: "Subscription",
              accessorFn: (r) => r.isSubscriptionMoney(),
              cell: (i) => _.startCase(i.getValue() as string),
            },

            {
              id: "actions",
              header: "action",
              enableSorting: false,
              cell: (i) => {
                return (
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-50 hover:opacity-100"
                      title="View"
                      asChild
                    >
                      <Link href={`${pathname}/${i.row.original?.getId()}`}>
                        <IconEye />
                      </Link>
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </section>
  );
}
