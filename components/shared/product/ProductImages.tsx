'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  return (
    <div className='space-y-4'>
      <Image
        src={images[current]}
        alt={'product image'}
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center'
      />
      <div className='flex gap-4 justify-center'>
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === i && 'border-orange-500'
            )}>
            <Image src={image} alt={image} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}
