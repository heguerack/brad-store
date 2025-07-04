'use server'

import { paymentMethodSchema } from '@/zod-schema-validator/paymentMethodSchema'

import { z } from 'zod'

import { prisma } from '@/lib/sample-data/db/prisma'
import { auth } from '@/auth'

export async function updateUserPaymentMethodAction(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    // const currentUser = await getUserBySessionAction()
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')

    const paymentMethod = paymentMethodSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser?.id },
      data: { paymentMethod: paymentMethod.type },
    })
    return {
      success: true,
      message: 'User Updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Invalid email or password',
    }
  }
}
