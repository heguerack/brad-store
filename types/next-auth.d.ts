import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
    } & DefaultSession['user'] // so by adding the dafualt we are saying we want to build on it, nbot to replace the whole object
  }
}
