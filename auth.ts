import NextAuth, { Account } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
       async linkAccount({ user }) {
        await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
        })
       }
    },
    basePath: '/api/auth',
    callbacks: {
        async session({ token, session }) {
        if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }
            
            return session;
        },
        async jwt({ token, user, account }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});