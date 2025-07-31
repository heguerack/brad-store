'use server'

import { prisma } from '@/lib/sample-data/db/prisma'
import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

type SalesDataType = {
  month: string
  totalSales: number
}[]

export async function getOrderSummaryAction() {
  // get counts for each resource
  const ordersCount = await prisma.order.count()
  const productsCount = await prisma.product.count()
  const usersCount = await prisma.user.count()

  // calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true }, // so this is just gonna add this result for us , that way we dont pull the whpole thing to do the math hree :)
  })

  // get monthly sales
  // the reason why we do this is bacuase the totalSales is gonna be in the formatt of prismaDeciimal but we want a number. so we goota deal with regular raw data
  const salesDataRaw = await prisma.$queryRaw<
    //  Array<{ month: string; totalSales: Prisma.Decimal }>
    // Decimal comes from the Prisma runtime (which handles Decimal.js internally), not from @prisma/client's top-level Prisma namespace.
    Array<{ month: string; totalSales: Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`

  const salesData: SalesDataType = salesDataRaw.map(
    (entry: { month: string; totalSales: Decimal }) => ({
      month: entry.month,
      totalSales: Number(entry.totalSales),
    })
  )

  // get the latest orders
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 6,
  })
  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  }
}
