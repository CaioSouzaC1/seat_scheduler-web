"use client";
import Layout from "@/_layouts";
import AddressTable from "@/components/adresses/address-table";
import withAuth from "@/components/hoc";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserTable from "@/components/user/user-table";
import { useSession } from "next-auth/react";

function MyAccountPage() {
  const { data: session } = useSession();

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Minha conta</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex gap-4 justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button size={"sm"}>ID</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{session?.user.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{session?.user.name}</span>
            </div>

            <Badge className="text-center">
              {session?.user.loginCount} logins.
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6 flex-wrap">
          <Card className="max-w-full">
            <CardHeader>
              <CardTitle>Dados cadastrais</CardTitle>
            </CardHeader>
            <CardContent>
              <UserTable {...session?.user!} />
            </CardContent>
          </Card>

          <Card className="max-w-full">
            <CardHeader>
              <CardTitle>Detalhamento do endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <AddressTable {...session?.user.address!} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default withAuth(MyAccountPage);
