import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile }: any) {
      if (account?.provider === "google") {
        return (
          profile?.email_verified &&
          profile?.email === "ahmet.feyzullah.yildiz@gmail.com"
        );
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
});

export { handler as GET, handler as POST };
