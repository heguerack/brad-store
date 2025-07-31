'use server'

import { revalidatePath } from 'next/cache'
import { updateOrderToPaid } from './updateOrderToPaidAction'
import { formatError } from '@/helperFuntions/FormatErrors'
import { updateOrderToDelivered } from './updateOrderToDelivered'

export async function updateOrderToDeliveredCashAction(orderId: string) {
  try {
    await updateOrderToDelivered(orderId)
    revalidatePath(`{/order/${orderId}}`)
    return {
      success: true,
      message: 'cash order marked as delivered',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
