import type { Metadata } from "next";

import { CheckCheck, X as Cross } from "lucide-react";

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
      <body className="dark flex h-dvh flex-col">
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <Toaster
          position="top-right"
          swipeDirections={["left"]}
          visibleToasts={2}
          mobileOffset={{
            top: "8rem",
            right: 0,
          }}
          icons={{
            success: <CheckCheck className="text-green-400" />,
            error: <Cross className="text-red-400" />,
          }}
        />
      </body>
    </html>
  );
}
