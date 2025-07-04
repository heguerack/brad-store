'use server'

import { prisma } from '@/lib/sample-data/db/prisma'
import { compareSync } from 'bcrypt-ts-edge'

export async function getUserByCredentialsAction(
  email: string,
  password: string
) {
  const user = await prisma.user.findFirst({
    where: { email },
  })

  // Check if user exists
  if (user && user.password) {
    //remember here we are comparing raw password with hasshed password
    const isMatch = compareSync(password as string, user.password)

    //check if password is correct, return user
    if (isMatch) {
      console.log(user)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }
  }
  //if user oes not exist or password does not match
  return null
}
