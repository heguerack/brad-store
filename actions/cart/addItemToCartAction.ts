'use server'

import { auth } from '@/auth'
import { CartItemType } from '@/types'
import { cookies } from 'next/headers'
import { getMyCartAction } from './getMyCartAction'
import {
  cartItemSchema,
  inserCartSchema,
} from '@/zod-schema-validator/cartSchemas'
import { prisma } from '@/lib/sample-data/db/prisma'
import { calculateCartPrices } from '@/helperFuntions/calculateCartPrices'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function addItemToCartAction(data: CartItemType) {
  try {
    // check fo the cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('cart session not found')

    // get session and userID
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined // this way we dont get an error :)

    //logic here
    const cart = await getMyCartAction() //so remeber,  if not cart , this will return undefined

    // parse and validate item
    const item = cartItemSchema.parse(data)

    // now find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    })
    if (!product) throw new Error('Product not found')

    //this if getMyCartAction() returns undefined
    if (!cart) {
      //create new object
      const newCart = inserCartSchema.parse({
        userId: userId,
        items: [item], //becasue to start with there is no items at all, and we start with one items when creating the cartObject. so this will be dne just for the very fist item
        sessionCartId: sessionCartId,
        ...calculateCartPrices([item]),
      })
      //add newCart to db
      await prisma.cart.create({
        data: newCart,
      })
      //revalidate product page
      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        // message: 'Item added to Cart',
        message: `${product.name} added to cart`,
      }
    } else {
      // check if items  is already in the cart
      const hasItem = cart.items.find(
        (cartIitem: CartItemType) => cartIitem.productId === item.productId
      )
      if (hasItem) {
        // check stok, make sure we have enuough
        if (product.stock < hasItem.qty + 1) {
          throw new Error('Not enough stock')
        }
        // itherwise we can increase the quantity to buy
        cart.items.find(
          (cartItem: CartItemType) => cartItem.productId === item.productId
        )!.qty = hasItem.qty + 1
      } else {
        //if item does not exists (or doesnt have the itme in cart)
        //check stock
        if (product.stock < 1) throw new Error('Not enough stock')
        //add item to the cart.items
        cart.items.push(item)
      }
      //save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[], //this is just a type ting, making sure its good
          ...calculateCartPrices(cart.items),
        },
      })
      //revalidatePath
      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: `${product.name} ${hasItem ? 'updated in' : 'added to'} cart`,
      }
    }

    // //testing
    // console.log({
    //   // so basically this is the object we need!!
    //   'session Cart Id': sessionCartId,
    //   'user DI': userId,
    //   'Item requested': item,
    //   'Product Found': product,
    // })
  } catch (error) {
    console.log(error)
    return {
      success: false,

      message: 'Item was not added to Cart',
    }
  }
}
