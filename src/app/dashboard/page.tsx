"use client";
import withAuth from "@/components/hoc";
import { ThemeChanger } from "@/components/theme-changer";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/_layouts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetDashboardCards } from "@/hooks/queries/dashboard/use-get-dashboard-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardRecentBookings } from "@/hooks/queries/dashboard/use-get-dashboard-recent-bookings";
import { IRecentBooking } from "@/interfaces/Dashboard";
import { useGetCompanies } from "@/hooks/queries/companies/use-get-companies";
import { ICompany } from "@/interfaces/Companies";
import Image from "next/image";
import AddressDialog from "@/components/adresses/address-dialog";

function DashboardPage() {
  const { dashboardCards } = useGetDashboardCards();
  const { dashboardRecentBookings } = useGetDashboardRecentBookings();
  const { companies } = useGetCompanies();

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de lojas
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardCards ? (
                      dashboardCards.data.totalStores
                    ) : (
                      <Skeleton className="w-full" />
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de mesas
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardCards ? (
                      dashboardCards.data.totalTables
                    ) : (
                      <Skeleton className="w-full" />
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de reservas
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardCards ? (
                      dashboardCards.data.totalBookings
                    ) : (
                      <Skeleton className="w-full" />
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contagem de login
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardCards ? (
                      dashboardCards.data.loginCount
                    ) : (
                      <Skeleton className="w-full" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Empresas</CardTitle>
                    <CardDescription>
                      Lista de empresas vinculadas a sua conta.
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/companies">
                      Ver todas
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Logo</TableHead>
                        <TableHead>Nome e CNPJ</TableHead>
                        <TableHead className="text-right">Endeço</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies
                        ? companies.data.data.map((company: ICompany) => (
                            <TableRow key={company.id}>
                              <TableCell>
                                <Image
                                  width={64}
                                  height={64}
                                  className="rounded-full min-h-16 min-w-16 object-cover"
                                  src={company.attachement[0].imagePath}
                                  alt="Logo da empresa"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">
                                  {company.name}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {company.cnpj}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <AddressDialog {...company.address} />
                              </TableCell>
                            </TableRow>
                          ))
                        : Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-20" />
                          ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Reservas recentes</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  {dashboardRecentBookings
                    ? dashboardRecentBookings.data.data.map(
                        (booking: IRecentBooking) => (
                          <div
                            key={booking.id}
                            className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarFallback>
                                {booking.user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <p className="text-sm font-medium leading-none">
                                {booking.user.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.user.email}
                              </p>
                            </div>
                            <div className="ml-auto">
                              <span className="text-sm">
                                Último login: {booking.user.lastLogin}
                              </span>
                            </div>
                          </div>
                        )
                      )
                    : Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-20" />
                      ))}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(DashboardPage);
