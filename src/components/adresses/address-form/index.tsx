import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/inputmask";
import useViaCep from "@/hooks/services/useViaCep";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export default function AddressForm({ form }: { form: UseFormReturn<any> }) {
  const [cep, setCep] = useState<string>("");

  const { data } = useViaCep(cep);

  useEffect(() => {
    if (data) {
      form.setValue("street", data.logradouro);
      form.setValue("neighborhood", data.bairro);
      form.setValue("city", data.localidade);
      form.setValue("state", data.uf);
      form.setValue("country", "Brasil");
    }
  }, [data, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="cep"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Cep</FormLabel>
            <FormControl>
              <Controller
                name="cep"
                control={form.control}
                render={({ field }) => (
                  <InputMask
                    mask="99999-999"
                    alwaysShowMask={false}
                    maskPlaceholder=""
                    type="text"
                    placeholder="12701-050"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      const cepOnlyNumbers = e.target.value.replace("-", "");
                      setCep(cepOnlyNumbers);
                      form.setValue("cep", cepOnlyNumbers);
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
        name="number"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Controller
                name="number"
                control={form.control}
                render={({ field }) => (
                  <InputMask
                    mask="99999"
                    alwaysShowMask={false}
                    maskPlaceholder=""
                    type="text"
                    placeholder="99"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
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
        name="country"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Pais</FormLabel>
            <FormControl>
              <Input placeholder="Brasil" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Input readOnly placeholder="SP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input placeholder="Campinas" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <Input placeholder="Jardim Manaus" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Logradouro</FormLabel>
            <FormControl>
              <Input placeholder="Alameda Jorge News" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input placeholder="Bloco 9" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
