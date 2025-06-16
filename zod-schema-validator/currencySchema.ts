import { formatNumberWithDecimal } from '@/helperFuntions/formatNumberWithDecimal'
import { z } from 'zod'

export const currencySchema = z.string().refine(
  // (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
  (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
  'price must have two decimal places'
)
