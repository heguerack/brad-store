import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { updateOrderToPaid } from '@/actions/orders/updateOrderToPaidAction'
import { sendPurchaseReceipt } from '@/email'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { PaymentResultType, ShippingAddressType } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const event = await Stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent

      await updateOrderToPaid({
        orderId: intent.metadata.orderId,
        paymentResult: {
          id: intent.id,
          status: 'COMPLETED',
          email_address: intent.receipt_email || '',
          pricePaid: (intent.amount / 100).toFixed(2),
        },
      })

      const order = await getOrderByIdAction(intent.metadata.orderId)

      if (order?.user?.email) {
        console.log('📨 Sending receipt to:', order.user.email)

        await sendPurchaseReceipt({
          order: {
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddressType,
            paymentResult: order.paymentResult as PaymentResultType,
          },
        })
      } else {
        console.warn('⚠️ Cannot send receipt, missing email or user')
      }

      return NextResponse.json({
        message: 'UpdateOrderToPaid + optional email was successful',
      })
    }

    return NextResponse.json({
      message: 'Unhandled event type',
    })
  } catch (err) {
    console.error('❌ Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
