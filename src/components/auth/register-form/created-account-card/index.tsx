import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
export default function CreatedAccountCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conta criada com sucesso 🎉</CardTitle>
        <CardDescription>
          Parabéns! Agora faremos o login automaticamente.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        <p>Você está sendo redirecionado...</p>
      </CardContent>
    </Card>
  );
}
