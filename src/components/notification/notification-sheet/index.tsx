import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../ui/button";
import { BellRing } from "lucide-react";
import NotificationCard from "../notification-card";

export default function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="w-12 h-12 rounded-full absolute right-6 bottom-6 px-2 hover:animate-">
          <BellRing className="hover:animate-wiggle" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificações</SheetTitle>
          <SheetDescription>
            Role para baixo para ver mais antigas.
          </SheetDescription>
          <div className="flex flex-col gap-2 w-full">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}