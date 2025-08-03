import { updateOrderToPaid } from '@/actions/orders/updateOrderToPaidAction'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  )

  //check fro successfull payment
  if (event.type === 'charge.succeeded') {
    const { object } = event.data

    //update order status
    //the object is like the payment intent we created in ordeer/[id]/page.tsx where we injected metadata and stuff
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: 'COMPLETED',
        email_address: object.billing_details.email!,
        pricePaid: (object.amount * 100).toFixed(),
      },
    })
    return NextResponse.json({
      message: 'UpdateOrderToPaid was successful',
    })
  }
  return NextResponse.json({
    message: 'UpdateOrderToPaid is NOT cahrge.succeeded',
  })
}

// import { updateOrderToPaid } from '@/actions/orders/updateOrderToPaidAction'
// import { NextRequest, NextResponse } from 'next/server'
// import Stripe from 'stripe'

// export async function POST(req: NextRequest) {
//   const event = await Stripe.webhooks.constructEvent(
//     await req.text(),
//     req.headers.get('stripe-signature') as string,
//     process.env.STRIPE_WEBHOOK_SECRET as string
//   )

//   if (event.type === 'payment_intent.succeeded') {
//     const intent = event.data.object as Stripe.PaymentIntent

//     await updateOrderToPaid({
//       orderId: intent.metadata.orderId,
//       paymentResult: {
//         id: intent.id,
//         status: 'COMPLETED',
//         email_address: intent.receipt_email || '',
//         pricePaid: (intent.amount / 100).toFixed(2),
//       },
//     })

//     return NextResponse.json({
//       message: 'UpdateOrderToPaid was successful',
//     })
//   }

//   return NextResponse.json({
//     message: 'Unhandled event type',
//   })
// }
