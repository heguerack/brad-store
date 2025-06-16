// 'use client'

import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/contants'
import Image from 'next/image'
import Link from 'next/link'

export default function notFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image
        src={'/images/logo.svg'}
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority={true}
      />
      <div className='p-6 w-1/3 rounded-lg shadow-md text-center '>
        <h1 className='text-3xl'>Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
        {/* <Button
          variant={'outline'}
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}>
          Back to Home
        </Button> */}
        <Button asChild variant={'outline'} className='mt-4 ml-2'>
          <Link href={'/'}> Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
