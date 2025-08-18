import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrderDetailsTable from './OrderDetailsTable'
import { PaymentResultType, ShippingAddressType } from '@/types'
import { auth } from '@/auth'
import Stripe from 'stripe'
import { updateOrderToPaid } from '@/actions/orders/updateOrderToPaidAction'
import ForcePaymentButton from './ForcePaymentButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id) // but remeber we added extra stuff, so we get order, orderItem, and user. lets spread that!! actually the stuff that we added via auth is included in the type, like when we extended tha. so the issue that we have here is beucase the shipping adesstype has lat nad lgn. so we gatte fixt the retur a bit before we pass it
  // console.log(order)
  // console.log('order :', order)

  if (!order) notFound()

  const session = await auth()

  let client_secret = null

  //check if is not paid and using stripe
  if (order.paymentMethod === 'Stripe' && !order.isPaid) {
    //init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    //Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: 'USD',
      metadata: { orderId: order.id },
    })
    client_secret = paymentIntent.client_secret
  }

  return (
    <div>
      <div className=''>
        <Link
          href={'/user/orders'}
          // The keyframes + animation bits go inside the tailwind.config.js  That way Tailwind knows about the new utilities (animate-breathe) and generates them.
          className='bg-green-700 p-2 rounded-sm font-semibold text-white animate-pulse duration-6000 ease-in-out'>
          See all orders
        </Link>
      </div>
      {
        <OrderDetailsTable
          order={{
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddressType,
            paymentResult: order.paymentResult as PaymentResultType,
          }}
          stripeClientSecret={client_secret}
          paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} //sb, identifier for sando account
          isAdmin={session?.user?.role === 'admin'}
          // the fist one was brought by Brad, but is too muc redundant, same with the second one iprepared.  so the above version is the cleanesst and more clear in my opnion
          // isAdmin={session?.user?.role === 'admin' || false} // what this is saying if adminf hen tr otherwise false
          // isAdmin={session?.user?.role === 'admin' ? true : false}
        />
      }
      {/* <ForcePaymentButton orderId={order.id} email={order.user.email} /> */}
    </div>
  )
}
