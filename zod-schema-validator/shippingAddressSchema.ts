import { z } from 'zod'

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters long'),
  streetAddress: z
    .string()
    .min(3, 'Address must be at least 3 characters long'),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters long'),
  country: z.string().min(3, 'Name must be at least 3 characters long'),
  lat: z.number().optional(),
  lng: z.number().optional(),
})
