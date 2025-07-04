import { Metadata } from 'next'
import CartTable from './CartTable'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'

export const metadata: Metadata = {
  title: `Shopping Cart`,
  description: 'A modern ecommerce store built with next js',
}

export default async function cartPage() {
  const cart = await getMyCartAction()

  return (
    <div>
      <CartTable cart={cart} />
    </div>
  )
}
