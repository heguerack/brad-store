'use server'

import { auth } from '@/auth'
import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getMyOrdersAction({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number
  page: number
}) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authorized')

    const data = await prisma.order.findMany({
      where: { userId: session?.user?.id! }, // this means is not null , so dont bother
      orderBy: { createdAt: 'desc' },
      take: limit,
      // so the skip , what it does it removes the number of pages times the limit. say we are in page 5, so we will show 6, but remove the fist (5-1)*limit, that way we show the current ones
      skip: (page - 1) * limit,
    })

    const dataCount = await prisma.order.count({
      where: { userId: session?.user?.id! },
    })

    if (!dataCount) throw new Error('NOt orders for dataCOunt')

    const totalPages = Math.ceil(dataCount / limit)

    return {
      data,
      totalPages,
    }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Something went wrong',
    }
  }
}
