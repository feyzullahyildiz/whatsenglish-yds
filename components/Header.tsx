import React from "react";

import { signIn } from "next-auth/react";

export const Header = () => {
  return (
    <div className="z-10 flex h-16 justify-between bg-stone-600 p-4">
      <span>Header</span>
      <button onClick={() => signIn("google")}>LOGIN</button>
    </div>
  );
};
