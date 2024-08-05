import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NonRead from "../non-read";

export default function NotificationCard() {
  return (
    <Card className="relative">
      <CardHeader className="px-2 py-4">
        <CardTitle className="text-base">Card Title</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-4">
        <p className="text-sm">Card Content</p>
      </CardContent>
      <NonRead />
    </Card>
  );
}
