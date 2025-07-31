import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrice from './ProductPrice'
import { ProductType } from '@/types'
import Rating from './Rating'

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product?.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='grid p-4 gap-4'>
        <div className='text-xs'>
          {product.brand}
          <Link href={`/product/${product.slug}`}>
            <h2 className='text-sm font-medium'>{product.name}</h2>
          </Link>
          <div className='flex-between'>
            {/* <p className=''>{product.rating} Stars</p> */}
            <Rating value={Number(product.rating)} />
            {product.stock > 0 ? (
              // <p className='font-bold'>{product.price}</p>
              <ProductPrice value={product.price} />
            ) : (
              // <h1>jj</h1>
              <p className='text-destructive'>Out of Stock</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
