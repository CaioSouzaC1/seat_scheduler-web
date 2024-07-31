import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { EllipsisVertical, RockingChair } from "lucide-react";

export default function TablesTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Checkbox disabled />
      </TableCell>
      <TableCell className="font-bold">
        <Badge>
          <Skeleton className="w-2 h-4" />
        </Badge>
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
        <Button
          disabled
          variant={"secondary"}
          size={"sm"}
          className="flex gap-2">
          <span>Gerenciar</span>
          <EllipsisVertical size={16} />
        </Button>{" "}
      </TableCell>
    </TableRow>
  );
}
