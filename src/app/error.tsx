"use client";
import Layout from "@/_layouts";
import { Meteors } from "@/components/ui/meteor";

export default function ErrorPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-9rem)] w-full flex justify-center items-center relative overflow-hidden">
        <Meteors number={40} />
        <p className="absolute inset-0 flex justify-center items-center text-9xl lg:text-[13rem] text-white opacity-10 font-black uppercase">
          500
        </p>
        <p className="absolute inset-0 flex justify-center items-center font-bold">
          Ocorreu um erro inesperado
        </p>
      </div>
    </Layout>
  );
}
