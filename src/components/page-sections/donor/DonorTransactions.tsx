"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Person } from "@/lib/makeData";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  IconCopy,
  IconDots,
  IconDownload,
  IconFilterX,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { endOfDay, format, isWithinInterval, parse } from "date-fns";
import dynamic from "next/dynamic";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Loader } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DonorTransaction } from "@/data/donor/donorTransaction";
import { cn } from "@/lib/utils";

const DataTable = dynamic(() => import("@/components/data-table/Table"), {
  loading: () => <Loader className="h-[600px]" />,
  ssr: false,
});

export function DonorTransactions({
  dataPromise,
}: {
  dataPromise: Promise<any>;
}) {
  const data = React.use(dataPromise);

  const serializedData = React.useMemo(
    () =>
      data?.results?.length > 0
        ? data.results.map((d: any) => new DonorTransaction(d))
        : [],
    [data],
  );

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [tableData, setTableData] =
    React.useState<DonorTransaction[]>(serializedData);

  // date filtering
  React.useEffect(() => {
    if (date?.from && !date?.to) {
      const fromDate = parse(
        format(date.from, "dd/MM/yyyy hh:mm a"),
        "dd/MM/yyyy hh:mm a",
        new Date(),
      );
      const toDate = endOfDay(
        parse(
          format(date.from, "dd/MM/yyyy hh:mm a"),
          "dd/MM/yyyy hh:mm a",
          new Date(),
        ),
      );

      const filteredData = serializedData.filter((item: DonorTransaction) => {
        const createdAt = parse(
          item.createdAt,
          "dd/MM/yyyy hh:mm a",
          new Date(),
        );
        return isWithinInterval(createdAt, { start: fromDate, end: toDate });
      });

      setTableData(filteredData);
    } else if (date?.from && date?.to) {
      const fromDate = parse(
        format(date.from, "dd/MM/yyyy hh:mm a"),
        "dd/MM/yyyy hh:mm a",
        new Date(),
      );
      const toDate = endOfDay(
        parse(
          format(date.to, "dd/MM/yyyy hh:mm a"),
          "dd/MM/yyyy hh:mm a",
          new Date(),
        ),
      );

      const filteredData = serializedData.filter((item: DonorTransaction) => {
        const createdAt = parse(
          item.createdAt,
          "dd/MM/yyyy hh:mm a",
          new Date(),
        );
        return isWithinInterval(createdAt, { start: fromDate, end: toDate });
      });

      setTableData(filteredData);
    } else {
      setTableData(serializedData);
    }
  }, [date?.from, date?.to, serializedData]);

  const columns: ColumnDef<Person>[] = React.useMemo(
    () => [
      {
        accessorKey: "createdAt",
        id: "createdAt",
        header: "Date",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "trxId",
        id: "trxId",
        header: "Trx Id",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "projectTitle",
        id: "projectTitle",
        header: "Project",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "amount",
        id: "amount",
        header: "Amount",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "paymentMethod",
        id: "paymentMethod",
        header: "Method",
        cell: (info) => info.getValue() || "-",
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex justify-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                asChild
                disabled={
                  ["completed", "failed"].indexOf(info.row.original.status) ===
                  -1
                }
              >
                <button className="outline-none">
                  <IconDots size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2 text-base-300 focus:cursor-pointer">
                    <IconDownload size={18} />
                    <span>Download Receipt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-base-300 focus:cursor-pointer">
                    <IconCopy size={18} />
                    <span>Copy Trx ID</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <main className="container">
      <h1 className="my-5 text-2xl font-semibold leading-9 md:my-8 md:text-[30px]">
        Donation History
      </h1>
      <DataTable
        data={tableData}
        columns={columns}
        elements={
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "-max-w-[300px] justify-start gap-2 border-base-200 text-left font-normal text-base-300 hover:bg-base-100 hover:text-base-300",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
            <Button
              type="button"
              onClick={() =>
                setDate({
                  from: undefined,
                  to: undefined,
                })
              }
              variant="secondary"
              className="gap-1 px-3"
            >
              <IconFilterX size={20} />
              <span className="hidden md:flex">Clear</span>
            </Button>
          </div>
        }
      />
    </main>
  );
}
