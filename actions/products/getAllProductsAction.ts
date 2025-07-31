'use server'

import { PAGE_SIZE } from '@/lib/contants'
import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'

export async function getAllProductsAction({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string
  limit?: number
  page: number
  category?: string
  price?: string
  rating?: string
  sort?: string
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query, // this means it doesnt have to be the exact work but part of it (in the name) like po for polo
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {}

  const categoryFilter = category && category !== 'all' ? { category } : {}

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {}

  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {}

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    // orderBy: { createdAt: 'desc' },
    orderBy:
      sort === 'lowest'
        ? { price: 'asc' }
        : sort === 'highest'
        ? { price: 'desc' }
        : sort === 'rating'
        ? { rating: 'desc' }
        : { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })
  const dataCount = await prisma.product.count()
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  }
}
