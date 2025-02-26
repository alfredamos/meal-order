import { NextAuthConfig } from "next-auth";

export const authConfig ={
  session: {
    strategy: "jwt",
  },
  providers: []
} as NextAuthConfig