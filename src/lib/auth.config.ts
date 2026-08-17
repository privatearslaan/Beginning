import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: "CUSTOMER" | "ADMIN" }).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "CUSTOMER" | "ADMIN";
      }
      return session;
    },
    authorized: async ({ auth, request }) => {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isAccountRoute = request.nextUrl.pathname.startsWith("/account");

      if (isAdminRoute) {
        return auth?.user?.role === "ADMIN";
      }
      if (isAccountRoute) {
        return !!auth?.user;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
