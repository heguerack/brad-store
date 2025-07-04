export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION! ||
  'A modern ecommerce store built with next js'
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL! || 'http://localhost:3000'

export const LATEST_PRODUCTS_LIMIT = Number(
  // process.env.LATEST_PRODUCTS_LIMIT || 6
  6
)

export const signInDefaultValue = {
  email: ' ',
  password: '',
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: '',
}

export const PAYMENT_METHODS = ['Paypal', 'Creditcard', 'cashOnDelivery']
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 2
