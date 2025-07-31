'use server'

import { prisma } from '@/lib/sample-data/db/prisma'

export async function getAllReviewsAction({
  productId,
}: {
  productId: string
}) {
  const data = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return { data }
}
