import getFeaturedProductsAction from '@/actions/products/getFeaturedProductsAction'
import { getLatestProductsAction } from '@/actions/products/getLatestProductsAction'
import ProductCarousel from '@/components/shared/header/ProductCarousel'
import ProductList from '@/components/shared/product/ProductList'
import ViewAllProductsButton from '@/components/shared/ViewAllProductsButton'
import { ProductType } from '@/types'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Home`,
  description: 'A modern ecommerce store built with next js',
}

export default async function page() {
  // const products: ProductType[] = await getLatestProductsAction()
  const products = await getLatestProductsAction()
  const featuredProducts = await getFeaturedProductsAction()
  // console.log('featuredProducts :', featuredProducts)

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={products} title='Newest Arrivals' limit={6} />
      <ViewAllProductsButton />
    </>
  )
}
