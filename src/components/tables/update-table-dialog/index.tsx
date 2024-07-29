import { ITable } from "@/interfaces/Tables";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function UpdateTableDialog(table: ITable) {
  const form = useForm<z.infer<typeof editTableSchema>>({
    resolver: zodResolver(editTableSchema),
    defaultValues: {
      id: table.id,
      number: table.number,
      numberOfChairs: table.numberOfChairs,
      observation: table.observation,
      status: table.status,
      storeId: table.storeId,
    },
  });

  // const { mutateAsync: updateCompanyFn } = useMutation ({
  //   mutationFn: updateCompany,
  //   mutationKey: ["update-company"],
  //   async onSuccess() {
  //     toast.success("Empresa editada com sucesso.");
  //     await queryClient.invalidateQueries({
  //       queryKey: ["get-companies"],
  //       refetchType: "all",
  //     });
  //     form.reset();
  //     setCreating(false);
  //     setImageFile(null);
  //   },
  //   onError() {
  //     toast.error("Erro ao editar empresa");
  //     setCreating(false);
  //   },
  // });

  // async function onSubmit(values: z.infer<typeof newCompanySchema>) {
  //   setCreating(true);
  //   updateCompanyFn({
  //     id: company.id,
  //     ...values,
  //     image: imageFile,
  //   });
  // }

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
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
