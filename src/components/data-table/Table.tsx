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
import { DebouncedInput } from "./DebouncedInput";
import { fuzzyFilter } from "./fuzzyFilter";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  elements?: React.ReactNode;
};

export default function DataTable<T>({
  data,
  columns,
  elements,
}: DataTableProps<T>) {
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
      <div className="mb-4 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
        <div>{elements ? elements : null}</div>
        <DebouncedInput
          type="search"
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block max-w-[300px] border px-3 py-2 shadow"
          placeholder="Search..."
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
                      className="h-12 border-y px-5 text-left text-[11px] font-semibold uppercase leading-[15px] text-[#4B465C] md:text-[13px]"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center justify-between gap-x-2"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.id !== "actions" ? (
                          <div className="flex flex-col">
                            <IconChevronUp
                              className={`-mb-[3px] md:-mb-0 ${(header.column.getIsSorted() as string) === "asc" ? "text-base-400" : "text-base-400/30"}`}
                              size={14}
                            />
                            <IconChevronDown
                              className={`-mt-[3px] md:-mb-0 ${(header.column.getIsSorted() as string) === "desc" ? "text-base-400" : "text-base-400/30"}`}
                              size={14}
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
                <tr
                  key={row.id}
                  className="even:bg-neutral-50 hover:bg-neutral-100"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="border-y px-5 py-2 text-[10px] leading-[22px] text-[#4B465C] md:text-[15px]"
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
            +table.getRowCount()}{" "}
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
