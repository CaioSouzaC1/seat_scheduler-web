import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Armchair, CircleUser, Menu } from "lucide-react";
import { ThemeChanger } from "../theme-changer";
import { signOut } from "next-auth/react";

export default function Header() {
  const navItems = [
    {
      text: "Dashboard",
      url: "/dashboard",
    },
    {
      text: "Empresas",
      url: "/companies",
    },
    {
      text: "Empresas",
      url: "/companies",
    },
    {
      text: "Empresas",
      url: "/companies",
    },
    {
      text: "Empresas",
      url: "/companies",
    },
  ];

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Armchair className="h-6 w-6" />
          <span className="sr-only">Seat Scheduler</span>
        </div>
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.url}
            className="text-foreground transition-colors hover:text-foreground">
            {item.text}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <Armchair className="h-6 w-6" />
              <span className="sr-only">Seat Scheduler</span>
            </div>
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="text-foreground transition-colors hover:text-foreground">
                {item.text}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <ThemeChanger />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/settings"}>Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/support"}>Suporte</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}>
              <button>Sair</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
