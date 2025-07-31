'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteOrderAction(id: string) {
  try {
    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    })
    if (!order)
      throw new Error('We could not dele order from delete order ACTIOn')

    revalidatePath('/admin/orders')
    return {
      success: true,
      message: 'Order deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
