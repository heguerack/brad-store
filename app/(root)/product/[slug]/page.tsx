import { getMyCartAction } from '@/actions/cart/getMyCartAction'
import { getSingleproductAction } from '@/actions/products/getSingleproductAction'
import { auth } from '@/auth'
import AddItemToCart from '@/components/shared/product/AddItemToCart'
// import AddItemToCart from '@/components/shared/product/AddItemToCart'
import ProductImages from '@/components/shared/product/ProductImages'
import ProductPrice from '@/components/shared/product/ProductPrice'
import { Badge } from '@/components/ui/badge'

import { Card, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import ReviewList from './ReviewList'
import Rating from '@/components/shared/product/Rating'

export default async function productDetailsPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const singleproduct = await getSingleproductAction(slug)
  // console.log(singleproduct)

  const cart = await getMyCartAction()

  const session = await auth()
  const userId = session?.user?.id

  if (!singleproduct)
    notFound //i we dont need to return here, if we do, we get an error!
  else
    return (
      <>
        <section>
          <div className='grid grid-cols-1 md:grid-cols-5  '>
            {/* IMAGES COLUMN  */}
            <div className='col-span-2'>
              {/* Images components  */}
              <ProductImages images={singleproduct.images} />
            </div>
            {/* details column   */}
            <div className='col-span-2 p-5'>
              <div className='flex flex-col gap-6'>
                <p>
                  {singleproduct.brand} {singleproduct.category}
                </p>
                <h1 className='h3-bold'>{singleproduct.name}</h1>
                {/* <p className=''>
                  {singleproduct.rating} of {singleproduct.numReviews} Reviews
                </p> */}
                <Rating value={Number(singleproduct.rating)} />
                <div className='felx flex-col sm:flex-row sm:items-center gap-3'>
                  {/* <ProductPrice value={Number(singleproduct.price)} /> */}
                  <ProductPrice
                    value={singleproduct.price}
                    className='w-24 rounded-full bg-green-100 py-2 px-5 text-green-700'
                  />
                </div>
              </div>
              <div className='mt-10'>
                <p className='font-semibold'>Description</p>
                <p className=''>{singleproduct.description}</p>
              </div>
              {/* Action Column  */}
              <div className='p-4 '>
                <Card>
                  <CardContent>
                    <div className='mb-2 flex justify-between'>
                      <div className=''>Price</div>
                      <div className=''>
                        <ProductPrice value={singleproduct.price} />
                      </div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                      <div className=''>Status</div>
                      {singleproduct.stock > 0 ? (
                        <Badge variant={'outline'}>In Stock</Badge>
                      ) : (
                        <Badge variant={'destructive'}>Out Of Stock</Badge>
                      )}
                    </div>

                    {singleproduct.stock > 0 && (
                      <div className='flex-center'>
                        {/* so it seems that because this schema does not really match the miodel, when we get the product , we make it a cartItem by filtering the data that we need to please our schema....so we kind of destructure before passing the cartItemObject */}
                        {/* So yeah basically ce create the product from the cart
                        item...another way we could have done this is by creatin
                        ght ecartItem, then extending it to become a product
                        item */}
                        <AddItemToCart
                          cart={cart} // new
                          item={{
                            productId: singleproduct.id,
                            name: singleproduct.name,
                            slug: singleproduct.slug,
                            price: singleproduct.price,
                            qty: 1,
                            image: singleproduct.images[0],
                          }}
                        />
                        {/* Att to cart item goes here */}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className='mt-10'>
          <h2 className='h2-bold'>Customer Reviews</h2>
          <ReviewList
            userId={userId || ''}
            productId={singleproduct.id}
            productSlug={singleproduct.slug}
          />
        </section>
      </>
    )
}
