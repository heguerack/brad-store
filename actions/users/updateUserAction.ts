'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { updateUserSchema } from '@/zod-schema-validator/updateUserSchema'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function updateUserAction(user: z.infer<typeof updateUserSchema>) {
  try {
    console.log('Data to Update in user:', user)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    })
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
