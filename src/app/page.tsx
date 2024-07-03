"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  async function onSubmit() {
    const result = await signIn("credentials", {
      email: "johndoe@gmail.com",
      password: "123",
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }

  const params = useSearchParams();

  return (
    <div>
      home test <br />
      <Button onClick={onSubmit}>Logar</Button>
      <br />
      {params.has("not-logged") && (
        <>you tried to access a protected page, log in to be able to</>
      )}
    </div>
  );
}
