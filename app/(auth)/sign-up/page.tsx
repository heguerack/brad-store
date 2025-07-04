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
// import SigninFormWithCredentials from './SigninFormWithCredentials'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SignupFormWithCredentials from './SignupFormWithCredentials'

export const metadata: Metadata = {
  title: 'Sign Up',
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
          <CardTitle className='text-center'>Sing Up</CardTitle>
          <CardDescription>Create your accout</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SignupFormWithCredentials />
        </CardContent>
      </Card>
    </div>
  )
}
