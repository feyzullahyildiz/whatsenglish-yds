import React from "react";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/button";

export const SignOut = () => {
  const session = useSession();
  if (session.status !== "authenticated") {
    return null; // Don't show the button if not authenticated
  }
  return (
    <div className="flex items-center gap-8">
      <span className="ml-4 text-white">
        {session.data?.user?.name
          ? `Hoşgeldin, ${session.data.user.name}`
          : "Welcome!"}
      </span>
      <Link href="/manage">Yönet</Link>
      <Button onClick={() => signOut()}>Log Out</Button>
    </div>
  );
};
