import { z } from 'zod'
import { currencySchema } from './currencySchema'
import { PAYMENT_METHODS } from '@/lib/contants'
import { shippingAddressSchema } from './shippingAddressSchema'

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  totalPrice: currencySchema,
  paymentMethod: z
    .string()
    .refine((papaya) => PAYMENT_METHODS?.includes(papaya), {
      message: 'Invalid payment method',
    }),
  shippingAddress: shippingAddressSchema,
})

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currencySchema,
  qty: z.number(),
})
