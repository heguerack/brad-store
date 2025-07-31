import z from 'zod'
import { InsertProductSchema } from './productSchemas'

export const updateProductSchema = InsertProductSchema.extend({
  id: z.string().min(1, 'Id is required'),
})
