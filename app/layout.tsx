import type { Metadata } from "next";

import { NextAuthSessionProvider } from "@/components/SessionProvider";
import { Header } from "@/components/header/Header";

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
        <NextAuthSessionProvider>
          <Header />
          <div className="bg- flex flex-col p-4">{children}</div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
