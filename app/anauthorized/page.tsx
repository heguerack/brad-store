import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Auauthorized Access`,
}

export default function unAuthorizedPage() {
  return (
    <div className='container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh-200px)]'>
      <h1 className='h1-bold text-4xl'>Unauthorized Access</h1>
      <p className='text-muted-foreground '>
        You do bot have permmision to acces this page
      </p>
      <Button asChild>
        <Link href={'/'}>Return Home</Link>
      </Button>
    </div>
  )
}
