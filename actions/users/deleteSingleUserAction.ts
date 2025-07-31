'use server'
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteSingleUserAction(id: string) {
  try {
    const userExits = await prisma.user.findFirst({
      where: { id },
    })
    if (!userExits) throw new Error('User to delete does not exist')

    const userDeleted = await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
