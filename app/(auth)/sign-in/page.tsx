import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/contants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SigninFormWithCredentials from './SigninFormWithCredentials'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function page(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const { callbackUrl } = await props.searchParams

  const session = await auth()

  if (session) {
    // return redirect('/')
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='w-full max-w-md mx-auto '>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href={'/'} className='flex-center'>
            <Image
              src='/images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sing In</CardTitle>
          <CardDescription>Sing in to your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SigninFormWithCredentials />
        </CardContent>
      </Card>
    </div>
  )
}
