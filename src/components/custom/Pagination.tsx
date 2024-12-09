"use client";

import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
  currentPage: number;
  className?: string;
};

export function Pagination({
  pageCount,
  handlePageChange,
  currentPage,
  className,
}: PaginationProps) {
  return (
    <div className={cn("mx-2 my-5 flex justify-end", className)}>
      <ReactPaginate
        containerClassName={"pagination"}
        className={"pagination"}
        previousLabel={
          <div className="flex items-center gap-x-1">
            <IconChevronLeft size={14} />
            <span className="text-sm">Prev</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center gap-x-1">
            <span className="text-sm">Next</span>
            <IconChevronRight size={14} />
          </div>
        }
        activeLinkClassName="bg-secondary text-white hover:bg-secondary hover:text-white border-secondary"
        pageLinkClassName="flex items-center justify-center whitespace-nowrap rounded text-sm font-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary border active:bg-secondary active:text-white shadow-sm px-3 py-2 hover:bg-secondary hover:text-base-0"
        previousLinkClassName="flex items-center justify-center rounded text-sm shadow-sm px-3 py-2 border hover:text-white hover:bg-secondary active:bg-secondary active:text-white"
        nextLinkClassName="flex items-center justify-center rounded text-sm shadow-sm px-3 py-2 border hover:text-white hover:bg-secondary active:bg-secondary active:text-white"
        breakLabel="..."
        breakLinkClassName="flex items-center justify-center whitespace-nowrap rounded text-sm font-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary border active:bg-secondary active:text-white shadow-sm px-3 py-2 hover:bg-secondary hover:text-base-0"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        disabledLinkClassName="opacity-50 pointer-events-none"
      />
    </div>
  );
}
