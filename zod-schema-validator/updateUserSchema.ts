import z from 'zod'
import { updateProfileSchema } from './updateProfileSchema'

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id is required'),
  role: z.string().min(1, 'Role is required'),
})
