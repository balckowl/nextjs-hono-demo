import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./lib/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
    },
    secret: process.env.AUTH_SECRET
})

