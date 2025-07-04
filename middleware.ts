// export { default } from 'next-auth/middleware' <== deprecated in v5
// export { auth as middleaware } from '@/auth' // and thisone didnt work the way brad set it up...next is the new try
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
// import { authConfig } from './auth.config'

export const { auth: middleware } = NextAuth(authConfig)
