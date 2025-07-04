'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { LATEST_PRODUCTS_LIMIT } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
// import { PrismaClient } from '@/lib/generated/prisma'

// get latest products
export async function getLatestProductsAction() {
  // const prisma = new PrismaClient()

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  })
  // console.log(data)
  // console.log(converToPlainObject(data))

  return converToPlainObject(data)
}
