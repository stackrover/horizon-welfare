"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Transaction } from "@/data/transactions/Transaction";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import _ from "lodash";

export default function TransactionDetail({
  trx,
  className,
  showIcon = true,
}: {
  trx: Transaction;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        {showIcon ? (
          <Button variant="ghost" size="icon">
            <IconEye />
          </Button>
        ) : (
          <Button variant="link" className={className}>
            {trx.getTrxId()}
          </Button>
        )}
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-3 w-full max-w-[450px] rounded-xl bg-background after:!bg-transparent">
        <DrawerHeader className="relative">
          <DrawerTitle> Transaction details </DrawerTitle>
          <DrawerDescription className="hidden" />

          <DrawerClose asChild className="absolute right-2 top-2">
            <Button variant="ghost" size="icon">
              <IconX size={18} className="opacity-70" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-4">
          <Table>
            <TableBody className="[&_tr]:!border-none">
              <TableRow>
                <TableCell className="opacity-70"> Transaction ID </TableCell>
                <TableCell className="text-right font-medium">
                  #{trx.getTrxId()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="opacity-70">Status</TableCell>
                <TableCell className="text-right">
                  <span
                    data-status={trx.getTrxStatus()}
                    className="ml-auto flex w-fit items-center gap-1 rounded-xl p-1 text-xs font-medium data-[status=cancelled]:bg-red-50 data-[status=completed]:bg-[#e9f5e3] data-[status=pending]:bg-[#fef6e8] data-[status=cancelled]:text-red-500 data-[status=completed]:text-[#45a216] data-[status=pending]:text-[#d59a02]"
                  >
                    <IconCheck size={12} />
                    {_.startCase(trx.getTrxStatus())}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="opacity-70"> Transaction Date </TableCell>
                <TableCell className="text-right font-medium">
                  {trx.getCreationDate()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="opacity-70"> Donor </TableCell>
                <TableCell className="text-right">
                  {trx.getDonor()?.getName()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="opacity-70"> Amount </TableCell>
                <TableCell className="text-right font-bold">
                  {`${trx.getAmount()} ${trx.getCurrency()}`}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="opacity-70"> Project </TableCell>
                <TableCell className="text-right">
                  {trx.getProject().getTitle()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
