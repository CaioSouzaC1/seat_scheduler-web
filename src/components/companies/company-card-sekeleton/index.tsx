import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, MapPin, Trash2 } from "lucide-react";

export default function CompanyCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase line-clamp-1">
          <Skeleton className="w-full h-6" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <div className="flex">
            <span>Cadastrada em: </span>
            <Skeleton className="w-40 h-5" />
          </div>
          <div className="flex">
            <span>Atualizada em: </span>
            <Skeleton className="w-40 h-5" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-4">
        <Skeleton className="w-full rounded aspect-video object-cover" />
        <div className="grid grid-cols-2 gap-2 w-full justify-end">
          <Skeleton className="w-full grid-cols-1 h-8" />

          <div className="flex justify-end gap-2.5">
            <Button disabled className="w-8 h-8" size={"icon"}>
              <MapPin className="w-5" />
            </Button>
            <Button
              disabled
              className="w-8 h-8"
              variant={"destructive"}
              size={"icon"}>
              <Trash2 className="w-5" />
            </Button>
            <Button
              disabled
              className="w-8 h-8"
              size={"icon"}
              variant={"outline"}>
              <Edit className="w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
