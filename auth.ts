import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/prisma.db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { User } from "@prisma/client";
import {authConfig} from "./authConfig"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signup",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "alfredamos@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cred = credentials as { email: string; password: string };
        const { email, password } = cred;
        if (!email || !password) return null;
        //----> Check for existence of user.
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw new Error("Invalid credentials!");
        //----> Check for password correctness.
        const isPasswordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        if (!isPasswordMatch) throw new Error("Invalid credentials!");
        //----> Send back the jwt payload.
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const loggedInUser = user as User;

      if (loggedInUser) {
        return {
          ...token,
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          role: loggedInUser.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token) {
        return {
          ...session,
          user: { ...session.user, id: token.id as string, role: token.role },
        };
      }

      return session;
    },
  },
});
