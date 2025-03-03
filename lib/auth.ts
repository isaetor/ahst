import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/database";
import { User } from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phoneNumber: { label: "Phone Number" },
      },
      async authorize(credentials) {
        await connectDB();
        if (credentials === null) return null;
        const user = await User.findOne({
          phoneNumber: credentials.phoneNumber,
        });
        if (user) return user;
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/login",
  },
  callbacks: {
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          phoneNumber: session.user.phoneNumber,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    signIn: async ({ account }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
