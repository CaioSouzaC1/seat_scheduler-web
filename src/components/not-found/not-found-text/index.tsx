import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function NotFoundText({ entity = "", feminine = true }) {
  const words = [
    {
      text: "Não",
      className: "text-xs sm:text-base",
    },
    {
      text: "conseguimos",
      className: "text-xs sm:text-base",
    },
    {
      text: "encontrar",
      className: "text-xs sm:text-base",
    },
    {
      text: feminine ? "nenhuma" : "nenhum",
      className: "text-xs sm:text-base",
    },
    {
      text: entity,
      className: "text-muted-foreground text-xs sm:text-base",
    },
  ];

  return (
    <div className="w-full text-center col-span-full flex-col flex justify-center items-center">
      <p className="text-xl sm:text-2xl sm:-mb-4">👀</p>
      <TypewriterEffect words={words} />
    </div>
  );
}
