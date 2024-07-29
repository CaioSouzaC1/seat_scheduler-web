import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TablesTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-8 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-12 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-28 h-4" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-40 h-4" />
      </TableCell>
    </TableRow>
  );
}
