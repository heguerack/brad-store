import { Metadata } from 'next'
import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { redirect } from 'next/navigation'
import CheckoutSteps from '@/components/shared/CheckoutSteps'
import { getUserBySessionAction } from '@/actions/users/getUserBySessionAction'

import PaymentForm from './PaymentForm'
import { updateUserPaymentMethodAction } from '@/actions/users/updateUserPaymentMethod'
import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { getSingleUserByIdAction } from '@/actions/users/getSingleUserById'

export const metadata: Metadata = {
  title: `Select Payment Method`,
}

export default async function paymentMethodPage() {
  const cart = await getMyCartAction()
  // const currentUser = await getUserBySessionAction()// I still dont understand why in situation like this i cant use an action to preocess the getUser logi, i keep having  type error, same idea in updateUserPaymentmethodAction, i just cant get the user just like that.so have to bring the logic in.
  const session = await auth()
  if (!session) redirect('/sign-in')

  const userId = session?.user?.id
  if (!userId) throw new Error('Not user Id')
  const user = await getSingleUserByIdAction(userId)
  // const updateMethod = await updateUserPaymentMethod({ type: 'Paypal' })
  // const updateMethod = await updateUserPaymentMethodAction({ type: 'Paypal' })

  if (!cart || cart.items.length === 0) redirect('/cart')

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentForm preferredPaymentMethod={user?.paymentMethod} />
    </>
  )
}
