import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "../ui/button";
import Link from "next/link";

export const SignOut = () => {
  const session = useSession();
  if (session.status !== "authenticated") {
    return null; // Don't show the button if not authenticated
  }
  return (
    <div className="flex items-center gap-8">
      <span className="text-white ml-4">
        {session.data?.user?.name
          ? `Hoşgeldin, ${session.data.user.name}`
          : "Welcome!"}
      </span>
      <Link href="/manage">Yönet</Link>
      <Button onClick={() => signOut()}>Log Out</Button>
    </div>
  );
};
