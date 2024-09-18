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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useGetMenuItems } from "@/hooks/queries/menu-item/use-get-menu-items";
import { IMenuItem } from "@/interfaces/MenuItem";
import MenuItemsTableRow from "@/components/menu-items/table-row";
import { deleteMenuItemsInBulkSchema } from "@/schemas/menu-items";
import MenuItemTableRowSkeleton from "@/components/menu-items/table-row-skeleton";
import NewMenuItemDialog from "@/components/menu-items/new-menu-item-dialog";
import DeleteMenuItemsInBulkDrawer from "@/components/menu-items/delete-menu-items-in-bulk-drawer";

function MenuItemsPage() {
  const form = useForm<z.infer<typeof deleteMenuItemsInBulkSchema>>({
    resolver: zodResolver(deleteMenuItemsInBulkSchema),
    defaultValues: {
      menuItems: [],
    },
  });

  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const { store } = useStore();

  const { menuItems } = useGetMenuItems({
    storeId: store?.id!,
    page: Number(page),
  });

  const menuItemsToDelete = form.watch("menuItems");

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
            <BreadcrumbPage>Items</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="w-full flex items-center justify-between">
            <span className="flex gap-2">
              <span> Items de </span>{" "}
              {!store ? <Skeleton className="w-20 h-4" /> : store.name}
            </span>
            <div className="flex gap-4">
              <NewMenuItemDialog />
              <DeleteMenuItemsInBulkDrawer
                form={form}
                menuItems={menuItemsToDelete}
              />
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
                    <TableHead className="w-24">Preço</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems
                    ? menuItems.data.meta.total > 0 &&
                      menuItems.data.data.map((menuItem: IMenuItem) => (
                        <MenuItemsTableRow
                          form={form}
                          key={menuItem.id}
                          menuItem={menuItem}
                        />
                      ))
                    : Array.from({ length: 20 }).map((_, e) => (
                        <MenuItemTableRowSkeleton key={e} />
                      ))}
                </TableBody>
              </Table>
            </form>
          </Form>

          {menuItems && (
            <Pagination
              pageIndex={Number(page)}
              totalCount={menuItems.data.meta.total}
            />
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}

export default withAuth(MenuItemsPage);
