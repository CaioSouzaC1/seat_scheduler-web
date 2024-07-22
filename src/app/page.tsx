"use client";
import LoginForm from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const params = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      if (params.has("not-logged")) {
        toast.error(
          "Você tentou acessar uma página protegida, faça login e tente novamente!"
        );
      }
      return;
    }

    toast.info("Você está logado, redirecionando para a dashboard");
    router.push("/dashboard");
  }, [params, router]);

  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Coloque seu email abaixo para entrar na sua conta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
