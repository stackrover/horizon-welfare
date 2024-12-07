"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { makeData, Person } from "@/lib/makeData";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  IconCopy,
  IconDots,
  IconEdit,
  IconFilter,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
import { cn } from "@/lib/utils";

const DataTable = dynamic(() => import("@/components/data-table/Table"), {
  loading: () => <Loader className="h-[600px]" />,
  ssr: false,
});

export default function Transactions() {
  const data = React.useMemo(() => makeData(1000), []);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const columns: ColumnDef<Person>[] = React.useMemo(
    () => [
      {
        accessorKey: "firstName",
        id: "firstName",
        header: "Date",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "lastName",
        id: "lastName",
        header: "Trx Id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        id: "age",
        header: "Project",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        id: "visits",
        header: "Amount",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        id: "progress",
        header: "Method",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex justify-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <IconDots size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2 text-base-300 focus:cursor-pointer">
                    <IconCopy size={18} />
                    <span>Copy</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-base-300 focus:cursor-pointer">
                    <IconEdit size={18} />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive focus:cursor-pointer focus:text-destructive">
                    <IconTrash size={18} />
                    <span>Delete</span>
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
        data={data}
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
            <Button variant="secondary" className="hidden px-3 md:flex">
              <IconFilter size={20} />
              <span>Filter</span>
            </Button>
            <Button variant="secondary" className="flex px-3 md:hidden">
              <IconFilter size={20} />
            </Button>
          </div>
        }
      />
    </main>
  );
}
