// import { deleteStore } from "@/app/api/companies/delete-store";
import { queryClient } from "@/app/lib/react-query";
import AddressDialog from "@/components/adresses/address-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IStore } from "@/interfaces/Store";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { deleteStore } from "@/app/api/stores/delete-store";
import UpdateStoreForm from "../update-store-form";

export default function StoreCard(store: IStore) {
  const { mutateAsync: deleteStoreFn } = useMutation({
    mutationFn: deleteStore,
    mutationKey: ["delete-store"],
    async onSuccess() {
      toast.success("Loja deletada com sucesso");
      await queryClient.invalidateQueries({
        queryKey: ["get-stores"],
        refetchType: "all",
      });
    },
  });

  async function handleDelete(id: string) {
    deleteStoreFn(id);
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">{store.name}</CardTitle>
        <CardDescription>
          <p>Cadastrada em: { }</p>
          <p>Atualizada em: { }</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex flex-col gap-4">

        <Image
          className="w-full rounded aspect-video object-cover"
          src={store.attachement[0].imagePath}
          alt={store.name}
          width={300}
          height={200}
        />

        <div className="grid grid-cols-2 gap-2 w-full justify-end">
          <p className="text-xs text-muted-foreground grid-cols-1">
            {store.id}
          </p>

          <div className="flex justify-end gap-2.5">
            <AddressDialog {...store.address} />

            <Drawer>

              <DrawerTrigger>
                <Button
                  className="w-8 h-8"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash2 className="w-5" />
                </Button>
              </DrawerTrigger>

              <DrawerContent>

                <DrawerHeader>
                  <DrawerTitle className="line-clamp-1 font-normal">
                    Você tem certeza que deseja{" "}
                    <span className="font-bold underline">
                      deletar {store.name}{" "}
                    </span>
                  </DrawerTitle>

                  <DrawerDescription>
                    Essa ação não poderá ser desfeita. As lojas e reservas
                    vinculadas serão deletadas também!
                  </DrawerDescription>

                </DrawerHeader>

                <DrawerFooter className="flex flex-wrap flex-row">
                  <Button onClick={() => handleDelete(store.id)}
                    variant={"destructive"}>
                    Confirm
                  </Button>

                  <DrawerClose>
                    <Button variant="outline">Voltar</Button>
                  </DrawerClose>
                </DrawerFooter>

              </DrawerContent>
            </Drawer>

            <Dialog>

              <DialogTrigger>
                <Button className="w-8 h-8" size={"icon"} variant={"outline"} >
                  <Edit className="w-5" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar {store.name}</DialogTitle>
                  <UpdateStoreForm {...store} />
                </DialogHeader>
              </DialogContent>

            </Dialog>

          </div>
        </div >

        <Button>Selecionar como atual loja</Button>
      </CardContent>
    </Card >
  );
}
