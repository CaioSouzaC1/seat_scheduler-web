import { TypewriterEffect } from "../ui/typewriter-effect";

export default function Unauthorized() {
  const words = Array.from({ length: 10 }, (_) => {
    return {
      text: "Redirecionando!",
      className: "text-xs",
    };
  });

  return (
    <div className="w-full text-center flex flex-col justify-center items-center h-screen">
      <p className="text-xl">
        Você <span className="font-bold">precisa estar logado </span> para
        acessar essa página!
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}
