import { ITable } from "@/interfaces/Tables";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, RockingChair } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import DeleteTableDrawer from "../delete-table-drawer";
import UpdateTableDialog from "../update-table-dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function TablesTableRow(table: ITable) {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-bold">
        <Badge>{table.number}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <span>{table.numberOfChairs}</span> <RockingChair size={16} />
        </div>
      </TableCell>
      <TableCell>{table.status}</TableCell>
      <TableCell>{table.observation}</TableCell>
      <TableCell className="w-36">
        <Popover>
          <PopoverTrigger>
            <Button variant={"secondary"} size={"sm"} className="flex gap-2">
              <span>Gerenciar</span>
              <EllipsisVertical size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36">
            <div className="flex flex-col gap-2">
              <p className="font-medium cursor-none text-sm">
                Mesa {table.number}
              </p>
              <Separator />
              <DeleteTableDrawer {...table} />
              <Separator />
              <UpdateTableDialog {...table} />
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
