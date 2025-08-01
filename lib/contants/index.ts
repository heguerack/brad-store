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

export const PAYMENT_METHODS = ['Paypal', 'Stripe', 'cashOnDelivery']
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 4

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  banner: null,
}

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user']

export const reviewFormDafaultValues = {
  title: '',
  comment: '',
  rating: 0,
}
