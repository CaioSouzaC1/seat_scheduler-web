import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { queryClient } from "@/app/lib/react-query";
import AddressForm from "@/components/adresses/address-form";
import LogoForm from "@/components/forms/logo";
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
import { InputMask } from "@/components/ui/inputmask";
import { newStoreSchema } from "@/schemas/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useGetCompanies } from "@/hooks/queries/companies/use-get-companies";
import { ICompany } from "@/interfaces/Companies";
import { Skeleton } from "@/components/ui/skeleton";
import { storeNewStore } from "@/app/api/stores/store-new-store";

export default function NewStoreForm() {
  const [creating, setCreating] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const cardContentRef = useRef(null);
  const { companies } = useGetCompanies()

  const form = useForm<z.infer<typeof newStoreSchema>>({
    resolver: zodResolver(newStoreSchema),
    defaultValues: {
      name: "",
      phone: "",
      description: "",
      companyId: "",
      cep: "",
      number: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      complement: "",
      image: undefined,
    },
  });

  const { mutateAsync: storeNewStoreFn } = useMutation({
    mutationFn: storeNewStore,
    mutationKey: ["store-new-store"],
    async onSuccess() {
      toast.success("store cadastrada com sucesso.");
      await queryClient.invalidateQueries({
        queryKey: ["get-stores"],
        refetchType: "all",
      });
      form.reset();
      setCreating(false);
      setImageFile(null);
    },
    onError() {
      toast.error("Erro ao cadastrar loja");
      setCreating(false);
    },
  });

  async function onSubmit(values: z.infer<typeof newStoreSchema>) {
    setCreating(true);
    storeNewStoreFn({
      ...values,
      image: imageFile,
    });
  }

  return (
    <Card>
      <CardContent
        ref={cardContentRef}
        className="max-h-[70vh] overflow-y-auto">
        <Form {...form}>
          <form
            className="w-full max-w-xl p-4 rounded-sm"
            onSubmit={form.handleSubmit(onSubmit)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Nome da loja</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhow's Delivery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={() => (
                <FormItem className="mb-4">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <InputMask
                          mask="(99) 99999-9999"
                          alwaysShowMask={false}
                          maskPlaceholder=""
                          type="text"
                          placeholder="(11) 99887-6655"
                          value={field.value}
                          onChange={(e) => {
                            const cleanedValue = e.target.value.replace(
                              /[()\s-]/g,
                              ""
                            );
                            field.onChange(cleanedValue);
                            form.setValue("phone", cleanedValue);
                          }}
                        />
                      )}
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
                <FormItem className="mb-4">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da loja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Companias</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma compania" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies && companies.data.data.length != 0 ? (
                        <>
                          {companies.data.data.map((e: ICompany) => (
                            <SelectItem value={e.id} key={e.id}>{e.name}</SelectItem>

                          ))}
                        </>
                      ) : (
                        <Skeleton className="w-full h-10" />
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <LogoForm
              form={form}
              imageFile={imageFile}
              setImageFile={setImageFile}
            />


            <div className="grid grid-cols-2 gap-x-4">
              <AddressForm form={form} />
            </div>

            <Button
              disabled={creating}
              type="submit"
              variant={"constructive"}
              className="w-full">
              <span>Enviar</span>
              <CirclePlus className="ml-2 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}
