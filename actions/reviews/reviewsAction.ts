'use server'

import { auth } from '@/auth'
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { insertReviewSChema } from '@/zod-schema-validator/reviewsSchema'
import { revalidatePath } from 'next/cache'
import z from 'zod'

// CREATE AND UPDATER REVIEW
export async function reviewsAction(data: z.infer<typeof insertReviewSChema>) {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    //validate and store the review (put in in variable)
    const review = insertReviewSChema.parse({
      ...data,
      userId: session.user.id,
    })

    // get product thats being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    })
    if (!product) throw new Error('Product not found')

    //check if user reviewd that product already
    const reviewExists = await prisma.review.findFirst({
      where: { productId: review.productId, userId: review.userId },
    })

    //transaction ==> remember how tbis works Frank?? rememeber that if one thing fails then the whole thing fails
    //
    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        //update review
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        })
        revalidatePath('/product/slug')
      } else {
        //create review
        await tx.review.create({
          data: review,
        })
      }
      // weather it was updated or created, get the avg rating
      const averageRating = await tx.review.aggregate({
        //remember we did somthing similar but it was sum, now avg
        _avg: { rating: true },
        where: { productId: review.productId },
      })
      // get number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      })
      //update the rating and numEviews in product table
      await tx.product.update({
        where: {
          id: review.productId,
        },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      })
    })
    return {
      success: true,
      message: 'Product has been successfully rated!!',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
