import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">
          <Skeleton className="w-full h-6" />
        </CardTitle>
        <CardDescription className="flex gap-1">
          <span>Cadastrada em: </span>
          <Skeleton className="w-40 h-5" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          <Skeleton className="w-60 h-4" />
        </p>
      </CardFooter>
    </Card>
  );
}
