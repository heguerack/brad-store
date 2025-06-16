import { getLatestProductsAction } from '@/actions/productsAction'

export const getLatestProducts = async () => {
  const products = await getLatestProductsAction()
  return products
}
