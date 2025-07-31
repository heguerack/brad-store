'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllCategoriesAction() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  })
  return data
}
