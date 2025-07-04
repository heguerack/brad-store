import { z } from 'zod'
import { currencySchema } from './currencySchema'

// so it seems that because this schema does not really match the miodel, when we get the product , we make it a cartItem by filtering the data that we need to please our schema....so we kind of destructure before passing the cartItemObject
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'name is required'),
  slug: z.string().min(1, 'slug is required'),
  qty: z.number().int().nonnegative('Queantity must be a positve number'),
  image: z.string().min(1, 'PImage is required'),
  price: currencySchema,
})

export const inserCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currencySchema,
  totalPrice: currencySchema,
  shippingPrice: currencySchema,
  taxPrice: currencySchema,
  sessionCartId: z.string().min(1, 'Session cart id is required'),
  userId: z.string().optional().nullable(), //becasue we will let users add items to the cart , vene if they are not logged in. but as they go through and they cjheck out, they have to login, and we will still have the data inthe cart as we will create a sesion for it.
})
