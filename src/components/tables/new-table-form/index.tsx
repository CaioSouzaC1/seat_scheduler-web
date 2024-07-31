import { storeNewTable } from "@/app/api/tables/store-new-table";
import { queryClient } from "@/app/lib/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/context/StoreContext/Index";
import { newTableSchema } from "@/schemas/tables";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function NewTableForm() {
  const { store } = useStore();
  const [creating, setCreating] = useState<boolean>(false);
  const cardContentRef = useRef(null);

  const form = useForm<z.infer<typeof newTableSchema>>({
    resolver: zodResolver(newTableSchema),
    defaultValues: {
      number: 10,
      numberOfChairs: 4,
      observation: "",
    },
  });

  const { mutateAsync: storeNewTableFn } = useMutation({
    mutationFn: storeNewTable,
    mutationKey: ["store-new-table"],
    async onSuccess() {
      toast.success("Mesa cadastrada com sucesso.");
      await queryClient.invalidateQueries({
        queryKey: ["get-tables"],
        refetchType: "all",
      });
      form.reset();
      setCreating(false);
    },
    onError() {
      toast.error("Erro ao cadastrar mesa!");
      setCreating(false);
    },
  });

  async function onSubmit(values: z.infer<typeof newTableSchema>) {
    setCreating(true);
    storeNewTableFn({
      ...values,
      storeId: store?.id!,
    });
  }

  return (
    <Card>
      <CardContent
        ref={cardContentRef}
        className="max-h-[70vh] overflow-y-auto">
        <Form {...form}>
          <form
            className="w-full max-w-xl p-4 rounded-sm grid grid-cols-2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Número da mesa</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10"
                      {...field}
                      onChange={(e) => {
                        form.setValue("number", Number(e.target.value));
                      }}
                    />
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
                  <FormLabel>Número de cadeiras</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              disabled={creating}
              type="submit"
              variant={"constructive"}
              className="w-full col-span-2">
              <span>Cadastrar</span>
              <CirclePlus className="ml-2 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
