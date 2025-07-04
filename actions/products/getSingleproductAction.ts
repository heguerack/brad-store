'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getSingleproductAction(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  })
}
