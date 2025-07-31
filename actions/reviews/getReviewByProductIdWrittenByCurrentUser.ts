'use server'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function getReviewByProductIdWrittenByCurrentUser({
  productId,
}: {
  productId: string
}) {
  const session = await auth()
  if (!session) throw new Error('User is not authenticated')
  return await prisma.review.findFirst({
    where: {
      productId: productId,
      userId: session?.user?.id,
    },
  })
}
