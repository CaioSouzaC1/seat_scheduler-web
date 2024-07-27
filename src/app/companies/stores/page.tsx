"use client";

import Layout from "@/_layouts";
import withAuth from "@/components/hoc";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetStores } from "@/hooks/queries/stores/use-get-stores";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import CompanyCardSkeleton from "@/components/companies/company-card-sekeleton";
import NotFoundText from "@/components/not-found/not-found-text";
import { IStore } from "@/interfaces/Store";
import StoreCard from "@/components/stores/store-card";
import NewStoreForm from "@/components/stores/new-store-form";

function StorePage() {
  const { stores } = useGetStores()

  return (
    <Layout>
      <div className="w-full flex justify-between">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/companies">Empresas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lojas</BreadcrumbPage>
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
              <DialogTitle className="mb-4">Cadastrar nova loja</DialogTitle>
              <NewStoreForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {stores ? (
          <>
            {stores.data.data.length != 0 ? (
              stores.data.data.map((e: IStore) => (
                <StoreCard {...e} key={e.id} />
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
  )
}
export default withAuth(StorePage)
