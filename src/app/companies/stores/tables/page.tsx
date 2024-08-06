"use client";
import Layout from "@/_layouts";
import withAuth from "@/components/hoc";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/context/StoreContext/Index";
import { useGetTables } from "@/hooks/queries/tables/use-get-tables";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ITable } from "@/interfaces/Tables";
import { Pagination } from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import TablesTableRow from "@/components/tables/table-row";
import TablesTableRowSkeleton from "@/components/tables/table-row-skeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import NewTableDialog from "@/components/tables/new-table-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTablesInBulkSchema } from "@/schemas/tables";
import { Form } from "@/components/ui/form";
import DeleteTablesInBulkDrawer from "@/components/tables/delete-tables-in-bulk-drawer";

function TablesPage() {
  const form = useForm<z.infer<typeof deleteTablesInBulkSchema>>({
    resolver: zodResolver(deleteTablesInBulkSchema),
    defaultValues: {
      tables: [],
    },
  });

  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const { store } = useStore();

  const { tables } = useGetTables({ storeId: store?.id!, page: Number(page) });

  const tablesToDelete = form.watch("tables");

  async function onSubmit() {}

  return (
    <Layout>
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
            <BreadcrumbLink asChild>
              <Link href="/companies/stores">Lojas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mesas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="w-full flex items-center justify-between">
            <span className="flex gap-2">
              <span> Mesas de </span>{" "}
              {!store ? <Skeleton className="w-20 h-4" /> : store.name}
            </span>
            <div className="flex gap-4">
              <NewTableDialog />
              <DeleteTablesInBulkDrawer form={form} tables={tablesToDelete} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="w-16">Nº</TableHead>
                    <TableHead className="w-24">Cadeiras</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead>Observação</TableHead>
                    <TableHead className="w-32">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables
                    ? tables.data.meta.total > 0 &&
                      tables.data.data.map((table: ITable) => (
                        <TablesTableRow
                          form={form}
                          key={table.id}
                          table={table}
                        />
                      ))
                    : Array.from({ length: 20 }).map((_, e) => (
                        <TablesTableRowSkeleton key={e} />
                      ))}
                </TableBody>
              </Table>
            </form>
          </Form>

          {tables && (
            <Pagination
              pageIndex={Number(page)}
              totalCount={tables.data.meta.total}
            />
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default withAuth(TablesPage);
