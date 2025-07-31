'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { updateProductSchema } from '@/zod-schema-validator/updateProductSchema'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function updateSingleProductAction(
  data: z.infer<typeof updateProductSchema>
) {
  try {
    const product = updateProductSchema.parse(data)
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    })
    if (!productExists)
      throw new Error('Product does not exists therefore it cant be updated')

    await prisma.product.update({
      where: { id: product.id },
      data: product, // so i guess htis means we replce the whole thing!
    })

    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product updated successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
