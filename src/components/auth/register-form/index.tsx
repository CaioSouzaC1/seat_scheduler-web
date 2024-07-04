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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";

const formSchema = z.object({
  email: z.string().email({
    message: "Este campo precisa ser um email.",
  }),
  password: z.string().min(2, {
    message: "A senha precisa ter pelo menos 6 caracteres",
  }),
  name: z.string(),
  phone: z.string(),
});

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    // const result = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    // if (result && result.ok) {
    //   router.push("/dashboard");
    //   toast.success("Bem vindo!");
    // } else {
    //   toast.error("Erro ao efetuar login!");
    //   router.push("/");
    // }
  }

  return (
    <>
      <div className="w-full max-w-lg border p-4 rounded-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="grid grid-cols-2 gap-4">
          <Button
            disabled={step === 1}
            variant={"secondary"}
            className="w-full col-span-1">
            <ArrowLeft className="w-4 mr-2" /> Anterior
          </Button>
          <Button className="w-full col-span-1">
            Próximo <ArrowRight className="w-4 ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}
