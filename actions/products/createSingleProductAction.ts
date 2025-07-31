'use server'

import { formatError } from '@/helperFuntions/FormatErrors'
import { prisma } from '@/lib/sample-data/db/prisma'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function createSingleProductAction(
  data: z.infer<typeof InsertProductSchema> // this is weird, this is not how we usually do it, so if this way maybe we avoiud setting the type on the page? compare to create order or user
) {
  try {
    const product = InsertProductSchema.parse(data)
    await prisma.product.create({ data: product })
    revalidatePath('/admin/products')
    return {
      success: true,
      message: 'Product created successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}
