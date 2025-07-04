'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getOrderByIdAction(orderId: string) {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      // becasue these guys are thir own modl, so this way we can also grab that data in one request! :)
      OrderItems: true,
      user: { select: { name: true, email: true } },
    },
  })
  return converToPlainObject(data)
}
