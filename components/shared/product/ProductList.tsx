import { ProductType } from '@/types'
import ProductCard from './ProductCard'

export default function ProductList({
  data,
  title,
  limit,
}: {
  data: ProductType[]
  title?: string
  limit?: number
}) {
  // console.log(data)
  const limitedData = limit ? data.slice(0, limit) : data
  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedData.map((item: ProductType) => (
            <ProductCard product={item} key={item.slug} />
          ))}
        </div>
      ) : (
        <div>
          <p className=''>No Products Found</p>
        </div>
      )}
    </div>
  )
}
