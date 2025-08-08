"use client";

import React from "react";

import { useSession } from "next-auth/react";

import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import Link from "next/link";

export const Header = () => {
  const session = useSession();
  return (
    <div className="z-10 flex h-16 justify-between bg-stone-600 p-4">
      <Link href="/">Ana Sayfa</Link>
      {session.status === "unauthenticated" ? (
        <SignIn />
      ) : (
        <>
          <SignOut />
        </>
      )}
    </div>
  );
};
