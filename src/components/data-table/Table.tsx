"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { Pagination } from "@/components";
import { Person } from "@/lib/makeData";
import { DebouncedInput } from "./DebouncedInput";
import { fuzzyFilter } from "./fuzzyFilter";

type DataTableProps = {
  data: Person[];
  columns: ColumnDef<Person>[];
  elements?: React.ReactNode;
};

export default function DataTable({ data, columns, elements }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: "fuzzy",
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    table.setPageIndex(selected);
  };

  return (
    <div className="block max-w-full p-2">
      <div className="mb-4 flex items-center justify-between">
        <div>{elements ? elements : null}</div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block max-w-[300px] border p-2 shadow"
          placeholder="Search transactions"
        />
      </div>

      <div className="overflow-x-auto border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ position: "relative", width: header.getSize() }}
                      className="h-12 border-y px-5 text-left text-[13px] font-semibold uppercase leading-[15px] text-[#4B465C]"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center justify-between"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.id !== "actions" ? (
                          <div className="">
                            <IconChevronUp
                              className={`${(header.column.getIsSorted() as string) === "asc" ? "text-base-400" : "text-base-400/30"}`}
                              size={16}
                            />
                            <IconChevronDown
                              className={`${(header.column.getIsSorted() as string) === "desc" ? "text-base-400" : "text-base-400/30"}`}
                              size={16}
                            />
                          </div>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="h-[60px] border-y px-5 text-[15px] font-semibold leading-[22px] text-[#4B465C]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-base-300">
          Showing{" "}
          {table.getState().pagination.pageSize *
            table.getState().pagination.pageIndex +
            1}{" "}
          to{" "}
          {table.getState().pagination.pageSize *
            table.getState().pagination.pageIndex +
            +table.getState().pagination.pageSize}{" "}
          of {table.getRowCount()} entries
        </h4>
        <Pagination
          currentPage={table.getState().pagination.pageIndex}
          handlePageChange={handlePageChange}
          pageCount={table.getPageCount()}
        />
      </div>
    </div>
  );
}
