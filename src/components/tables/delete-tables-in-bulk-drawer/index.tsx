import { deleteTablesInBulk } from "@/app/api/tables/delete-tables-in-bulk";
import { queryClient } from "@/app/lib/react-query";
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
import { useStore } from "@/context/StoreContext/Index";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default function DeleteTablesInBulkDrawer({
  tables,
  form,
}: {
  tables: string[];
  form: UseFormReturn<{
    tables: string[];
  }>;
}) {
  const { store } = useStore();

  const { mutateAsync: deleteTablesInBulkFn } = useMutation({
    mutationFn: deleteTablesInBulk,
    mutationKey: ["delete-tables-in-bulk"],
    async onSuccess() {
      toast.success("mesas apagadas com sucesso.");
      await queryClient.invalidateQueries({
        queryKey: ["get-tables"],
        refetchType: "all",
      });
      form.reset();
    },
    onError() {
      toast.error("Erro ao apagar mesas!");
    },
  });

  const handleDeleteTables = form.handleSubmit(async (data) => {
    deleteTablesInBulkFn({
      tables: data.tables,
      storeId: store?.id!,
    });
  });

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
          <DrawerTitle>
            Você tem certeza que deseja apagar essas mesas em massa?
          </DrawerTitle>
          <DrawerDescription>
            Essa ação não vai poder ser desfeita.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row gap-4">
          <Button
            onClick={handleDeleteTables}
            variant={"destructive"}
            className="w-20">
            Apagar
          </Button>
          <DrawerClose className="w-20">
            <Button variant="outline">Voltar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
