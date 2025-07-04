'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInDefaultValue } from '@/lib/contants'
import Link from 'next/link'
import { useActionState } from 'react'
import { signUpAction } from '@/actions/users/signUpAction'
import { useSearchParams } from 'next/navigation'
import SignupButton from './SignupButton'

export default function SignupFormWithCredentials() {
  const [data, action] = useActionState(signUpAction, {
    success: false,
    message: '',
  })

  const searchParam = useSearchParams()
  const callbackUrl = searchParam.get('callbackUrl') || '/'

  return (
    <form className='space-y-6 ' action={action}>
      <input type='hidden' name='callbackRul' value={callbackUrl} />
      <div className=''>
        <Label htmlFor='name' className=''>
          Name
        </Label>
        <Input id='name' name='name' type='name' required autoComplete='name' />
      </div>
      <div className=''>
        <Label htmlFor='email' className=''>
          Email
        </Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          defaultValue={signInDefaultValue.email}
        />
      </div>
      <div className=''>
        <Label htmlFor='password' className=''>
          Password
        </Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          autoComplete='password'
          defaultValue={signInDefaultValue.password}
        />
      </div>
      <div className=''>
        <Label htmlFor='passwordConfirm' className=''>
          PasswordConfirm
        </Label>
        <Input
          id='passwordConfirm'
          name='passwordConfirm'
          type='password'
          required
          autoComplete='passwordConfirm'
        />
      </div>
      <div className=''>
        <SignupButton />
      </div>
      {data && !data.success && (
        <div className='text-center text-destructive'>{data.message}</div>
      )}
      <div className='text-sm text-center text-muted-foreground'>
        Already have an account{' '}
        <Link href={'/sign-up'} target='_self' className='link'>
          Sign Up
        </Link>
      </div>
    </form>
  )
}
