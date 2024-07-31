import { ITable } from "@/interfaces/Tables";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { editTableSchema } from "@/schemas/tables";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateTable } from "@/app/api/tables/update-table";
import { toast } from "sonner";
import { queryClient } from "@/app/lib/react-query";
import { useRef, useState } from "react";

export default function UpdateTableDialog(table: ITable) {
  const [updating, setUpdating] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof editTableSchema>>({
    resolver: zodResolver(editTableSchema),
    defaultValues: {
      numberOfChairs: table.numberOfChairs,
      observation: table.observation,
      status: table.status,
    },
  });

  const { mutateAsync: updateTableFn } = useMutation({
    mutationFn: updateTable,
    mutationKey: ["update-table"],
    async onSuccess() {
      toast.success("Mesa editada com sucesso.");
      await queryClient.invalidateQueries({
        queryKey: ["get-tables"],
        refetchType: "all",
      });
      form.reset();
      setUpdating(false);
    },
    onError() {
      toast.error("Erro ao editar mesa");
    },
  });

  async function onSubmit(values: z.infer<typeof editTableSchema>) {
    setUpdating(true);
    updateTableFn({
      ...values,
      numberOfChairs: Number(values.numberOfChairs),
      storeId: table.storeId,
      id: table.id,
      number: table.number,
    });
    closeButtonRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2 w-full">
          <span>Atualizar</span>
          <Edit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar mesa {table.number}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full max-w-xl p-4 rounded-sm grid grid-cols-2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-4">
              <FormLabel>Número</FormLabel>
              <Input disabled defaultValue={table.number} readOnly />
            </div>

            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Próxima a churrasqueira..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Reservada" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChairs"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Nº de cadeiras</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="4"
                      {...field}
                      onChange={(e) => {
                        form.setValue("numberOfChairs", Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="secondary"
              disabled={updating}
              className="w-full"
              type="submit">
              Atualizar
            </Button>

            <DialogClose asChild>
              <Button ref={closeButtonRef} type="button" variant="outline">
                Voltar
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
