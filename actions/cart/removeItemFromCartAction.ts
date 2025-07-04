'use server'

import { cookies } from 'next/headers'
import { getMyCartAction } from './getMyCartAction'
import { prisma } from '@/lib/sample-data/db/prisma'
import { calculateCartPrices } from '@/helperFuntions/calculateCartPrices'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function removeItemFromCartAction(id: string) {
  try {
    console.log('removing item from cart')

    //check cartCoookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // // get session and userID
    // const session = await auth()
    // const userId = session?.user?.id ? (session.user.id as string) : undefined

    // now find product in database
    const product = await prisma.product.findFirst({
      where: { id: id },
    })
    if (!product) throw new Error('Product not found')

    //getcart
    const cart = await getMyCartAction()
    if (!cart) throw new Error('cart now found')

    // remove item from cart
    let itemToProcess = cart.items.find((cartItem) => cartItem.productId === id)
    if (!itemToProcess) throw new Error('Not item to process')

    //check quantity, if quantity===0 just remove the item
    if (itemToProcess.qty === 1) {
      const filteredCart = cart.items.filter((item) => item.productId !== id)
      console.log('filteredCart :', filteredCart)
      //remove item/product and update database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: filteredCart,
        },
      })
    } else {
      //decrease quantity
      itemToProcess.qty = itemToProcess.qty - 1
      console.log(itemToProcess.qty)
      //update to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[], //this is just a type ting, making sure its good
          ...calculateCartPrices(cart.items),
        },
      })
    }

    //revalidatePath
    revalidatePath(`/product/${product.slug}`)
    return {
      success: true,
      message: `${product.name} removed from cart`,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,

      message: 'Item was not removed  from Cart',
    }
  }
}
