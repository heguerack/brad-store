import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.

//////////////////////////////////////////////////////////////
//COMMENT THIS OUT
// const pool = new Pool({ connectionString })
//////////////////////////////////////////////////////

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.

// const adapter = new PrismaNeon({ pool })
const adapter = new PrismaNeon({ connectionString })

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  // export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      // needs: { price: true }, // optional because this return scalars, prisma does it internally for scaLARZ
      price: {
        compute(product) {
          return product.price.toString()
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString()
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true }, // not too sure about this, but after reasearch it seems like we have manually make it available in the compute
        compute(cart) {
          return cart.itemsPrice.toString()
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true }, // not too sure about this
        compute(cart) {
          return cart.shippingPrice.toString()
        },
      },
      taxPrice: {
        needs: { taxPrice: true }, // not too sure about this
        compute(cart) {
          return cart.taxPrice.toString()
        },
      },
      totalPrice: {
        needs: { totalPrice: true }, // not too sure about this
        compute(cart) {
          return cart.totalPrice.toString()
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true }, // not too sure about this, but after reasearch it seems like we have manually make it available in the compute
        compute(cart) {
          return cart.itemsPrice.toString()
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true }, // not too sure about this
        compute(cart) {
          return cart.shippingPrice.toString()
        },
      },
      taxPrice: {
        needs: { taxPrice: true }, // not too sure about this
        compute(cart) {
          return cart.taxPrice.toString()
        },
      },
      totalPrice: {
        needs: { totalPrice: true }, // not too sure about this
        compute(cart) {
          return cart.totalPrice.toString()
        },
      },
    },
    orderItem: {
      price: {
        compute(cart) {
          return cart.price.toString()
        },
      },
    },
  },
})
