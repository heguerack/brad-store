'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { paypal } from '@/lib/paypal'
import { prisma } from '@/lib/sample-data/db/prisma'
import { PaymentResultType } from '@/types'
import { revalidatePath } from 'next/cache'
import { updateOrderToPaid } from './updateOrderToPaidAction'

export async function approvePaypalOrderAction(
  orderId: string,
  data: { orderID: string }
) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })
    if (!order) throw new Error('order not found')
    // so after getting the order we call the capturePaymetn form paypal
    const captureData = await paypal.capturePayment(data.orderID)
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResultType).id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Error in paypal payment')
    }
    //update order in db (isPaid); so lets creat an action for that
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    })

    //revalidate
    revalidatePath(`/order/${orderId}`)
    return {
      success: true,
      message: 'Your order has been paid',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
