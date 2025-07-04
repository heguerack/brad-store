'use server'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { converToPlainObject } from '@/helperFuntions/convertPrismaToRegularJsObject'
import { prisma } from '@/lib/sample-data/db/prisma'
import { CartItemType } from '@/types'

export async function getMyCartAction() {
  // check fo rhte cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('cart session not found')

  // get session and userID
  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined // this way we dont get an error :)

  // get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }, // so the cart has userid attached. but if not looged in, then the sessionCartId will be attched. thus, when paying we wil have the info via userId or sessionCartId, regardless if logged in or not
  })

  if (!cart) return undefined

  // is there is , cob=vert to decinmal and return
  return converToPlainObject({
    ...cart,
    items: cart.items as CartItemType[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}
