import { CartItemType } from '@/types'
import { roundTwoDecimals } from './roundNumberTwoDecimals'

export const calculateCartPrices = (items: CartItemType[]) => {
  const itemsPrice = roundTwoDecimals(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  )

  const shippingPrice = roundTwoDecimals(itemsPrice > 100 ? 0 : 10) //lol this logic, so lame

  const taxPrice = roundTwoDecimals(itemsPrice * 0.15)

  const totalPrice = itemsPrice + shippingPrice + taxPrice

  console.log('itemsPrice :', itemsPrice)
  console.log('shippingPrice :', shippingPrice)
  console.log('taxPrice :', taxPrice)
  console.log('totalPrice :', totalPrice)

  // console.log(typeof itemsPrice.toString(), itemsPrice.toString())

  return {
    itemsPrice: itemsPrice.toString(),
    shippingPrice: shippingPrice.toString(),
    taxPrice: taxPrice.toString(),
    totalPrice: roundTwoDecimals(totalPrice).toString(),
  }
}
