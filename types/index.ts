import {
  cartItemSchema,
  inserCartSchema,
} from '@/zod-schema-validator/cartSchemas'
import {
  insertOrderItemSchema,
  insertOrderSchema,
} from '@/zod-schema-validator/OrderSChema'
import { paymentMethodSchema } from '@/zod-schema-validator/paymentMethodSchema'
import { paymentResultSchema } from '@/zod-schema-validator/paymentResultSchema'
import { InsertProductSchema } from '@/zod-schema-validator/productSchemas'
import { shippingAddressSchema } from '@/zod-schema-validator/shippingAddressSchema'
import { z } from 'zod'

export type ProductType = z.infer<typeof InsertProductSchema> & {
  id: string
  rating: string
  createdAt: Date
}

export type CartItemType = z.infer<typeof cartItemSchema>

export type CartType = z.infer<typeof inserCartSchema>

export type ShippingAddressType = z.infer<typeof shippingAddressSchema>

export type preferredPaymentMethodType = z.infer<typeof paymentMethodSchema>

export type OrderItemType = z.infer<typeof insertOrderItemSchema>
export type OrderType = z.infer<typeof insertOrderSchema> & {
  // remeber, this works as an extender. it infers or grbs the stuff from the schema, and here we add th rest, beacuse the rest is not being added via form! :)
  id: string
  createdAt: Date
  isPaid: Boolean
  paidAt: Date | null
  isDelivered: Boolean
  deliveredAt: Date | null
  OrderItems: OrderItemType[]
  user: { name: string; email: string }
}

export type PaymentResultType = z.infer<typeof paymentResultSchema>
