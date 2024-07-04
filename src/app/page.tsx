"use client";
import LoginForm from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
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
    <div>
      home test <br />
      <LoginForm />
    </div>
  );
}
