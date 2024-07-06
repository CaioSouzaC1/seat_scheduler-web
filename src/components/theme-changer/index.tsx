import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const LightTheme = () => {
  return (
    <div className="flex gap-2">
      <span className="min-w-14">Claro</span>
      <Sun size={20} />
    </div>
  );
};

const DarkTheme = () => {
  return (
    <div className="flex gap-2">
      <span className="min-w-14">Escuro</span>
      <Moon size={20} />
    </div>
  );
};

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="min-w-36" size="sm" variant={"outline"}>
          {theme === "light" ? <LightTheme /> : <DarkTheme />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 max-w-36">
        <Button
          variant={"outline"}
          disabled={theme === "light"}
          className="w-full"
          onClick={() => setTheme("light")}>
          <LightTheme />
        </Button>
        <Button
          variant={"outline"}
          disabled={theme === "dark"}
          className="w-full"
          onClick={() => setTheme("dark")}>
          <DarkTheme />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
