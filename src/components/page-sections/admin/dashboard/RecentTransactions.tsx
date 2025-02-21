"use client";

import DataTable from "@/components/data-table/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "@/data/transactions/Transaction";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import TransactionDetail from "../transaction/TransactionDetails";

export default function RecentTransactons() {
  const { data, isLoading } = useSWR("/donor/donations/recent");

  return (
    <Card>
      <CardHeader>
        <CardTitle> Recent Transactions </CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>

      <CardContent>
        <div className="col-span-12 rounded-xl bg-white">
          {isLoading ? (
            <div> Loading...</div>
          ) : (
            <DataTable<Transaction>
              data={data?.data?.results?.map(
                (trx: any) => new Transaction(trx),
              )}
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
                    return <TransactionDetail trx={i.row.original} />;
                  },
                },
              ]}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
