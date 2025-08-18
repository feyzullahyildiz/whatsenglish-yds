import type { Metadata } from "next";

import { NextAuthSessionProvider } from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsEnglish YDS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"dark flex flex-col"}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <Toaster  position="top-right" />
      </body>
    </html>
  );
}
