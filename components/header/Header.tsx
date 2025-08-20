"use client";

import React from "react";

import { useSession } from "next-auth/react";

import { NavLink } from "../ui/NavLink";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

export const Header = () => {
  const session = useSession();
  return (
    <nav className="bg-sidebar-accent z-10">
      <div className="container mx-auto flex min-h-16 items-center justify-between px-4 md:px-0">
        <div className="flex gap-4">
          <NavLink
            className="underline-offset-2"
            activeClassName="underline"
            exact
            href="/"
          >
            Main Page
          </NavLink>
          <NavLink
            className="underline-offset-2"
            activeClassName="underline"
            href="/study"
          >
            Study
          </NavLink>
        </div>
        {session.status === "unauthenticated" ? <SignIn /> : <SignOut />}
      </div>
    </nav>
  );
};
