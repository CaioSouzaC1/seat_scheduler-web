"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useViaCep from "@/hooks/services/useViaCep";
import { registerFormSchema } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { storeNewUser } from "@/app/api/auth/register/store-new-user";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import CreatedAccountCard from "./created-account-card";

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [cep, setCep] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      cep: "",
      number: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      complement: "",
    },
  });

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

  const { mutateAsync: storeNewUserFn } = useMutation({
    mutationFn: storeNewUser,
    mutationKey: ["store-new-user"],
    async onSuccess() {
      setStep(3);
      const result = await signIn("credentials", {
        email: form.getValues().email,
        password: form.getValues().password,
        redirect: false,
      });
      if (result && result.ok) {
        toast.success("bem vindo");
        router.push("/dashboard");
      } else {
        toast.error("Erro ao efetuar login!");
        router.push("/");
      }
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setCreating(true);
    storeNewUserFn(values);
  }

  return (
    <>
      <div className="w-full max-w-lg border p-4 rounded-sm">
        <Progress value={(100 / 2) * (step - 1)} className="my-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jhon@doe.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="João José da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="12 99887-6655" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-x-4">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Cep</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12701050"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setCep(e.target.value);
                            }}
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
                          <Input type="tel" placeholder="99" {...field} />
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
                          <Input placeholder="SP" {...field} />
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
                </div>
              </>
            )}

            {step === 3 && <CreatedAccountCard />}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                disabled={step != 2}
                onClick={() => setStep(step - 1)}
                variant={"secondary"}
                className="w-full col-span-1">
                <ArrowLeft className="w-4 mr-2" /> Anterior
              </Button>

              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className={`w-full col-span-1 ${step != 1 && "hidden"}`}>
                Próximo <ArrowRight className="w-4 ml-2" />
              </Button>

              <Button
                hidden={step === 2}
                onClick={form.handleSubmit(onSubmit)}
                disabled={creating}
                type="submit"
                variant={"constructive"}
                className={`w-full col-span-1 ${step === 1 && "hidden"}`}>
                Criar conta <UserPlus className="w-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
