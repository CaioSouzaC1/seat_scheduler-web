import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeMenuItemSchema } from "@/schemas/menu-items";
import { useStore } from "@/context/StoreContext/Index";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/lib/react-query";
import { toast } from "sonner";
import { storeNewMenuItem } from "@/app/api/menu-items/store-new-menu-item";
import { StoreMenuItemSchema } from "@/interfaces/MenuItem";

export default function NewMenuItemDialog() {
  const { store } = useStore();

  const form = useForm<StoreMenuItemSchema>({
    resolver: zodResolver(storeMenuItemSchema),
    defaultValues: {
      name: "",
      price: 1,
      description: "",
      storeId: store?.id,
    },
  });

  const { mutateAsync: storeNewMenuItemFn } = useMutation({
    mutationFn: storeNewMenuItem,
    mutationKey: ["get-menu-items"],
    async onSuccess(_) {
      toast.success("Item cadastrado com sucesso");
      await queryClient.invalidateQueries({
        queryKey: ["get-companies"],
        refetchType: "all",
      });
      form.reset();
    },
  });

  async function onSubmit(data: StoreMenuItemSchema) {
    await storeNewMenuItemFn(data);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-2" variant="secondary">
          <span>Cadastrar</span>
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo item no menu</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Preço"
                      {...field}
                      onChange={(e) =>
                        form.setValue("price", Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
