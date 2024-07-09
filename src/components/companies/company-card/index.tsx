import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICompany } from "@/interfaces/Companies";
import { formatDate } from "@/lib/utils";

export default function CompanyCard(company: ICompany) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">{company.name}</CardTitle>
        <CardDescription>
          Cadastrada em: {formatDate(company.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{company.id}</p>
      </CardFooter>
    </Card>
  );
}
