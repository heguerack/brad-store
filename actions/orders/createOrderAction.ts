// 'use server'
// import { auth } from '@/auth'
// import { prisma } from '@/lib/sample-data/db/prisma'
// import { isRedirectError } from 'next/dist/client/components/redirect-error'
// import { getMyCartAction } from '../cart/getMyCartAction'
// import { insertOrderSchema } from '@/zod-schema-validator/OrderSChema'
// import { CartItemType } from '@/types'

// export async function createOrderAction() {
//   try {
//     const session = await auth()
//     if (!session) throw new Error('User is not authenticated')

//     const currentUser = await prisma.user.findFirst({
//       where: { id: session?.user?.id },
//     })
//     if (!currentUser) throw new Error('User Not found')

//     const cart = await getMyCartAction()

//     if (!cart || cart.items.length === 0) {
//       console.log('wehy the fuck are we redirecting form here?')

//       return {
//         success: false,
//         message: 'Your cart is empty',
//         redirectTo: '/cart',
//       }
//     }
//     if (!currentUser.address) {
//       return {
//         success: false,
//         message: 'Not shipping Adddress',
//         redirectTo: '/shipping-address',
//       }
//     }
//     if (!currentUser.paymentMethod) {
//       return {
//         success: false,
//         message: 'Not payment method selected',
//         redirectTo: '/payment-method',
//       }
//     }

//     //create /setuporder object
//     const order = insertOrderSchema.parse({
//       userId: currentUser.id,
//       shippingAddress: currentUser.address,
//       paymentMethod: currentUser.paymentMethod,
//       itemsPrice: cart.itemsPrice,
//       shippingPrice: cart.shippingPrice,
//       taxPrice: cart.taxPrice,
//       totalPrice: cart.totalPrice,
//     })

//     //create a transation first to be able to create  the order and order items in database
//     const insertedOrderId = await prisma.$transaction(async (tx) => {
//       //ceate order
//       const insertedOrder = await tx.order.create({ data: order })
//       //create order items from the cartItems
//       for (const item of cart.items as CartItemType[]) {
//         await tx.orderItem.create({
//           data: {
//             ...item,
//             price: item.price,
//             orderId: insertedOrder.id,
//           },
//         })
//       }
//       //update cart
//       await tx.cart.update({
//         where: { id: cart.id },
//         data: {
//           items: [],
//           totalPrice: 0,
//           taxPrice: 0,
//           shippingPrice: 0,
//           itemsPrice: 0,
//         },
//       })

//       return insertedOrder.id
//     })
//     if (!insertedOrderId)
//       throw new Error('Order not created, error lin3 83 createOrderAction')
//     return {
//       success: true,
//       message: 'Order created succesfuuly',
//       redirectTo: `/order/${insertedOrderId}`,
//     }
//   } catch (error) {
//     if (isRedirectError(error)) throw error
//     return {
//       success: false,
//       message: 'No order was creted, catch error',
//       redirectTo: '/catch-error',
//     }
//   }
// }
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/sample-data/db/prisma'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getMyCartAction } from '../cart/getMyCartAction'
import { insertOrderSchema } from '@/zod-schema-validator/OrderSChema'
import { CartItemType } from '@/types'
import { Prisma } from '@prisma/client'

export async function createOrderAction() {
  try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    })
    if (!currentUser) throw new Error('User Not found')

    const cart = await getMyCartAction()

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: 'Your cart is empty',
        redirectTo: '/cart',
      }
    }

    if (!currentUser.address) {
      return {
        success: false,
        message: 'No shipping address',
        redirectTo: '/shipping-address',
      }
    }

    if (!currentUser.paymentMethod) {
      return {
        success: false,
        message: 'No payment method selected',
        redirectTo: '/payment-method',
      }
    }

    const order = insertOrderSchema.parse({
      userId: currentUser.id,
      shippingAddress: currentUser.address,
      paymentMethod: currentUser.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    const insertedOrderId = await prisma.$transaction(
      // lets leave it the type as ay for now. it seems we need a newer version of prisma
      async (tx: any) => {
        const insertedOrder = await tx.order.create({ data: order })

        for (const item of cart.items as CartItemType[]) {
          await tx.orderItem.create({
            data: {
              ...item,
              price: item.price,
              orderId: insertedOrder.id,
            },
          })
        }

        await tx.cart.update({
          where: { id: cart.id },
          data: {
            items: [],
            totalPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            itemsPrice: 0,
          },
        })

        return insertedOrder.id
      }
    )

    if (!insertedOrderId)
      throw new Error('Order not created, error at createOrderAction')

    return {
      success: true,
      message: 'Order created successfully',
      redirectTo: `/order/${insertedOrderId}`,
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    return {
      success: false,
      message: 'No order was created, caught an error',
      redirectTo: '/catch-error',
    }
  }
}
