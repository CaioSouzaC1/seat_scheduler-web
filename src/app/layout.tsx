"use client";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { StoreProvider } from "@/context/StoreContext/Index";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { WebSocketProvider } from "@/context/WebSocketContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html suppressHydrationWarning={true} lang="pt-BR">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <ProgressBar
          height="4px"
          color="#0ea5e9"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster duration={2400} position="top-center" />
        <WebSocketProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProvider refetchInterval={10 * 60}>
              <ThemeProvider attribute="class">
                <StoreProvider>{children}</StoreProvider>
              </ThemeProvider>
            </SessionProvider>
          </QueryClientProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}
