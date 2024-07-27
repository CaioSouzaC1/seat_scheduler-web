"use client";

import Layout from "@/_layouts";
import CompanyCard from "@/components/companies/company-card";
import CompanyCardSkeleton from "@/components/companies/company-card-sekeleton";
import NewCompanyForm from "@/components/companies/new-company-form";
import withAuth from "@/components/hoc";
import NotFoundText from "@/components/not-found/not-found-text";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetCompanies } from "@/hooks/queries/companies/use-get-companies";
import { ICompany } from "@/interfaces/Companies";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

function CompaniesPage() {
  const { companies } = useGetCompanies();

  return (
    <Layout>
      <div className="w-full flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Empresas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Dialog>
          <DialogTrigger>
            <Button>
              <PlusCircle className="mr-2 w-4" /> <span>Cadastrar</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">Cadastrar nova empresa</DialogTitle>
              <NewCompanyForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {companies ? (
          <>
            {companies.data.data.length != 0 ? (
              companies.data.data.map((e: ICompany) => (
                <CompanyCard {...e} key={e.id} />
              ))
            ) : (
              <NotFoundText entity="empresa" />
            )}
          </>
        ) : (
          <>
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
          </>
        )}
      </div>
    </Layout>
  );
}
export default withAuth(CompaniesPage);
