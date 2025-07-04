'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { ShippingAddressType } from '@/types'
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'

export async function updateUserAddressAction(data: ShippingAddressType) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')
    const address = shippingAddressSchema.parse(data)

    const updateUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    })
    return {
      success: true,
      message: 'User address has been updated',
    }
  } catch (error) {
    return { success: false, message: 'We coudnt update address' }
  }
}
