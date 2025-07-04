'use client'

import { addItemToCartAction } from '@/actions/cart/addItemToCartAction'
import { removeItemFromCartAction } from '@/actions/cart/removeItemFromCartAction'
import { Button } from '@/components/ui/button'
import { CartItemType, CartType } from '@/types'
import { Loader, Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function AddItemToCart({
  cart,
  item,
}: {
  cart?: CartType
  item: CartItemType
}) {
  const router = useRouter()
  const [goToCart, setGoToCart] = useState(false)
  const [isPending, startTransiton] = useTransition()

  const handleAddToCart = async () => {
    startTransiton(async () => {
      const res = await addItemToCartAction(item) // remember this action is returning success but in fact is doing nothing! just so that we can create our logic really
      if (!res?.success) {
        toast.error(res?.message)
        return
      }

      toast(
        <div className='flex justify-between items-center w-full'>
          {/* this way we use the mesasage coming back */}
          <span>{res.message}</span>
          form the server
          <Button
            onClick={() => router.push('/cart')}
            className='bg-primary text-white hover:bg-gray-800'>
            Go to cart
          </Button>
        </div>,
        {
          duration: 5000, // optional, in ms
        }
      )
      setGoToCart(true)
    })
  }
  const handleRemoveItem = async () => {
    startTransiton(async () => {
      const res = await removeItemFromCartAction(item.productId) // remember this action is returning success but in fact is doing nothing! just so that we can create our logic really
      if (!res?.success) {
        toast.error(res?.message)
        return
      }

      toast(
        <div className='flex justify-between items-center w-full'>
          {/* this way we use the mesasage coming back */}
          <span>{res.message}</span>
          {/* from the server */}
          <Button
            onClick={() => router.push('/cart')}
            className='bg-primary text-white hover:bg-gray-800'>
            Go to cart
          </Button>
        </div>,
        {
          duration: 5000, // optional, in ms
        }
      )
      setGoToCart(true)
    })
  }
  //check f item is in the cart
  const itemExist =
    cart && cart.items.find((x) => x.productId === item.productId)
  return itemExist ? (
    <div className='flex gap-4 items-center'>
      <Button type='button' variant={'outline'} onClick={handleRemoveItem}>
        {/* <Minus /> */}
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{itemExist.qty}</span>
      <Button type='button' variant={'outline'} onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full ' type='button' onClick={handleAddToCart}>
      {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus />} Add
      To Cart
    </Button>
  )
  // return (
  //   <div className='flex-center flex-col gap-4 '>
  //     <Button className='w-full ' type='button' onClick={handleAddToCart}>
  //       + Add To Cart
  //     </Button>
  //     {!goToCart ? (
  //       <Button className='w-full ' type='button' onClick={handleAddToCart}>
  //         + Add To Cart
  //       </Button>
  //     ) : (
  //       <Button
  //         className='w-full bg-red-700 hover:bg-red-800'
  //         type='button'
  //         onClick={handleRemoveItem}>
  //         remove from Cart
  //       </Button>
  //     )}

  //     {goToCart && (
  //       <Button asChild className='w-full bg-green-900' type='button'>
  //         <Link href={'/cart'}>Go To Cart</Link>
  //       </Button>
  //     )}
  //   </div>
  // )
}
