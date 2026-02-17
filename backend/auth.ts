import NextAuth from "next-auth"
import { authConfig } from "@frontend/auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"



import { db } from "@backend/lib/db"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    trustHost: true,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                // @ts-expect-error role is not fully typed in session yet
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await db.user.findUnique({
                where: { id: token.sub }
            });

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await db.user.findUnique({ where: { email } });
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }
                return null;
            },
        }),
    ],
})
