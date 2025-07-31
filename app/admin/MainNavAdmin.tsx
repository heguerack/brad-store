'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
  { title: 'Overview', href: '/admin/overview' },
  { title: 'Products', href: '/admin/products' },
  { title: 'Orders', href: '/admin/orders' },
  { title: 'Users', href: '/admin/users' },
]

export default function MainNavAdmin({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(className, 'flex items-cneter space-x-4 lf:space-x-6')}
      //so we just grab th rest of the props like this
      {...props}>
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes(link.href) && 'text-muted-foreground'
          )}>
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
