import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import prisma from './lib/prisma'
import bcrypt from 'bcryptjs'

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(6),
                })
                .safeParse(credentials)

                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data

                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase()
                    }
                })

                if (!user) return null

                if (!bcrypt.compareSync(password, user.password)) return null

                const { password: _, ...rest } = user

                return rest
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.data = user
            return token
        },
        session({ session, token }) {

            session.user = token.data as any

            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            console.log({ auth })
            // const isLoggedIn = !!auth?.user
            // const isOnDashboard = nextUrl.pathname.startsWith('')
            // if (isOnDashboard) {
            //     return isLoggedIn
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('', nextUrl))
            // }
            return true
        }
    }
}

export const { signIn, auth, handlers, signOut } = NextAuth(authConfig)