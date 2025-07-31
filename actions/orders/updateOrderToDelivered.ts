'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function updateOrderToDelivered(orderId: string) {
  try {
    const orderToUpdate = await prisma.order.update({
      where: { id: orderId },
      data: {},
    })
    if (!orderToUpdate)
      throw new Error('Order not found, updateOrderToDeliveredAction')

    if (!orderToUpdate.isPaid)
      throw new Error(
        'Order has not been paid yet, at updateOrderToDeliveredAction'
      )

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    })

    revalidatePath(`/order/${orderId}`)

    return {
      success: true,
      message: 'Order has been marked as delivered',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
