'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDateTime } from '@/helperFuntions/formatDateTime'
import { formattUUID } from '@/helperFuntions/formatUUID'
import { OrderType } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { createPaypalOrderAction } from '@/actions/orders/createPaypalOrderAction'
import { toast } from 'sonner'
import { approvePaypalOrderAction } from '@/actions/orders/approvePaypalOrderAction'
import { startTransition, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { updateOrderToPaidCashAction } from '@/actions/orders/updateOrderToPaidCashAction'

import { updateOrderToDelivered } from '@/actions/orders/updateOrderToDelivered'
import StripePayment from './StripePayment'

export default function OrderDetailsTable({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: OrderType
  paypalClientId: string
  isAdmin: boolean
  stripeClientSecret: string | null
}) {
  const {
    shippingAddress,
    OrderItems,
    shippingPrice,
    itemsPrice,
    taxPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
    paymentResult,
  } = order
  console.log('paymentMethod :', paymentMethod)

  const orderId = formattUUID(order.id)
  const totalPrice =
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status = ''

    if (isPending) {
      status = 'Loading PayPal'
    } else if (isRejected) {
      status = 'Loading Paypal...'
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPaypalOrderAction(order.id)
    if (!res.success) {
      toast.error(res.message)
    }
    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    // looks like for paypal we have to apss an object => data: { orderID: string }
    const res = await approvePaypalOrderAction(order.id, data)
    if (res.success === true) {
      toast.success(res.message)
    }
    if (res.success === false) {
      toast.error(res.message)
    }
  }

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCashAction(order.id)
            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }>
        {isPending ? 'Processing...' : 'Mark As Paid'}
      </Button>
    )
  }

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToDelivered(order.id)
            if (res.success) {
              toast.success(res.message)
            } else {
              toast.error(res.message)
            }
          })
        }>
        {isPending ? 'Processing...' : 'Mark as Delivered'}
      </Button>
    )
  }

  return (
    <>
      <h1 className='py-4 text-2xl'>Order {orderId}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-y-4 overflow-x-auto '>
          <Card>
            <CardContent className='p-4 '>
              <h2 className='text-xl pb-4'>Paid at</h2>
              <p className=''>{paymentMethod}</p>
              {isPaid ? (
                <Badge className=' ' variant={'green'}>
                  {/* PAid at {formatDateTime(paidAt!).dateTime} */}
                  Paid at {formatDateTime(paidAt).dateTime}
                  <span></span>
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not paid
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p className=''>{shippingAddress.fullName}</p>
              <p className=''>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge className=' ' variant={'secondary'}>
                  Delevered at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge className=' ' variant={'destructive'}>
                  Not delivered
                </Badge>
              )}
            </CardContent>
          </Card>
          <div className='mt-4 md:mt-0 '>
            <Card>
              <CardContent className='p-4 gap-4 space-y-4'>
                <h2 className='text-xl pb-4'>Order Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {OrderItems.map((item) => (
                      <TableRow key={item.slug}>
                        <TableCell>
                          <Link
                            href={`/product/${item.slug}`}
                            className='flex items-center'>
                            <Image
                              src={item.image}
                              alt=''
                              width={50}
                              height={50}
                            />
                            <span className='px-2'>{item.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className='px-2'>{item.qty}</span>
                        </TableCell>
                        <TableCell>
                          {' '}
                          <span className='px-2'>${item.price}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className=''>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div className=''>Items</div>
                <div className=''>{formatCurrencyHelper(itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Tax</div>
                <div className=''>{formatCurrencyHelper(taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Shipping</div>
                <div className=''>{formatCurrencyHelper(shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className='font-bold'>Total</div>
                <div className='font-bold'>
                  {formatCurrencyHelper(totalPrice)}
                </div>
              </div>
              {/* paypal payment  */}
              {!isPaid && paymentMethod === 'Paypal' && (
                <div>
                  <PayPalScriptProvider
                    options={{
                      clientId: paypalClientId,
                    }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
              {/* STRIPE PAYMENT  */}
              {/* STRIPE PAYMENT  */}
              {!isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100} // to have it in cents
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}

              {/* STRIPE PAYMENT  */}
              {/* STRIPE PAYMENT  */}
              {/* //////////////////////////////////// */}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {isAdmin && !isPaid && paymentMethod === 'cashOnDelivery' && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
              {/* CASH ON DELIVERY */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
