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
import { loginFormSchema } from "@/schemas/auth";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result && result.ok) {
      router.push("/dashboard");
      toast.success("Bem vindo!");
    } else {
      toast.error("Erro ao efetuar login!");
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full max-w-lg border p-4 rounded-sm"
        onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button className="px-0 mb-4" variant={"link"}>
          <Link href={"/forgot-password"}>Perdi minha senha</Link>
        </Button>
        <div className="flex flex-col gap-4">
          <Button className="w-full" type="submit">
            Entrar
          </Button>

          <Link href={"/account/create"}>
            <Button className="w-full" variant={"secondary"}>
              Criar conta{" "}
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
