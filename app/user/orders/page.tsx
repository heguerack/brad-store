import { getMyOrdersAction } from '@/actions/orders/getMyOrdersAction'
import Pagination from '@/components/shared/Pagination'
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
import { formattUUID } from '@/helperFuntions/formatUUID'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `My Orders`,
  description: 'A modern ecommerce store built with next js',
}

export default async function ordersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const { page } = await props.searchParams

  const orders = await getMyOrdersAction({
    page: Number(page) || 1,
  })

  return (
    <div className='space-y-2 text-black'>
      <h2 className='h2-bold'></h2>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formattUUID(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrencyHelper(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'Not Paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : 'Not Delivered'}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <span className='px-2'>Details</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages && (
          <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
        )}
      </div>
    </div>
  )
}
