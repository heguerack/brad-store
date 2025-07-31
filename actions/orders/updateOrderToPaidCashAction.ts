'use server'

import { revalidatePath } from 'next/cache'
import { updateOrderToPaid } from './updateOrderToPaidAction'
import { formatError } from '@/helperFuntions/FormatErrors'

export async function updateOrderToPaidCashAction(orderId: string) {
  try {
    await updateOrderToPaid({ orderId })
    revalidatePath(`{/order/${orderId}}`)
    return {
      success: true,
      message: 'cash order marked as paid',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
