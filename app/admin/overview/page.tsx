import { getOrderSummaryAction } from '@/actions/orders/getOrderSummaryAction'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formatNumber } from '@/helperFuntions/formatNumber'
import { BadgeDollarSign, Barcode, CreditCard, Users } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import Charts from './Charts'
import { authGuard } from '@/helperFuntions/authGuard'
export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default async function adminPage() {
  const session = await authGuard() // we wanna do this asper page, and not in a layout, as it wont render properly that way

  // const session = await auth()
  // if (session?.user?.role !== 'admin') throw new Error('User is not authorized')

  const summary = await getOrderSummaryAction()

  return (
    <div className='spcace-y-2'>
      <h1 className='h2-bold'>Dashboard</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>
              Total Revenue
            </CardTitle>
            <BadgeDollarSign />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrencyHelper(
                summary.totalSales._sum.totalPrice?.toString() || 0 //cero so that it deosnt show an error in no sales
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Sales</CardTitle>
            <CreditCard />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.ordersCount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Customers</CardTitle>
            <Users />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.usersCount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-mendium'>Products</CardTitle>
            <Barcode />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatNumber(summary.productsCount)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
            {/* data={{ salesData: summary.salesData,}} */}
            <Charts salesData={summary.salesData} />
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
            {/* CHARTS * CHARTS * CHARTS * CHARTS */}
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.latestSales.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order?.user?.name ? order.user.name : 'Deleted User'}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(order.createdAt).dateOnly}
                    </TableCell>
                    <TableCell>
                      {formatCurrencyHelper(order.totalPrice)}
                    </TableCell>
                    <TableCell>
                      <Button asChild>
                        <Link href={`/order/${order.id}`}>
                          <span className='px-2'>Details</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
