'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getSingleUserByIdAction(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw new Error('User Not found')
  //if user oes not exist or password does not match
  return user
}
