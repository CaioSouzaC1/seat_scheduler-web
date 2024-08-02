"use client";

import { useGetBooks } from "@/hooks/queries/books/use-get-books"
import withAuth from "@/components/hoc"
import Layout from "@/_layouts";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/pagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, Table } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import BookTableRow from "@/components/books/table-row";
import { IBook } from "@/interfaces/Books";
import Link from "next/link";
import BooksTableRowSkeleton from "@/components/books/table-row-skeleton";



function BookPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  const { books } = useGetBooks({ page: Number(page) })

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
              <Link href="/companies/bookss">Lojas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reservas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="w-full flex items-center justify-between">
            <span>
              Reservas
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Mesa</TableHead>
                <TableHead className="w-24">Dia da reserva</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead>Observação</TableHead>
                <TableHead className="w-32">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books && books.data.meta.total > 100 ? (
                books.data.data.map((book: IBook) =>
                  <BookTableRow key={book.id} {...book} />
                )
              ) : (
                <BooksTableRowSkeleton />
              )}
            </TableBody>
          </Table>

          {books && (
            <Pagination
              pageIndex={Number(page)}
              totalCount={books.data.meta.total}
            />
          )}
        </CardContent>
      </Card>
    </Layout >
  )
}

export default withAuth(BookPage)

