import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./prismaDB";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Jhondoe" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "Jhon Doe" },
      },

      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email or password");
        }

        // check to see if user already exist
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if user was not found
        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        // check to see if passwords match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        // //console.log(passwordMatch);

        if (!passwordMatch) {
          //console.log("test", passwordMatch);
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      // First time login: add user data to token
      if (user) {
        const userInDB = await prisma.user.findUnique({
          where: { email: user.email! },
        });
  
        token.id = user.id;
        token.isPremium = userInDB?.isPremium;
        token.isAdmin = userInDB?.isAdmin; 
      }
  
      return token;
    },
  
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.isPremium = token.isPremium as boolean;
        session.user.isAdmin = token.isAdmin as boolean;
      }
  
      return session;
    },

    redirect: async ({ url, baseUrl }) => {
      // If the URL is relative, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is absolute but on the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise, redirect to the home page
      return baseUrl;
    },
  },

  // debug: process.env.NODE_ENV === "developement",
};
