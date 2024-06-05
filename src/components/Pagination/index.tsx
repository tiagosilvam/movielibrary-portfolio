"use client";

import {
  Pagination as ShadCNPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

export const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <ShadCNPagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
              }
            }}
          />
        </PaginationItem>
        <PaginationItem className="mx-2">
          {page} de {totalPages}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              if (page < totalPages) {
                setPage((prev) => prev + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadCNPagination>
  );
};
