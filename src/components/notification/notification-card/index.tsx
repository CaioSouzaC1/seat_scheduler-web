import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NonRead from "../non-read";
import { INotification } from "@/interfaces/Notifications";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationCard({
  notification,
}: {
  notification?: INotification;
}) {
  return (
    <Card className="relative">
      <CardHeader className="px-2 py-4">
        {notification ? (
          <CardTitle className="text-base">{notification.title}</CardTitle>
        ) : (
          <Skeleton className="w-full h-4" />
        )}
      </CardHeader>
      <CardContent className="px-2 py-4">
        {notification ? (
          <p className="text-sm">{notification.message}</p>
        ) : (
          <Skeleton className="w-full h-4" />
        )}
      </CardContent>
      {notification && !notification.read && <NonRead />}
    </Card>
  );
}
