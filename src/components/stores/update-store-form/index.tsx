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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/inputmask";
import { IStore } from "@/interfaces/Store";
import { newStoreSchema } from "@/schemas/stores";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import Image from "next/image";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetCompanies } from "@/hooks/queries/companies/use-get-companies";
import { updateStore } from "@/app/api/stores/update-store";
import { ICompany } from "@/interfaces/Companies";

export default function UpdateStoreForm(store: IStore) {
  const [creating, setCreating] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const cardContentRef = useRef(null);

  const form = useForm<z.infer<typeof newStoreSchema>>({
    resolver: zodResolver(newStoreSchema),
    defaultValues: {
      name: store.name,
      phone: store.phone,
      description: store.description,
      cep: store.address.cep,
      number: store.address.number.toString(),
      country: store.address.country,
      state: store.address.state,
      city: store.address.city,
      neighborhood: store.address.neighborhood,
      street: store.address.street,
      complement: store.address.complement ?? "",
      companyId: store.companyId,
      image: undefined,
    },
  });

  const { mutateAsync: updateStoreFn } = useMutation({
    mutationFn: updateStore,
    mutationKey: ["update-store"],
    async onSuccess() {
      toast.success("Loja editada com sucesso.");
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
    updateStoreFn({
      id: store.id,
      ...values,
      image: imageFile,
    });
  }

  const { companies } = useGetCompanies()

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
              name="companyId"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Companias</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={store.companyId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma compania" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies && companies.data.data.length != 0 ? (
                        <>
                          {companies.data.data.map((e: ICompany) => (
                            <SelectItem value={e.id} key={e.id} >{e.name}</SelectItem>

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

            <div>
              <FormLabel>Adicionar nova logo</FormLabel>
              <LogoForm
                form={form}
                imageFile={imageFile}
                setImageFile={setImageFile}
              />
            </div>

            <Popover>
              <PopoverTrigger className="w-full">
                <Button className="w-full my-4" size={"sm"} type="button">
                  Logo atual
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Image
                  src={store.attachement[0].imagePath}
                  width={300}
                  height={200}
                  alt={store.name}
                />
              </PopoverContent>
            </Popover>

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
    </Card>
  );
}
