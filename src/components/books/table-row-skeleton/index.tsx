import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { EllipsisVertical, RockingChair } from "lucide-react";

export default function BooksTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="font-bold">
        <Skeleton className="w-4 h-4" />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <span>
            <Skeleton className="w-4 h-4" />
          </span>
          <RockingChair size={16} />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-10 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-40 h-4" />
      </TableCell>
    </TableRow>
  );
}
