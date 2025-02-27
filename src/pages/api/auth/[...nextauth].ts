import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error(
    "GITHUB_ID and GITHUB_SECRET must be defined in environment variables"
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: true,
  logger: {
    error: (code, metadata) => {
      console.error("NextAuth Error:", code, metadata);
    },
    warn: (code) => {
      console.warn("NextAuth Warning:", code);
    },
    debug: (code, metadata) => {
      console.log("NextAuth Debug:", code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
