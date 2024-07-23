import { deleteCompany } from "@/app/api/auth/companies/delete-company";
import { queryClient } from "@/app/lib/react-query";
import AddressDialog from "@/components/adresses/address-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ICompany } from "@/interfaces/Companies";
import { formatDate } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function CompanyCard(company: ICompany) {
  const { mutateAsync: deleteCompanyFn } = useMutation({
    mutationFn: deleteCompany,
    mutationKey: ["delete-company"],
    async onSuccess() {
      toast.success("Empresa deletada com sucesso");
      await queryClient.invalidateQueries({
        queryKey: ["get-companies"],
        refetchType: "all",
      });
    },
  });

  console.log(company);

  async function handleDelete(id: string) {
    deleteCompanyFn(id);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">{company.name}</CardTitle>
        <CardDescription>
          <p>Cadastrada em: {formatDate(company.createdAt)}</p>
          <p>Atualizada em: {formatDate(company.updatedAt)}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-4">
        <Image
          className="w-full rounded aspect-video object-cover"
          src={company.attachement[0].imagePath}
          alt={company.name}
          width={300}
          height={200}
        />

        <div className="grid grid-cols-2 gap-2 w-full justify-end">
          <p className="text-xs text-muted-foreground grid-cols-1">
            {company.id}
          </p>
          <div className="flex justify-end gap-2.5">
            <AddressDialog {...company.address} />
            <Drawer>
              <DrawerTrigger>
                <Button
                  className="w-8 h-8"
                  variant={"destructive"}
                  size={"icon"}>
                  <Trash2 className="w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="line-clamp-1 font-normal">
                    Você tem certeza que deseja{" "}
                    <span className="font-bold underline">
                      deletar {company.name}{" "}
                    </span>
                  </DrawerTitle>
                  <DrawerDescription>
                    Essa ação não poderá ser desfeita. As lojas e reservas
                    vinculadas serão deletadas também!
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="flex flex-wrap flex-row">
                  <Button
                    onClick={() => handleDelete(company.id)}
                    variant={"destructive"}>
                    Confirmar
                  </Button>
                  <DrawerClose>
                    <Button variant="outline">Voltar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Dialog>
              <DialogTrigger>
                <Button className="w-8 h-8" size={"icon"} variant={"outline"}>
                  <Edit className="w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
