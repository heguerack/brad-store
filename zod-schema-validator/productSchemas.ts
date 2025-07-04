import { z } from 'zod'
import { currencySchema } from './currencySchema'

export const InsertProductSchema = z.object({
  name: z.string().min(3, 'Name - Minimun 3 characters'),
  slug: z.string().min(3, 'Slug - Minimun 3 characters'),
  category: z.string().min(3, 'Category - Minimun 3 characters'),
  brand: z.string().min(3, 'Brand - Minimun 3 characters'),
  description: z.string().min(3, 'Description - Minimun 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currencySchema,
})
