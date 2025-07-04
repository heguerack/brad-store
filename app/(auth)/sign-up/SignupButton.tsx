'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SignupButton() {
  const { pending } = useFormStatus()
  return (
    <Button className='w-full' variant={'default'} disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  )
}
