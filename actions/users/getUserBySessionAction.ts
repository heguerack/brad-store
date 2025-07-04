'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getUserBySessionAction() {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')
    return currentUser
  } catch (error) {
    return {
      success: false,
      message: '"User Not found',
    }
  }
}
