import NextAuth from 'next-auth'
import { prisma } from './lib/sample-data/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'
import { authConfig } from './auth.config'
import { cookies } from 'next/headers'
import { getUserByCredentialsAction } from './actions/users/getUserByCredentialsAction'

type Credentials = {
  email?: string
  password?: string
}

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt' as const, // i added the as const when fiixng or adding the auth.config
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },

      //credentials here is really the data/credentailas coming from database
      async authorize(credentials, req) {
        if (credentials == null) return null
        const user = getUserByCredentialsAction(
          credentials.email as string,
          credentials.password as string
        )
        return user
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token id
      // console.log(token)
      session.user.id = token.sub
      // console.log(token)
      //we do this after we have set the role in the token via jwt
      session.user.role = token.role
      session.user.name = token.name
      // console.log(token)
      //if there is an update, set the user name, we do this one becasue users will be able to update their profile

      if (trigger === 'update') {
        session.user.name = user.name
      }

      return session
    },
    // But if you want to modify the token
    // to customize your token we gotta use jwt
    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.id = user.id
        token.role = user.role
        //if user has no name then use email, sey they used ghoogle to sign in.
        if (user.name === 'NO_NAME') {
          //same
          token.name = user.email!.split('@')[0]
          // update database to reflec the token name, so basically if the person signedup with a social credential, then it has no name, no"NO_NAME"  will be created as a naem. the idea is that as soon as that happens, we fired but updating the name with the fisrt part of the enail
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }
        // new new new  new
        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies()
          const sessionCartId = cookiesObject.get('sessionCartId')?.value

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            })
            if (sessionCart) {
              //delete current userCart
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              })
              //assign new cart
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: {
                  userId: user.id,
                },
              })
            }
          }
        }
        // new new new  new
      }
      //handle session updates
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
