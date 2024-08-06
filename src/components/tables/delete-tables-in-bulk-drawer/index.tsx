import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Trash2 } from "lucide-react";

export default function DeleteTablesInBulkDrawer({
  tables,
}: {
  tables: string[];
}) {
  console.log(tables);
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          disabled={tables.length === 0}
          variant={"destructive"}
          className="flex gap-2">
          <span>Deletar em massa</span> <Trash2 size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
