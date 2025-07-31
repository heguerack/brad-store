'use client'

import { ReviewType } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import { getAllReviewsAction } from '@/actions/reviews/getAllReviewsAction'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, User, UserIcon } from 'lucide-react'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import Rating from '@/components/shared/product/Rating'

export default function ReviewList({
  userId,
  productId,
  productSlug,
}: {
  userId: string
  productId: string
  productSlug: string
}) {
  // console.log(userId, productId, productSlug)
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getAllReviewsAction({ productId })
      setReviews(res.data)
    }
    loadReviews()
  }, [productId])

  //reload the reviews fater created or updated
  const reload = async () => {
    const res = await getAllReviewsAction({ productId })
    setReviews([...res.data])
  }

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div> No Reviews Yet</div>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please{' '}
          <Link
            //remember the callback Url is built in next js, we have to do things like this manually if using express
            href={`/sign-in?callbackUrl=product/${productSlug}`}
            className='text-blue-700 px-2 href'>
            Sign In
          </Link>
          to write a review
        </div>
      )}
      <div className='flex flex-col gap-3'>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className='flex-between'>
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-4 text-sm text-muted-underground'>
                {/* Rating  */}
                <Rating value={review.rating} />
                <div className='flex items-center'>
                  <UserIcon className='mr-1 h-3 w-3' />
                  {/* keep in mind that if we delete the user then the review wont be there as it will be deleted, but just in case */}
                  {review.user ? review.user.name : 'Deleted User or User lol'}
                </div>
                <div className='flex items-center'>
                  <Calendar className='mr-1 h-3 w-3' />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
