import { Button } from '@/components/ui/button'
import { ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutUser } from '@/actions/users/SignOutUser'

export default async function UserButton() {
  const session = await auth()
  console.log('role :', session?.user?.role)

  if (!session)
    return (
      <Button asChild variant={'default'}>
        <Link href={'/sign-in'}>
          <UserIcon /> Sign In
        </Link>
      </Button>
    )

  const fisrtInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U'
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant={'ghost'}
              className='flex relative w-8 h-8 rounded-full ml-2 items-center justify-center bg-gray-200'>
              {fisrtInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='text-sm font-medium leading-none'>
                {session.user?.name}
              </div>
              <div className='text-sm text-muted-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href='/user/profile' className='w-full'>
              User Profile
            </Link>
          </DropdownMenuItem>
          {/* however the role will be complaining as thast not in type , and the reason for that is beacause the nextAuth just has name, email, password i think, n=but not role, so we have to extend the type */}
          {/* go to types  */}

          {session?.user?.role === 'admin' && (
            <DropdownMenuItem>
              <Link href='/admin/overview' className='w-full'>
                {session?.user?.role}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href='/user/orders' className='w-full'>
              Order History{' '}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='p-0 mb-1'>
            <form action={SignOutUser} className='w-full'>
              <Button
                className='w-full py-4 px-2 h-4 justify-start'
                variant={'ghost'}>
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
