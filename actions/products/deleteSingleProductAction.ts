'use server'
import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteSingleProductAction(id: string) {
  try {
    const productExits = await prisma.product.findFirst({
      where: { id },
    })
    if (!productExits) throw new Error('Product to delete does not exist')

    const productDeleted = await prisma.product.delete({
      where: { id },
    })
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
