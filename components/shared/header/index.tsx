import { APP_NAME } from '@/lib/contants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
import CategoryDrawer from './CategoryDrawer'
import Search from './Search'

export default function Header() {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start ml-4'>
          <CategoryDrawer />
          <Link href={'/'} className='flex-start'>
            <Image
              src={'/images/logo.svg'}
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='hidden md:block'>
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  )
}
