'use server'
import { formatError } from '@/helperFuntions/FormatErrors'
import { paypal } from '@/lib/paypal'
import { prisma } from '@/lib/sample-data/db/prisma'

export async function createPaypalOrderAction(orderId: string) {
  // remember, we dont need the orderId, we need the paymentResult and there is an id There.  thats means we paid or not!!
  try {
    const prismaOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })

    if (prismaOrder) {
      // if order in db then Create paypal order
      const paypalOrder = await paypal.createOrder(
        Number(prismaOrder.totalPrice)
      )
      // update order with paypal order id (payment result)
      //So this is similar to the cart thing, we are just creating th eplace holder or payment result object. once paid the the staus should change to paid or ture or sothing like that
      const updatedPrismaOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: '',
            status: '',
            pricePaid: 0,
          },
        },
      })
      // if (!updatedPrismaOrder) throw new Error('Coudnt update prisma order')

      return {
        success: true,
        message: 'Item Order ceated successfully',
        data: paypalOrder.id,
      }
    } else {
      throw new Error('order not foud from createPaypalOrderAction')
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
      data: null,
    }
  }
}
