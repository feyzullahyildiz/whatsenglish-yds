"use client";

import { ProgressProvider } from "@bprogress/next/app";

import { NextAuthSessionProvider } from "./SessionProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthSessionProvider>
      <ProgressProvider
        height="2px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </NextAuthSessionProvider>
  );
};
