import { NextRequest, NextResponse } from "next/server";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/services/api";
import { IUser, IUserLogin } from "@/interfaces/User";

declare module "next-auth" {
  interface Session {
    user: IUser;
    token: string;
  }

  interface User extends IUser {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    token: string;
  }
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await api.post<IUserLogin>("/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { user, token } = response.data.data;

          if (!user || !token) {
            throw new Error(
              "Authentication failed: missing user or token data"
            );
          }

          return { ...user, token };
        } catch (error: any) {
          console.error("Error in authorize function:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            throw new Error(error.response.data.message);
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      if (token.token) {
        session.token = token.token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
