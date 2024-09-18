import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { DollarSign } from "lucide-react";

export default function MenuItemTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox disabled />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <DollarSign size={16} />
          <span>
            <Skeleton className="w-8 h-4" />
          </span>
        </div>
      </TableCell>
      <TableCell className="font-bold">
        <Skeleton className="w-14 h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20 h-4" />
      </TableCell>
    </TableRow>
  );
}
