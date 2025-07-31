'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductType } from '@/types'
import AutoPlay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCarousel({ data }: { data: ProductType[] }) {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{ loop: true }}
      plugins={[
        AutoPlay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}>
      <CarouselContent>
        {data.map((product: ProductType) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className='relative max-auto'>
                <Image
                  src={product.banner!} // so again, here , we are saying, I promise there will be an image
                  alt={product.name}
                  height={0}
                  width={0}
                  sizes='100vw'
                  className='w-full h-auto'
                />
                <div className='absolute inset-0 flex items-end justify-center'>
                  <h2 className='bg-gray-900 bg-opacity-50 text-2xl font-bold px-2'></h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
