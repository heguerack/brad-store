import { InsertProductSchema } from '@/zod-schema-validator/InsertProductSchema'
import { z } from 'zod'

export type Product = z.infer<typeof InsertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}
