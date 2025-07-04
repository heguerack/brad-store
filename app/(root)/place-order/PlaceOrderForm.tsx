'use client'

import { useRouter } from 'next/navigation'
import PlaceOrderButton from './PlaceOrderButton'
import { createOrderAction } from '@/actions/orders/createOrderAction'
import { toast } from 'sonner'

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
      <PlaceOrderButton />
    </form>
  )
}
