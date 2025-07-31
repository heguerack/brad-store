import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getOrdersAction } from '@/actions/orders/getOrdersAction'
import { authGuard } from '@/helperFuntions/authGuard'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/components/shared/Pagination'
import { Button } from '@/components/ui/button'
import DeleteDialog from '@/components/shared/DeleteDialog'
import { deleteOrderAction } from '@/actions/orders/deleteOrderAction'

const metadata: Metadata = {
  title: 'Admin Orders',
}

export default async function adminOrdersPage(props: {
  searchParams: Promise<{ page: string; query: string }>
}) {
  await authGuard()
  // const page = Number(searchParams.page || 1)
  const { page = '1', query: searchText } = await props.searchParams // so we destrcture page from props, but laso assign a dafault of 1 at the same time

  const orders = await getOrdersAction({
    limit: 2,
    page: Number(page),
    query: searchText,
  })
  console.log('orders in admin orders page: ', orders)

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
        <h1 className='h2-bold'>Orders</h1>
        {searchText && (
          <div className=''>
            Filterered by <i className=''>&quot;{searchText}&quot;</i>{' '}
            <Link href={'/admin/orders'}>
              <Button size='sm'>Remove Filter</Button>
            </Link>
          </div>
        )}
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
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
                <TableCell>{order.user.name}</TableCell>
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
                  <Button asChild size={'sm'}>
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  {/* <DeleteDialog id={order.id} action={deleteOrderAction} /> */}
                  <DeleteDialog id={order.id} action={deleteOrderAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {orders.totalPages && (
        <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
      )}
    </div>
  )
}
