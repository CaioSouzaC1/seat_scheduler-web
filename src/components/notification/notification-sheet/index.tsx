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
import { useGetNotifications } from "@/hooks/queries/notifications/use-get-notifications";
import { INotification } from "@/interfaces/Notifications";

export default function NotificationSheet() {
  const { notifications } = useGetNotifications();

  console.log(notifications);

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="w-12 h-12 rounded-full fixed right-6 bottom-6 px-2 hover:animate-wiggle">
          <BellRing />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificações</SheetTitle>
          <SheetDescription>
            Role para baixo para ver mais antigas.
          </SheetDescription>
          <div className="flex flex-col gap-2 w-full overflow-y-auto max-h-[85vh] pr-2 pt-2">
            {notifications
              ? notifications.data.data.map((e: INotification) => (
                  <NotificationCard key={e.id} notification={e} />
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <NotificationCard key={i} />
                ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
