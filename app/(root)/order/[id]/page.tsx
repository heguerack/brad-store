import { getOrderByIdAction } from '@/actions/orders/getOrderByIdAction'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrderDetailsTable from './OrderDetailsTable'
import { ShippingAddressType } from '@/types'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const order = await getOrderByIdAction(id) // but remeber we added extra stuff, so we get order, orderItem, and user. lets spread that!! actually the stuff that we added via auth is included in the type, like when we extended tha. so the issue that we have here is beucase the shipping adesstype has lat nad lgn. so we gatte fixt the retur a bit before we pass it
  // console.log(order)
  console.log('order :', order)

  if (!order) notFound()

  return (
    <div>
      {
        <OrderDetailsTable
          order={{
            ...order,
            shippingAddress: order.shippingAddress as ShippingAddressType,
          }}
          paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'} //sb, identifier for sando account
        />
      }
    </div>
  )
}
