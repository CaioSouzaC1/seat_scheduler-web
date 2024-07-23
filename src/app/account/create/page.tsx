"use client";
import Layout from "@/_layouts";
import RegisterForm from "@/components/auth/register-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AccountCreatePage() {
  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cadastrar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8 items-center justify-center">
        <p className="font-medium text-xl">
          Organize e otimize a gestão de mesas da sua empresa com facilidade!
        </p>
        <RegisterForm />
      </div>
    </Layout>
  );
}
