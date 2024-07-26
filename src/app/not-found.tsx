"use client";
import Layout from "@/_layouts";
import { Button } from "@/components/ui/button";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="w-full p-8 flex justify-center items-center">
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start mx-auto p-4 grid-cols-1 relative max-h-[40rem] h-[calc(100vh-14rem)]">
          <h1 className="text-3xl text-center my-4 mx-auto">
            Página não encontrada
          </h1>
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
          <EvervaultCard text="404" />
          <Link href={"/dashboard"}>
            <Button variant={"link"}>Voltar a dashboard </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
