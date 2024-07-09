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
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useGetCompanies } from "@/hooks/queries/companies/use-get-companies";
import { PlusCircle } from "lucide-react";

function CompaniesPage() {
  const { companies } = useGetCompanies();

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Empresas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Sheet>
        <SheetTrigger>
          <Button>
            Cadastrar <PlusCircle className="w-4 ml-2" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cadastrar nova empresa</SheetTitle>
            <NewCompanyForm />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {companies ? (
          <>
            {companies.data.length != 0 ? (
              companies.data.map((e) => <CompanyCard {...e} key={e.id} />)
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
