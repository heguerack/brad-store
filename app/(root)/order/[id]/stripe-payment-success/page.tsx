import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function stripePaymentSuccessPage(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}) {
  const { id } = await props.params
  const { payment_intent: paymentIntentId } = await props.searchParams

  //Fetch order
  const order = await getOrderByIdAction(id)
  if (!order) notFound()

  // Retrieve paymentIntent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check if paymentIntent is valid
  // remember we added orderId in metadata in [id]/page.tsx; to the paymentIntent
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound()
  }

  // Check if payment is successfull
  const isSuccess = paymentIntent.status === 'succeeded'
  if (!isSuccess) return redirect(`/order/${id}`)

  return (
    <div className='max-w-4xl w-full mx-auto space-y-8'>
      <div className='flex felx-col gap-6 items-center'>
        <h1 className='h1-bold'>Thanks for your purchase</h1>
        <div className=''>We are processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}
