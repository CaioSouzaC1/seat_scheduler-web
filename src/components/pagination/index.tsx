import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { handlePaginate } from "@/lib/utils";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage?: number;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage = 20,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {pageIndex} of {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(1, searchParams, router)}
            disabled={pageIndex === 1}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page </span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pageIndex - 1, searchParams, router)}
            disabled={pageIndex === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previus page</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pageIndex + 1, searchParams, router)}
            disabled={pageIndex === pages}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pages, searchParams, router)}
            disabled={pageIndex === pages}>
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
