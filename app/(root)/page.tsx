import ProductList from '@/components/shared/product/ProductList'
import { getLatestProducts } from '@/helperFuntions/getLatestproducts'
import { Product } from '@/types'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page() {
  const products: Product[] = await getLatestProducts()
  console.log(products)

  return (
    <>
      <ProductList data={products} title='Newest Arrivals' limit={3} />
      <h1>hello </h1>
    </>
  )
}
