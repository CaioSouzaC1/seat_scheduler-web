import { storeNewCompany } from "@/app/api/auth/companies/store-new-company";
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
import { newCompanySchema } from "@/schemas/companies";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function NewCompanyForm() {
  const [creating, setCreating] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const cardContentRef = useRef(null);

  const form = useForm<z.infer<typeof newCompanySchema>>({
    resolver: zodResolver(newCompanySchema),
    defaultValues: {
      name: "",
      cnpj: "",
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

  const { mutateAsync: storeNewCompanyFn } = useMutation({
    mutationFn: storeNewCompany,
    mutationKey: ["store-new-company"],
    async onSuccess() {
      toast.success("Empresa cadastrada com sucesso.");
      await queryClient.invalidateQueries({
        queryKey: ["get-companies"],
        refetchType: "all",
      });
      form.reset();
      setCreating(false);
      setImageFile(null);
    },
    onError() {
      toast.error("Erro ao cadastrar empresa");
      setCreating(false);
    },
  });

  async function onSubmit(values: z.infer<typeof newCompanySchema>) {
    setCreating(true);
    storeNewCompanyFn({
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
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhow's Delivery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Cnpj</FormLabel>
                  <FormControl>
                    <Controller
                      name="cnpj"
                      control={form.control}
                      render={({ field }) => (
                        <InputMask
                          mask="99.999.999/9999-99"
                          alwaysShowMask={false}
                          maskPlaceholder=""
                          type="text"
                          placeholder="00.000.000/0000-00"
                          value={field.value}
                          onChange={(e) => {
                            const cleanedValue = e.target.value.replace(
                              /[.\-/]/g,
                              ""
                            );
                            field.onChange(cleanedValue);
                            form.setValue("cnpj", cleanedValue);
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
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
    </Card>
  );
}
