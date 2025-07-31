'use server'

import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { getUserBySessionAction } from './getUserBySessionAction'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function updateUserProfileAction(name: string) {
  try {
    // damn why i cant use this logic separately,, weird!!
    // const currentUser = await getUserBySessionAction()
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name },
    })
    return {
      success: true,
      message: 'User name updated successfully',
    }
  } catch (error) {
    return { sucess: false, message: formatError(error) }
  }
}
