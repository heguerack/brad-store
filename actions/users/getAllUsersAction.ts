'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

export async function getAllUsersAction({
  page,
  limit = PAGE_SIZE,
  query,
}: {
  limit?: number
  page: number
  query: string
}) {
  // const queryFilter: Prisma.OrderWhereInput =
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          // user: {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
          // },
        }
      : {}
  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  })
  const dataCount = await prisma.user.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
