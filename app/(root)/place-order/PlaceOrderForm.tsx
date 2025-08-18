'use client'

import { useRouter } from 'next/navigation'
import PlaceOrderButton from './PlaceOrderButton'
import { createOrderAction } from '@/actions/orders/createOrderAction'

export default function PlaceOrderForm() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await createOrderAction()

    if (res.redirectTo) {
      router.push(res.redirectTo)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <h5 className='mt-8'>Ready place the order formprocessing?</h5>
      <p className='mb-8 text-red-500'>
        You wont be able to access the cart after this
      </p>
      <PlaceOrderButton />
    </form>
  )
}
