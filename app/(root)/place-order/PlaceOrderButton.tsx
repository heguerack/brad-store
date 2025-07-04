'use client'

import { Button } from '@/components/ui/button'
import { Check, Loader } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function PlaceOrderButton() {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' variant={'default'} disabled={pending}>
      {pending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Check className='w-4 h-4 ' />
      )}
      Place order
    </Button>
  )
}
