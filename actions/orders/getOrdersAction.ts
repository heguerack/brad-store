'use server'

import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

export async function getOrdersAction({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number
  page: number
  query: string
}) {
  try {
    const session = await auth()
    if (!session) throw new Error('Auauthorized from get order session')

    const queryFilter: Prisma.OrderWhereInput =
      query && query !== 'all'
        ? {
            user: {
              name: {
                contains: query,
                mode: 'insensitive',
              } as Prisma.StringFilter,
            },
          }
        : {}

    const orders = await prisma.order.findMany({
      where: {
        ...queryFilter,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })
    const ordersCount = await prisma.order.count()

    return {
      data: orders,
      totalPages: Math.ceil(ordersCount),
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
