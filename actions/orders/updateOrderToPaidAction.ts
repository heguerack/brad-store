'use server'

import { prisma } from '@/lib/sample-data/db/prisma'
import { OrderItemType, PaymentResultType } from '@/types'

export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string
  paymentResult?: PaymentResultType
}) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItems: true,
    },
  })
  if (!order) throw new Error('order not found')
  if (order.isPaid) throw new Error('Order has been paid  for already') // as we dont want to pay twice

  //transasction; it will not only udate the order, but also the stock
  await prisma.$transaction(async (tx) => {
    //iterate over products and update stock
    for (const item of order.OrderItems as OrderItemType[]) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { increment: -item.qty }, //this is how we incease or decreate quantities in prisma
        },
      })
    }

    // set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult: paymentResult,
      },
    })
  })
}
