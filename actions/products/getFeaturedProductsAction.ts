'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

export default async function getFeaturedProductsAction() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  })
  return converToPlainObject(data)
}
