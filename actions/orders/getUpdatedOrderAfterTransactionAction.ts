'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getUpdatedOrderAfterTransactionAction(
  orderId: string,
  data: { paypalOrderId: string }
) {
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      OrderItems: true,
      user: {
        // we dont wann select the whole user object, as you know iot return a=everything including the hashed password
        select: { name: true, email: true },
      },
    },
  })
  if (!updatedOrder) throw new Error('Updated order not found')
}
