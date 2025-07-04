import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'
// import ShippingAddressForm from './ShippingAddressForm'
import { ShippingAddressType } from '@/types'
import { ShippingAddressForm } from './ShippingAddressForm'
import CheckoutSteps from '@/components/shared/CheckoutSteps'

export const metadata: Metadata = {
  title: `Shipping Address`,
}

export default async function shippingAddressPage() {
  const cart = await getMyCartAction()
  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  if (!session) redirect('/sign-in')

  const userId = session?.user?.id
  if (!userId) throw new Error('Not user Id')

  const user = await getSingleUserByIdAction(userId)

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddressType} />
    </>
  )
}
