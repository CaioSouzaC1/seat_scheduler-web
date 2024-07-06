import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />
      <main className="container px-4">{children}</main>
      <Footer />
    </>
  );
}