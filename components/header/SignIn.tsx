import React from "react";

import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

export const SignIn = () => {
  return <Button onClick={() => signIn("google")}>Log In</Button>;
};
