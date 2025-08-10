"use client";

import React from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

export const Header = () => {
  const session = useSession();
  return (
    <nav className="bg-sidebar-accent z-10">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <Link href="/">Main Page</Link>
        {session.status === "unauthenticated" ? (
          <SignIn />
        ) : (
          <>
            <SignOut />
          </>
        )}
      </div>
    </nav>
  );
};
