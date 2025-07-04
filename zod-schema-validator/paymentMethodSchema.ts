import { PAYMENT_METHODS } from '@/lib/contants'
import { z } from 'zod'

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method is required'),
  })
  .refine((data) => PAYMENT_METHODS?.includes(data.type), {
    path: ['type'],
    message: 'Inavalid payment method',
  })
