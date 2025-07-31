'use server'

import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'

// actually i could jut use one component if slu or i lol
export async function getSingleproductByIdAction(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  })
  return converToPlainObject(data)
}
