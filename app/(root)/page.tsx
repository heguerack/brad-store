import { getLatestProductsAction } from '@/actions/products/getLatestProductsAction'
import ProductList from '@/components/shared/product/ProductList'
import { ProductType } from '@/types'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page() {
  const products: ProductType[] = await getLatestProductsAction()
  // console.log(products)

  return (
    <>
      <ProductList data={products} title='Newest Arrivals' limit={6} />
      <h1>hello </h1>
    </>
  )
}
