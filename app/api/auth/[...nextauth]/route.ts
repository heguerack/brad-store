// import NextAuth from 'next-auth'
//we kind of fdid this in a separate file, so we will just import that logic hre
// const handler = NextAuth({
//   ...
// })
// export { handler as GET, handler as POST }
import { handlers } from '@/auth'

export const { GET, POST } = handlers
