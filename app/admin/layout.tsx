import Menu from '@/components/shared/header/Menu'
import { APP_NAME } from '@/lib/contants'
import Image from 'next/image'
import Link from 'next/link'
import MainNavAdmin from './MainNavAdmin'
import AdminSearch from '@/components/admin/AdminSearch'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='flex flex-col'>
        <div className='border-b container mx-auto'>
          <div className='flex items-center h-16 px-4'>
            <Link href={'/'} className='w-22'>
              <Image
                src='/images/logo.svg'
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            {/* Main Nav  */}
            <MainNavAdmin className='mx-6 text-red-950' />
            <div className='ml-auto items-center flex spacae-x-4'>
              <AdminSearch />
              <Menu />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto '>
          {children}
        </div>
      </div>
    </>
  )
}
