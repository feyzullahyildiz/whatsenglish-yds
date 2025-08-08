import { useSession } from "next-auth/react";

export const useUser = () => {
  const session = useSession();
  if (session.status === "authenticated") {
    return session.data.user;
  }
  return null;
};
