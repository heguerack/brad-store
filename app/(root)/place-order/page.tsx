import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { createOrderAction } from '@/actions/orders/createOrderAction'
import { auth } from '@/auth'
import CheckoutSteps from '@/components/shared/CheckoutSteps'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrencyHelper } from '@/helperFuntions/currencyFormatter'
import { prisma } from '@/lib/sample-data/db/prisma'
import { ShippingAddressType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import PlaceOrderForm from './PlaceOrderForm'

export default async function page() {
  // const createOrder = await createOrderAction() // los this was giving me a bug, as delting items from cafrt right ehre!!

  const cart = await getMyCartAction() //honestly, all tis logic is rpetive, we could probably just place this ogoc in a layout and avoid the ectr requests
  if (!cart || cart.items.length === 0) redirect('/cart')

  const session = await auth()
  const user = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  })
  if (!user) throw new Error('User Not found')
  if (!user.address) redirect('/shipping-address')
  if (!user.paymentMethod) redirect('/payment-method')

  const userAddress = user.address as ShippingAddressType

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='md:col-span-2 overflow-x-auto space-y-4'>
          {/* # 1  */}
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p className=''> {userAddress.fullName}</p>
              <p className=''>
                {userAddress.streetAddress} {userAddress.city}
                {userAddress.postalCode} {userAddress.country}
              </p>
              <div className='mt-3'>
                <Link href={'/shipping-address'}>
                  <Button variant={'outline'}>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          {/* # 2  */}

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p className=''>{user.paymentMethod}</p>
              <div className='mt-3'>
                <Link href={'/shipping-address'}>
                  <Button variant={'outline'}>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          {/* #3  */}
          <Card>
            <CardContent className='p-4 gap-4'>
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
                  {cart.items.map((item) => (
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
        <div className=''>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div className=''>Items</div>
                <div className=''>{formatCurrencyHelper(cart.itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Tax</div>
                <div className=''>{formatCurrencyHelper(cart.taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div className=''>Shipping</div>
                <div className=''>
                  {formatCurrencyHelper(cart.shippingPrice)}
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='font-bold'>Total</div>
                <div className='font-bold'>
                  {formatCurrencyHelper(cart.totalPrice)}
                </div>
              </div>

              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
