import Link from 'next/link'
import { EllipsisVertical, ShoppingCart } from 'lucide-react'
import ModeToggle from './ModeToggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function Menu() {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant={'ghost'}>
          <Link href={'/cart'}>
            <ShoppingCart />
            Cart
          </Link>
        </Button>
        <Button asChild variant={'default'}>
          <Link href={'/sign-in'}>
            <ShoppingCart />
            Sign In
          </Link>
        </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start p-2'>
            <SheetTitle>Menu</SheetTitle>
            {/* <SheetDescription></SheetDescription> */}
            <ModeToggle />
            <Button asChild variant={'ghost'}>
              <Link href={'/cart'}>
                <ShoppingCart />
                Cart
              </Link>
            </Button>
            <Button asChild variant={'default'}>
              <Link href={'/sign-in'}>
                <ShoppingCart />
                Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
