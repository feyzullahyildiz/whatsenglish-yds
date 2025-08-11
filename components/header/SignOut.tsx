import React from "react";

import { signOut, useSession } from "next-auth/react";

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
          ? `Welcome, ${session.data.user.name}`
          : "Welcome!"}
      </span>
      <Button onClick={() => signOut()}>Log Out</Button>
    </div>
  );
};
