'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function AdminSearch() {
  const pathname = usePathname()

  // so we do this to know which action to handle
  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
    ? '/admin/users'
    : '/admin/products'

  const searchParams = useSearchParams()

  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '')

  useEffect(() => {
    // we could have made a variable for the query
    // something like searchQuery = (searchParams.get('query') || ''
    setQueryValue(searchParams.get('query') || '')
  }, [searchParams])

  return (
    <form action={formActionUrl} method='GET'>
      <Input
        type='search'
        placeholder='Search...'
        name='query'
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className='md:w-[100px] lg:w-[300px]'
      />
      <Button className='sr-only'>Search</Button>
    </form>
  )
}
