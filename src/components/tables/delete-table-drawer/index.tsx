import { ITable } from "@/interfaces/Tables";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteTable } from "@/app/api/tables/delete-table";
import { toast } from "sonner";
import { queryClient } from "@/app/lib/react-query";
export default function DeleteTableDrawer(table: ITable) {
  const { mutateAsync: deleteTableFn } = useMutation({
    mutationFn: deleteTable,
    mutationKey: ["delete-company"],
    async onSuccess() {
      toast.success("Mesa deletada com sucesso");
      await queryClient.invalidateQueries({
        queryKey: ["get-tables"],
        refetchType: "all",
      });
    },
  });

  async function handleDelete(id: string) {
    deleteTableFn(id);
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className="flex items-center gap-2 w-full"
          size={"sm"}
          variant={"destructive"}>
          <span>Deletar</span> <Trash2 size={14} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Você tem certeza que deseja apagar a mesa {table.number} ?
          </DrawerTitle>
          <DrawerDescription>ID:{table.id}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row gap-2">
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => handleDelete(table.id)}>
            Deletar
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
